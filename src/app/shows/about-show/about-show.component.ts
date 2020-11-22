import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetImagePathService } from 'src/app/shared/services/get-image-path.service';
import { ShowsService } from '../all-shows/shows.service';
import { ConvertDateService } from '../../shared/services/convert-date.service';

@Component({
  selector: 'app-about-show',
  templateUrl: './about-show.component.html',
  styleUrls: ['./about-show.component.sass']
})
export class AboutShowComponent implements OnInit {

  show: any;
  imgPath: string;
  showDate: string;

  constructor(private showService: ShowsService,
    private activatedRoute: ActivatedRoute,
    private imagePath: GetImagePathService,
    private convertDateService: ConvertDateService) { }

  ngOnInit() {
    let showId = this.activatedRoute.snapshot.params['id'];

    this.show = this.showService.getShow(showId)
      .subscribe(data => {
        this.show = data,
        console.log(data),
        this.showDate = this.convertDateService.getDateFromDateTime(this.show.premiereDate);
        console.log(this.showDate);
        this.imgPath = this.imagePath.createImagePath(
          this.show.showImageDtos[0].path);
      })
  }

}
