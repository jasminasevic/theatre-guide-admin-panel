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
    Id: 0,
    ActorFirstName: '',
    ActorLastName: '',
    ActorBiography: '',
    ActorImage: ''
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
          ActorFirstName: this.actorDetails.actorFirstName,
          ActorLastName: this.actorDetails.actorLastName,
          ActorBiography: this.actorDetails.actorBiography
        });
      });
  }

  createActorForm() : FormGroup {
    return this.fb.group({
      Id: 0,
      ActorFirstName: [this.formData.ActorFirstName,
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      ActorLastName: [this.formData.ActorLastName,
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      ActorBiography: [this.formData.ActorBiography],
      ActorImage: ['']
    });
  }

  onSubmit(){
    const formData = new FormData();

    formData.append('ActorFirstName', this.actorForm.get('ActorFirstName').value);
    formData.append('ActorLastName', this.actorForm.get('ActorLastName').value);
    formData.append('ActorBiography', this.actorForm.get('ActorBiography').value);

    const images = this.actorForm.get('ActorImage').value;
    images.forEach(element => {
      formData.append('ActorImage', element);
    });

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
