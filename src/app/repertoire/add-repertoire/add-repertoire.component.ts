import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Calendar, EventInput } from '@fullcalendar/core';
import { ShowsService } from 'src/app/shows/all-shows/shows.service';

// const d = new Date();
// const day = d.getDate();
// const month = d.getMonth();
// const year = d.getFullYear();

@Component({
  selector: 'app-add-repertoire',
  templateUrl: './add-repertoire.component.html',
  styleUrls: ['./add-repertoire.component.sass']
})
export class AddRepertoireComponent implements OnInit {

  repertoireForm: FormGroup;
  showListing: any = [];
  //calendar: Calendar | null;
  // calendarEvents: EventInput[];
  // tempEvents: EventInput[];
  // calendarData: any;

  constructor(private showService: ShowsService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.showService.getShowList()
      .subscribe(data => {
        this.showListing = data,
        console.log(data);
      });

    ///console.log(day);

    this.repertoireForm = this.fb.group({
      Id: 0,
      ShowId: ['', [Validators.required]],
      ShowDate: [''],
      TheatreId: [''],
      SceneId: [''],
     // AddPriceDtos: this.fb.array([this.initalSectorRows()])
    })
  }

  initalSectorRows(){
    return this.fb.group({
        SectorId: [''],
        TicketPrice: ['']
      });
  }

  onSubmit(){
    console.log(this.repertoireForm.value);
  }

  resetForm(){
    this.repertoireForm.reset();
  }

  cancel(){
    this.router.navigate(['/repertoire/all-plays'])
  }

}
