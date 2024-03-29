import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActorsService } from '../all-actors/actors.service';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.scss']
})
export class AddActorComponent {

  actorForm: FormGroup;

  constructor(private fb: FormBuilder,
    private actorService: ActorsService,
    private notificationService: NotificationService,
    private router: Router) {
      this.actorForm = this.fb.group({
        id: 0,
        actorFirstName: ['',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
        ]],
        actorLastName: ['',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
        ]],
        actorBiography: [''],
        actorImage: ['']
      });
    }

  onSubmit(){

    const formData = new FormData();

    formData.append('actorFirstName', this.actorForm.get('actorFirstName').value);
    formData.append('actorLastName', this.actorForm.get('actorLastName').value);
    formData.append('actorBiography', this.actorForm.get('actorBiography').value);

    const images = this.actorForm.get('actorImage').value;
    images.forEach(element => {
      formData.append('actorImage', element);
    });

    this.actorService.addActor(formData)
      .subscribe(() =>{
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Added Successfully!',
          'bottom',
          'center'
        ),
        this.router.navigate(['/actors/all-actors']);
      })
  }

  resetForm(){
    this.actorForm.reset();
  }

  cancel(){
    this.router.navigate(['/actors/all-actors']);
  }

}
