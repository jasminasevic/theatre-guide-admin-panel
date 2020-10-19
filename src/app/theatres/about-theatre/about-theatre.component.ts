import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TheatreService } from '../all-theatres/theatres.service';
import { Theatre } from '../all-theatres/theatres.model';
import { IImage } from 'src/app/shared/interfaces/IImage';

@Component({
  selector: 'app-about-theatre',
  templateUrl: './about-theatre.component.html',
  styleUrls: ['./about-theatre.component.scss']
})
export class AboutTheatreComponent implements OnInit {

  theatre: any;
  imgPath: string;

  constructor(private router: Router,
    private theatreService: TheatreService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let theatreId = this.activatedRoute.snapshot.params['id'];
    this.theatreService.getTheatre(theatreId)
      .subscribe(data => {
        this.theatre = data;
        this.imgPath = this.theatre.showImageDtos[0].path;
      })
  }

  public createImagePath = (imgPath: string) => {
    return "https://localhost:44355/" + imgPath;
  }

}
