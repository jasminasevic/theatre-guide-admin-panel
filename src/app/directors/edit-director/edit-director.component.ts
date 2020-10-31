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
    Id: 0,
    DirectorFirstName: '',
    DirectorLastName: '',
    DirectorBiography: '',
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
          DirectorFirstName: this.directorDetails.directorFirstName,
          DirectorLastName: this.directorDetails.directorLastName,
          DirectorBiography: this.directorDetails.directorBiography
        });
      });
  }

  createDirectorForm() : FormGroup {
    return this.fb.group({
      Id: 0,
      DirectorFirstName: [this.formData.DirectorFirstName,
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      DirectorLastName: [this.formData.DirectorLastName,
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      DirectorBiography: [this.formData.DirectorBiography]
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
