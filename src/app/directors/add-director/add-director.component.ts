import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DirectorsService } from '../all-directors/directors.service';

@Component({
  selector: 'app-add-director',
  templateUrl: './add-director.component.html',
  styleUrls: ['./add-director.component.sass']
})
export class AddDirectorComponent {

  directorForm: FormGroup;

  constructor(private fb: FormBuilder,
    private directorService: DirectorsService,
    private notificationService: NotificationService,
    private router: Router) {
      this.directorForm = this.fb.group({
        Id: 0,
        DirectorFirstName: ['',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
        ]],
        DirectorLastName: ['',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
        ]],
        DirectorBiography: [''],
      });
    }


  onSubmit(){
    this.directorService.addDirector(this.directorForm.value)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Added Successfully!',
          'bottom',
          'center'
        );
        this.router.navigate(['/directors/all-directors']);
      })
  }

  resetForm(){
    this.directorForm.reset();
  }

  cancel(){
    this.router.navigate(['directors/all-directors']);
  }

}
