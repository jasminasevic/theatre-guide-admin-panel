import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.sass']
})
export class AddShowComponent implements OnInit {

  showForm: FormGroup;
  theatreListing: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
