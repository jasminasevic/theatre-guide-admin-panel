import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TheatreService } from '../all-theatres/theatres.service';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.scss']
})
export class AddTheatreComponent {

  theatreForm: FormGroup;

  constructor(private fb: FormBuilder,
      private theatreService: TheatreService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private notificationService: NotificationService) {
        this.theatreForm = this.fb.group({
          Id: 0,
          Name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
          Description: [''],
          Email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
          WorkingHours: [''],
          Location: [''],
          Telephone: [''],
        });
      }


  resetForm(theatreForm?: NgForm){
    this.theatreForm.reset();
  }

  onSubmit(){
    this.theatreService.addTheatre(this.theatreForm.value)
      .subscribe(
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Added Successfully!',
          'bottom',
          'center'
        )
      );
    this.router.navigateByUrl('/SampleComponent', { skipLocationChange: true});
    this.router.navigate(['theatres/all-theatres']);
  }
}
