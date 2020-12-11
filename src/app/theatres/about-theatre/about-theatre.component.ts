import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TheatreService } from '../all-theatres/theatres.service';
import { GetImagePathService } from 'src/app/shared/services/get-image-path.service';
import { SceneWithSectors } from 'src/app/scenes/all-scenes/sceneWithSectors.model';
import { TheatreWithDetails } from '../all-theatres/theatreWithDetails.model';
import { ShowForActor } from 'src/app/shows/all-shows/showForActor.model';

@Component({
  selector: 'app-about-theatre',
  templateUrl: './about-theatre.component.html',
  styleUrls: ['./about-theatre.component.scss']
})
export class AboutTheatreComponent implements OnInit {

  theatre: TheatreWithDetails;
  imgPath: string;
  getSceneWithSectorsDtos: SceneWithSectors[];
  showBaseInfoDtos: ShowForActor[];

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
        this.getSceneWithSectorsDtos = data.getSceneWithSectorsDtos;
        this.showBaseInfoDtos = data.showBaseInfoDtos;
      })
  }



}
