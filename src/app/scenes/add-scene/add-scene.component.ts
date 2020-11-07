import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(){
    this.theatreService.getTheatreList()
    .subscribe(data => {
      this.theatreListing = data;
      });
  }

  constructor(private sceneService: ScenesService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router,
    private theatreService: TheatreService) {
      this.sceneForm = this.fb.group({
        Id: 0,
        SceneName: ['',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
        ]],
        TheatreName: [
          Validators.required,
        ],
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
        ]]
      });
    }

  onSubmit(){

  }

  resetForm(){
    this.sceneForm.reset();
  }

  cancel(){
    console.log('skk');
    this.router.navigate[('/scenes/all-scenes')];
  }

}
