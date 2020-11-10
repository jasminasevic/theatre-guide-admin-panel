import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ScenesService } from '../all-scenes/scenes.service';
import { TheatreService } from '../../theatres/all-theatres/theatres.service';

@Component({
  selector: 'app-add-scene',
  templateUrl: './add-scene.component.html',
  styleUrls: ['./add-scene.component.sass']
})
export class AddSceneComponent implements OnInit {

  sceneForm: FormGroup;
  theatreListing: any = [];

  constructor(private sceneService: ScenesService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router,
    private theatreService: TheatreService) {}


  ngOnInit(){
    this.theatreService.getTheatreList()
    .subscribe(data => {
      this.theatreListing = data;
      });

    this.sceneForm = this.fb.group({
      Id: 0,
      SceneName: ['',
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      TheatreId: [
        Validators.required,
      ],
      AddSectorDtos: this.fb.array([this.initalSectorRows()])
      });
  }

  initalSectorRows(){
    return this.fb.group({
        SectorName: ['',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
        ]],
        SeatCapacity: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9][0-9]*$')
        ]],
        RowsTotalNumber: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9][0-9]*$')
        ]],
      });
  }

  get formArr(){
    return this.sceneForm.get('AddSectorDtos') as FormArray;
  }

  get sectorControls(){
    return this.sceneForm.controls.AddSectorDtos['controls'];
  }

  addNewSector(){
    this.formArr.push(this.initalSectorRows());
  }

  deleteSectorRow(index: number){
    this.formArr.removeAt(index);
  }

  onSubmit(){

    const formData = new FormData();

    formData.append('SceneName', this.sceneForm.get('SceneName').value);
    formData.append('TheatreId', this.sceneForm.get('TheatreId').value);

    const sectors = this.sceneForm.get('AddSectorDtos').value;

    for(let i = 0; i < sectors.length; i++){
      formData.append('AddSectorDtos[' + i + '][SectorName]', sectors[i].SectorName);
      formData.append('AddSectorDtos[' + i + '][RowsTotalNumber]', sectors[i].RowsTotalNumber);
      formData.append('AddSectorDtos[' + i + '][SeatCapacity]', sectors[i].SeatCapacity);
    }

    this.sceneService.addScene(formData)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Added Successfully!',
          'bottom',
          'center'
        ),
        this.router.navigate(['scenes/all-scenes']);
        })
  }

  resetForm(){
    this.sceneForm.reset();
  }

  cancel(){
    this.router.navigate(['scenes/all-scenes']);
  }


}



