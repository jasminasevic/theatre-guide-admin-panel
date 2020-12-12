import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ScenesService } from '../all-scenes/scenes.service';
import { TheatreService } from '../../theatres/all-theatres/theatres.service';
import { TheatreBasic } from 'src/app/theatres/all-theatres/theatreBasic.model';

@Component({
  selector: 'app-add-scene',
  templateUrl: './add-scene.component.html',
  styleUrls: ['./add-scene.component.sass']
})
export class AddSceneComponent implements OnInit {

  sceneForm: FormGroup;
  theatreListing: TheatreBasic[];

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
      id: 0,
      sceneName: ['',
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      theatreId: [
        Validators.required,
      ],
      addSectorDtos: this.fb.array([this.initalSectorRows()])
      });
  }

  initalSectorRows(){
    return this.fb.group({
        sectorName: ['',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
        ]],
        seatCapacity: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9][0-9]*$')
        ]],
        rowsTotalNumber: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9][0-9]*$')
        ]],
      });
  }

  get formArr(){
    return this.sceneForm.get('addSectorDtos') as FormArray;
  }

  get sectorControls(){
    return this.sceneForm.controls.addSectorDtos['controls'];
  }

  addNewSector(){
    this.formArr.push(this.initalSectorRows());
  }

  deleteSectorRow(index: number){
    this.formArr.removeAt(index);
  }

  onSubmit(){

    const formData = new FormData();

    formData.append('sceneName', this.sceneForm.get('sceneName').value);
    formData.append('theatreId', this.sceneForm.get('theatreId').value);

    const sectors = this.sceneForm.get('addSectorDtos').value;

    for(let i = 0; i < sectors.length; i++){
      formData.append('addSectorDtos[' + i + '][sectorName]', sectors[i].sectorName);
      formData.append('addSectorDtos[' + i + '][rowsTotalNumber]', sectors[i].rowsTotalNumber);
      formData.append('addSectorDtos[' + i + '][seatCapacity]', sectors[i].seatCapacity);
    }

    //new Response(formData).text().then(console.log);

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



