import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TheatreService } from '../all-theatres/theatres.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.scss']
})
export class AddTheatreComponent {

  theatreForm: FormGroup;

  isTheatreVisible: any = [
    {
      id: false,
      value: 'No'
    },
    {
      id: true,
      value: 'Yes'
    }];

  constructor(private fb: FormBuilder,
      private theatreService: TheatreService,
      private router: Router,
      private notificationService: NotificationService ) {
        this.theatreForm = this.fb.group({
          Id: 0,
          Name: ['',
            [
              Validators.required,
              Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
            ]],
          Description: [''],
          Email: ['',
          [
            Validators.required,
            Validators.email
          ]],
          WorkingHours: ['',
            [
            Validators.required,
          //  Validators.pattern('^([2][0-4]|[0-1][0-9])[:]([2][0-4]|[0-1][0-9])-([2][0-4]|[0-1][0-9])[:]([2][0-4]|[0-1][0-9])$')
          ]],
          Location: [''],
          Telephone: ['',
          [
            Validators.required,
            Validators.pattern('^[\+]?[(]?[0-9\\s]{3,7}[)]?[-\\s\.]?[0-9]{3,5}[-\\s\.]?[0-9]{3,5}$')
          ]],
          IsTheatreVisible: [''],
          TheatreImage: ['']
        });
      }

  resetForm(){
    this.theatreForm.reset();
  }

  cancel(){
    this.router.navigate(['/theatres/all-theatres']);
  }

  onSubmit(){
    // const theatreData = this.theatreForm.getRawValue();
    // console.log(theatreData);

    const formData = new FormData();

    formData.append('Name', this.theatreForm.get('Name').value);
    formData.append("Description", this.theatreForm.get('Description').value);
    formData.append("Email", this.theatreForm.get('Email').value);
    formData.append("WorkingHours", this.theatreForm.get('WorkingHours').value);
    formData.append("Telephone", this.theatreForm.get('Telephone').value);
    formData.append("Location", this.theatreForm.get('Location').value);
    formData.append("IsVisible", this.theatreForm.get('IsTheatreVisible').value);

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
