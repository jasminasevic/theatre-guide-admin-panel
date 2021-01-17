import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrenciesService } from 'src/app/currencies/all-currencies/currencies.service';
import { ConvertDateService } from 'src/app/shared/services/convert-date.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ShowForRepertoire } from 'src/app/shows/all-shows/showForRepertoire.model';
import { ShowsService } from 'src/app/shows/all-shows/shows.service';
import { RepertoiresService } from '../all-repertories/repertoires.service';

@Component({
  selector: 'app-edit-repertoire',
  templateUrl: './edit-repertoire.component.html',
  styleUrls: ['./edit-repertoire.component.sass']
})
export class EditRepertoireComponent implements OnInit {

  repertoireForm: FormGroup;
  showListing: any = [];
  selectedShow: number;
  sectors: any = [];
  repertoireDetails: any;
  showId: number;
  repertoireIdValue: number;
  currencyListing: any = [];

  isPremiere: any = [
    {
      id: false,
      value: 'No'
    },
    {
      id: true,
      value: 'Yes'
    }];

  constructor(private fb: FormBuilder,
    private repertoireService: RepertoiresService,
    private router: Router,
    private showService: ShowsService,
    private activatedRoute: ActivatedRoute,
    private convertDateService: ConvertDateService,
    private notificationService: NotificationService,
    private currencyService: CurrenciesService) { }

  ngOnInit() {
    this.showService.getShowList()
      .subscribe(data => {
        this.showListing = data
      })

    this.currencyService.getCurrencyList()
      .subscribe(data =>{
        this.currencyListing = data
      })

    this.repertoireForm = this.createRepertoireForm();

    let repertoireId = this.activatedRoute.snapshot.params['id'];
    this.repertoireIdValue = repertoireId;

    this.repertoireService.getRepertoire(repertoireId)
      .subscribe((repertoire: any) =>{
        this.editRepertoire(repertoire),
        console.log(repertoire),
        this.repertoireDetails = repertoire,
        this.selectedShow = repertoire.showId
      }),
      (err: any) => console.log(err)
  }

  editRepertoire(repertoire){
    this.repertoireForm.patchValue({
      showId: repertoire.showId,
      showName: repertoire.showName,
      showDateTime: repertoire.showDate,
      theatreName: repertoire.theatreName,
      sceneName: repertoire.sceneName,
      isPremiere: repertoire.isPremiere
    }),
    this.repertoireForm.setControl('addPriceDtos', this.setExistingSectorsPrices(repertoire.getPriceDtos));
  }

  setExistingSectorsPrices(sectorPriceSets){
    const sectorPriceFormArray = new FormArray([]);
    sectorPriceSets.forEach(s => {
      sectorPriceFormArray.push(this.fb.group({
        sectorId: s.sectorId,
        sectorName: s.sectorName,
        ticketPrice: s.price,
        currencyId: s.currencyId
      }))
    });
    return sectorPriceFormArray;
  }

  createRepertoireForm() : FormGroup {
    return this.fb.group({
      id: 0,
      showId: ['', [Validators.required]],
      showDateTime: [''],
      theatreName: [''],
      sceneName: [''],
      isPremiere: [''],
      addPriceDtos: this.fb.array([this.initalSectorRows()])
    });
  }

  initalSectorRows(){
    return this.fb.group({
      sectorId: [''],
      sectorName: [{ disabled: true }],
      ticketPrice: [''],
      currencyId: ['']
    });
  }

  counter = 0;
   onChangeObj($event){
    this.counter += 1;
    if(this.counter > 1){
     this.showService.getShowsWithPricesForRepertoire($event)
      .subscribe(
        (data: ShowForRepertoire[]) => {
          this.displayShowData(data),
          this.repertoireDetails = data
        }
      )
    }
   }

  displayShowData(data){
    this.repertoireForm.patchValue({
      theatreName: data.theatre,
      sceneName: data.scene
    }),
    this.repertoireForm.setControl('addPriceDtos', this.setExistingSectors(data.getSectorWithPriceDtos));
  }

  setExistingSectors(sectorSets) : FormArray {
    const sectorFormArray = new FormArray([]);
    sectorSets.forEach(s => {
      sectorFormArray.push(this.fb.group({
        sectorName: s.sectorName,
        sectorId: s.sectorId,
        ticketPrice: null,
        currencyId: s.currencyId
      }));
    });
    return sectorFormArray;
  }

  get sectorControls(){
    return(<FormArray>this.repertoireForm.controls.addPriceDtos['controls']);
  }

  onSubmit(){
    const formData = new FormData();

    var showDate = this.repertoireForm.get('showDateTime').value;
    var showDateTime = this.convertDateService.convertDate(showDate);

    formData.append('ShowId', this.repertoireForm.get('showId').value);
    formData.append('ShowDate', showDateTime);
    formData.append('IsPremiere', this.repertoireForm.get('isPremiere').value);

    const prices = this.repertoireForm.get('addPriceDtos').value;

    for(let i = 0; i < prices.length; i++){
      formData.append('AddPriceDtos[' + i + '][SectorId]', prices[i].sectorId);
      formData.append('AddPriceDtos[' + i + '][TicketPrice]', prices[i].ticketPrice);
      formData.append('AddPriceDtos[' + i + '][CurrencyId]', prices[i].currencyId);
    }

  //  new Response(formData).text().then(console.log);

    this.repertoireService.editRepertoire(this.repertoireIdValue, formData)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Added Successfully!',
          'bottom',
          'center'
        ),
        this.router.navigate(['/repertoire/all-plays'])
        }),
        (err: any) => console.log(err)
  }

  cancel(){
    this.router.navigate(['repertoire/all-plays']);
  }

}
