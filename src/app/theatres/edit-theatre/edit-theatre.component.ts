import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TheatreService } from '../all-theatres/theatres.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-edit-theatre',
  templateUrl: './edit-theatre.component.html',
  styleUrls: ['./edit-theatre.component.scss']
})
export class EditTheatreComponent {
  theatreForm: FormGroup;
  theatreDetails: any;

  formData = {
    id: 0,
    name: '',
    email: '',
    description: '',
    telephone: '',
    workingHours: '',
    location: '',
    theatreImage: ''
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
          name: this.theatreDetails.name,
          email: this.theatreDetails.email,
          description: this.theatreDetails.description,
          workingHours: this.theatreDetails.workingHours,
          telephone: this.theatreDetails.telephone,
          location: this.theatreDetails.location,
          // theatreImage: this.theatreDetails.theatreImage
        });
      })
  }

  createTheatreForm() : FormGroup {
    return this.fb.group({
      name : [this.formData.name,
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
        ]
      ],
      description: [this.formData.description],
      email: [this.formData.email,
        [
          Validators.required,
          Validators.email
        ]
      ],
      workingHours: [this.formData.workingHours,
        [
          Validators.required,
          Validators.pattern('^([2][0-4]|[0-1][0-9])[:]([2][0-4]|[0-1][0-9])-([2][0-4]|[0-1][0-9])[:]([2][0-4]|[0-1][0-9])$')
        ]
      ],
      telephone: [this.formData.telephone,
        [
          Validators.required,
          Validators.pattern('^[\+]?[(]?[0-9\\s]{3,7}[)]?[-\\s\.]?[0-9]{3,5}[-\\s\.]?[0-9]{3,5}$')
        ]
      ],
      location: [this.formData.location],
      theatreImage: [this.formData.theatreImage]
    });
  }

  onSubmit(){
    const theatreData = this.theatreForm.getRawValue();

    const formData = new FormData();

    formData.append('name', this.theatreForm.get('name').value);
    formData.append("description", this.theatreForm.get('description').value);
    formData.append("email", this.theatreForm.get('email').value);
    formData.append("workingHours", this.theatreForm.get('workingHours').value);
    formData.append("telephone", this.theatreForm.get('telephone').value);
    formData.append("location", this.theatreForm.get('location').value);

    const images = this.theatreForm.get('theatreImage').value;
    for(var i=0; i<images.length; i++){
      formData.append("theatreImage", images[i]);
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
