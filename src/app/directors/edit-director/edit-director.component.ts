import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorsService } from 'src/app/actors/all-actors/actors.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DirectorsService } from '../all-directors/directors.service';

@Component({
  selector: 'app-edit-director',
  templateUrl: './edit-director.component.html',
  styleUrls: ['./edit-director.component.sass']
})
export class EditDirectorComponent implements OnInit {

  directorForm: FormGroup;
  directorDetails: any;

  formData = {
    id: 0,
    directorFirstName: '',
    directorLastName: '',
    directorBiography: '',
  }

  constructor(private directorService: DirectorsService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.directorForm = this.createDirectorForm();
    }

  ngOnInit() {
    let directorId = this.activatedRoute.snapshot.params['id'];
    this.directorService.getDirector(directorId)
      .subscribe(actor => {
        this.directorDetails = actor;
        this.directorForm.patchValue({
          directorFirstName: this.directorDetails.directorFirstName,
          directorLastName: this.directorDetails.directorLastName,
          directorBiography: this.directorDetails.directorBiography
        });
      });
  }

  createDirectorForm() : FormGroup {
    return this.fb.group({
      id: 0,
      directorFirstName: [this.formData.directorFirstName,
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      directorLastName: [this.formData.directorLastName,
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      directorBiography: [this.formData.directorBiography]
    });
  }

  onSubmit(){
    this.directorService.editDirector(this.directorDetails.id, this.directorForm.value)
    .subscribe(() => {
       this.notificationService.showNotification(
                'snackbar-success',
                'Record Edited Successfully!',
                'bottom',
                'center'
              );
      this.router.navigate(['/directors/all-directors']);
      });
  }

  cancel(){

  }

}
