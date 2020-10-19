import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TheatreService } from '../all-theatres/theatres.service';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.scss']
})
export class AddTheatreComponent {

  theatreForm: FormGroup;
  // multiple: boolean = true;

  constructor(private fb: FormBuilder,
      private theatreService: TheatreService,
      private router: Router,
      // private snackBar: MatSnackBar,
      private activatedRoute: ActivatedRoute,
      private notificationService: NotificationService ) {
        this.theatreForm = this.fb.group({
          Id: 0,
          Name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
          Description: [''],
          Email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
          WorkingHours: [''],
          Location: [''],
          Telephone: [''],
          TheatreImage: ['']
        });
      }

  resetForm(theatreForm?: NgForm){
    this.theatreForm.reset();
  }

  onSubmit(){
    const theatreData = this.theatreForm.getRawValue();
    console.log(theatreData);

    const formData = new FormData();

    formData.append('Name', this.theatreForm.get('Name').value);
    formData.append("Description", this.theatreForm.get('Description').value);
    formData.append("Email", this.theatreForm.get('Email').value);
    formData.append("WorkingHours", this.theatreForm.get('WorkingHours').value);
    formData.append("Telephone", this.theatreForm.get('Telephone').value);
    formData.append("Location", this.theatreForm.get('Location').value);

    const images = this.theatreForm.get('TheatreImage').value;
    for(var i=0; i<images.length; i++){
      formData.append("TheatreImage", images[i]);
    }


    this.theatreService.addTheatre(formData)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Added Successfully!',
          'bottom',
          'center'
        ),
        this.router.navigateByUrl('/SampleComponent', { skipLocationChange: true}),
        this.router.navigate(['theatres/all-theatres']);
        });
      }

}
