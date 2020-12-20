import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetImagePathService } from 'src/app/shared/services/get-image-path.service';
import { Show } from '../all-shows/shows.model';
import { ShowsService } from '../all-shows/shows.service';

@Component({
  selector: 'app-about-show',
  templateUrl: './about-show.component.html',
  styleUrls: ['./about-show.component.sass']
})
export class AboutShowComponent implements OnInit {

  show: Show;
  imgPath: string;
  showDate: Date;

  constructor(private showService: ShowsService,
    private activatedRoute: ActivatedRoute,
    private imagePath: GetImagePathService) { }

  ngOnInit() {
    let showId = this.activatedRoute.snapshot.params['id'];

      this.showService.getShow(showId)
        .subscribe(data => {
          this.show = data,
          this.showDate = data.premiereDate;
          this.imgPath = this.imagePath.createImagePath(
            this.show.showImageDtos[0].path);
        })
  }

}
