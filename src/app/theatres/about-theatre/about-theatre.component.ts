import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TheatreService } from '../all-theatres/theatres.service';
import { GetImagePathService } from 'src/app/shared/services/get-image-path.service';

@Component({
  selector: 'app-about-theatre',
  templateUrl: './about-theatre.component.html',
  styleUrls: ['./about-theatre.component.scss']
})
export class AboutTheatreComponent implements OnInit {

  theatre: any;
  imgPath: string;

  constructor(private theatreService: TheatreService,
    private activatedRoute: ActivatedRoute,
    private imagePath: GetImagePathService) { }

  ngOnInit() {
    let theatreId = this.activatedRoute.snapshot.params['id'];
    this.theatreService.getTheatre(theatreId)
      .subscribe(data => {
        this.theatre = data;
        this.imgPath = this.imagePath.createImagePath(
          this.theatre.showImageDtos[0].path);
      })
  }



}
