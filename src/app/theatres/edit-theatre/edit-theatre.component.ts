import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Theatre } from '../all-theatres/theatres.model';
import { TheatreService } from '../all-theatres/theatres.service';
import { NotificationService } from '../../shared/services/notification.service';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-edit-theatre',
  templateUrl: './edit-theatre.component.html',
  styleUrls: ['./edit-theatre.component.scss']
})
export class EditTheatreComponent {
  theatreForm: FormGroup;
  theatreDetails: any;

  formData = {
    Id: 0,
    Name: '',
    Email: '',
    Description: '',
    Telephone: '',
    WorkingHours: '',
    Location: '',
    TheatreImage: ''
  }


  constructor(private activatedRoute: ActivatedRoute,
    private theatreService: TheatreService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService) {
      this.theatreForm = this.createTheatreForm();
    }

  ngOnInit() {
    let theatreId = this.activatedRoute.snapshot.params.id;
    this.theatreService.getTheatre(theatreId)
      .subscribe(theatre => {
        this.theatreDetails = theatre;
        this.theatreForm.patchValue({
          Name: this.theatreDetails.name,
          Email: this.theatreDetails.email,
          Description: this.theatreDetails.description,
          WorkingHours: this.theatreDetails.workingHours,
          Telephone: this.theatreDetails.telephone,
          Location: this.theatreDetails.location,
          // theatreImage: this.theatreDetails.theatreImage
        });
      })
  }

  createTheatreForm() : FormGroup {
    return this.fb.group({
      Name : [this.formData.Name,
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
        ]
      ],
      Description: [this.formData.Description],
      Email: [this.formData.Email,
        [
          Validators.required,
          Validators.email
        ]
      ],
      WorkingHours: [this.formData.WorkingHours,
        [
          Validators.required,
          Validators.pattern('^([2][0-4]|[0-1][0-9])[:]([2][0-4]|[0-1][0-9])-([2][0-4]|[0-1][0-9])[:]([2][0-4]|[0-1][0-9])$')
        ]
      ],
      Telephone: [this.formData.Telephone,
        [
          Validators.required,
          Validators.pattern('^[\+]?[(]?[0-9\\s]{3,7}[)]?[-\\s\.]?[0-9]{3,5}[-\\s\.]?[0-9]{3,5}$')
        ]
      ],
      Location: [this.formData.Location],
      TheatreImage: [this.formData.TheatreImage]
    });
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

    this.theatreService.editTheatre(this.theatreDetails.id, formData)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Edited Successfully!',
          'bottom',
          'center'
        );
        this.router.navigate(['/theatres/all-theatres']);
      })
  }

  cancel(){
    this.router.navigate(['/theatres/all-theatres']);
  }
}
