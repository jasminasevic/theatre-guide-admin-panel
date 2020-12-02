import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvertDateService } from 'src/app/shared/services/convert-date.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ShowForRepertoire } from 'src/app/shows/all-shows/shows.model';
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

  constructor(private fb: FormBuilder,
    private repertoireService: RepertoiresService,
    private router: Router,
    private showService: ShowsService,
    private activatedRoute: ActivatedRoute,
    private convertDateService: ConvertDateService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.showService.getShowList()
      .subscribe(data => {
        this.showListing = data
      })

    this.repertoireForm = this.createRepertoireForm();

    let repertoireId = this.activatedRoute.snapshot.params['id'];
    this.repertoireIdValue = repertoireId;

    this.repertoireService.getRepertoire(repertoireId)
      .subscribe((repertoire: any) =>{
        this.editRepertoire(repertoire),
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
      sceneName: repertoire.sceneName
    }),
    this.repertoireForm.setControl('addPriceDtos', this.setExistingSectorsPrices(repertoire.getPriceDtos));
  }

  setExistingSectorsPrices(sectorPriceSets){
    const sectorPriceFormArray = new FormArray([]);
    sectorPriceSets.forEach(s => {
      sectorPriceFormArray.push(this.fb.group({
        sectorId: s.sectorId,
        sectorName: s.sectorName,
        ticketPrice: s.price
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
      addPriceDtos: this.fb.array([this.initalSectorRows()])
    });
  }

  initalSectorRows(){
    return this.fb.group({
      sectorId: [''],
      sectorName: [{ disabled: true }],
      ticketPrice: ['']
    });
  }

  counter = 0;
   onChangeObj($event){
    this.counter += 1;
    if(this.counter > 1){
     this.showService.getShowsWithPricesForRepertoire($event)
      .subscribe(
        (data: ShowForRepertoire) => {
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
        ticketPrice: null
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

    const prices = this.repertoireForm.get('addPriceDtos').value;

    for(let i = 0; i < prices.length; i++){
      formData.append('AddPriceDtos[' + i + '][SectorId]', prices[i].sectorId);
      formData.append('AddPriceDtos[' + i + '][TicketPrice]', prices[i].ticketPrice);
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
    this.router.navigate(['repertoires/all-plays']);
  }

}
