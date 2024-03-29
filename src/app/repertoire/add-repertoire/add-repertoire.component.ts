import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrenciesService } from 'src/app/currencies/all-currencies/currencies.service';
import { ConvertDateService } from 'src/app/shared/services/convert-date.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ShowForRepertoire } from 'src/app/shows/all-shows/showForRepertoire.model';
import { ShowsService } from 'src/app/shows/all-shows/shows.service';
import { RepertoiresService } from '../all-repertories/repertoires.service';

@Component({
  selector: 'app-add-repertoire',
  templateUrl: './add-repertoire.component.html',
  styleUrls: ['./add-repertoire.component.sass']
})
export class AddRepertoireComponent implements OnInit {

  repertoireForm: FormGroup;
  showListing: any = [];
  selectedShow: number;
  sectors: any = [];
  repertoireDetails: any;
  showId: number;
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

  constructor(private showService: ShowsService,
    private fb: FormBuilder,
    private router: Router,
    private convertDateService: ConvertDateService,
    private repertoireService: RepertoiresService,
    private notificationService: NotificationService,
    private currencyService: CurrenciesService) { }

  ngOnInit() {
    this.showService.getShowList()
      .subscribe(data => {
        this.showListing = data
      });

    this.currencyService.getCurrencyList()
      .subscribe(data => {
        this.currencyListing = data
      });

    this.repertoireForm = this.fb.group({
      id: 0,
      showId: ['', [Validators.required]],
      showDateTime: [''],
      theatreId: [''],
      theatreName: [''],
      sceneName: [''],
      isPremiere: [''],
      addPriceDtos: this.fb.array([this.initalSectorRows()])
    })
  }

  initalSectorRows(){
    return this.fb.group({
        sectorId: [''],
        sectorName: [{ disabled: true }],
        ticketPrice: [''],
        currencyId: ['']
      });
  }

  onChangeObj($event){
    this.showService.getShowForRepertoire($event)
      .subscribe(
        (data: ShowForRepertoire[]) => {
        this.displayShowData(data),
        this.repertoireDetails = data
      })}

  displayShowData(data){
    this.repertoireForm.patchValue({
      theatreName: data.theatre,
      theatreId: data.theatreId,
      sceneName: data.scene,
      isPremiere: false,
    }),
    this.repertoireForm.setControl('addPriceDtos', this.setExistingSectors(data.getSectorDtos));
  }

  setExistingSectors(sectorSets) : FormArray {
    const sectorFormArray = new FormArray([]);
    sectorSets.forEach(s => {
      sectorFormArray.push(this.fb.group({
        sectorName: s.sectorName,
        sectorId: s.id,
        ticketPrice: null,
        currencyId: 2
      }));
    });
    return sectorFormArray;
  }

  get sectorControls(){
    return (<FormArray>this.repertoireForm.controls.addPriceDtos['controls']);
  }

  onSubmit(){
    const formData = new FormData();

    var showDate = this.repertoireForm.get('showDateTime').value;
    var showDateTime = this.convertDateService.convertDate(showDate);

    formData.append('ShowId', this.repertoireForm.get('showId').value);
    formData.append('TheatreId', this.repertoireForm.get('theatreId').value);
    formData.append('ShowDate', showDateTime);
    formData.append('IsPremiere', this.repertoireForm.get('isPremiere').value);

    const prices = this.repertoireForm.get('addPriceDtos').value;

    for(let i = 0; i < prices.length; i++){
      formData.append('AddPriceDtos[' + i + '][SectorId]', prices[i].sectorId);
      formData.append('AddPriceDtos[' + i + '][TicketPrice]', prices[i].ticketPrice);
      formData.append('AddPriceDtos[' + i + '][CurrencyId]', prices[i].currencyId)
    }

    new Response(formData).text().then(console.log);

    this.repertoireService.addRepertoire(formData)
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

  resetForm(){
    this.repertoireForm.reset();
  }

  cancel(){
    this.router.navigate(['/repertoire/all-plays'])
  }

}
