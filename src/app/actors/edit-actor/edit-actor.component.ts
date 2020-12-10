import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActorsService } from '../all-actors/actors.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.scss']
})
export class EditActorComponent implements OnInit {

  actorForm: FormGroup;
  actorDetails: any;

  formData = {
    id: 0,
    actorFirstName: '',
    actorLastName: '',
    actorBiography: '',
    actorImage: ''
  }

  constructor(private actorService: ActorsService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.actorForm = this.createActorForm();
    }

  ngOnInit() {
    let actorId = this.activatedRoute.snapshot.params['id'];
    this.actorService.getActor(actorId)
      .subscribe(actor => {
        this.actorDetails = actor;
        this.actorForm.patchValue({
          actorFirstName: this.actorDetails.actorFirstName,
          actorLastName: this.actorDetails.actorLastName,
          actorBiography: this.actorDetails.actorBiography
        });
      });
  }

  createActorForm() : FormGroup {
    return this.fb.group({
      id: 0,
      actorFirstName: [this.formData.actorFirstName,
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      actorLastName: [this.formData.actorLastName,
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      actorBiography: [this.formData.actorBiography],
      actorImage: ['']
    });
  }

  onSubmit(){
    const formData = new FormData();

    formData.append('actorFirstName', this.actorForm.get('actorFirstName').value);
    formData.append('actorLastName', this.actorForm.get('actorLastName').value);
    formData.append('actorBiography', this.actorForm.get('actorBiography').value);

    const images = this.actorForm.get('actorImage').value;

    if(images != ''){
      images.forEach(element => {
        formData.append('actorImage', element);
      })
    }
    else
    {
      formData.append('actorImage', null);
    }

    this.actorService.editActor(this.actorDetails.id, formData)
      .subscribe(() =>{
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Edited Successfully!',
          'bottom',
          'center'
        ),
        this.router.navigate(['/actors/all-actors']);
      })
  }

  cancel(){
    this.router.navigate(['/actors/all-actors']);
  }

}
