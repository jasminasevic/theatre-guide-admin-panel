import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actor } from '../all-actors/actors.model';
import { ActorsService } from '../all-actors/actors.service';
import { GetImagePathService } from '../../shared/services/get-image-path.service';

@Component({
  selector: 'app-about-actor',
  templateUrl: './about-actor.component.html',
  styleUrls: ['./about-actor.component.scss']
})
export class AboutActorComponent implements OnInit {

  actor: any;
  imgPath: string;
  actorInShow: any;

  constructor(private actorService: ActorsService,
    private activatedRoute: ActivatedRoute,
    private imagePath: GetImagePathService) { }

  ngOnInit() {
    let actorId = this.activatedRoute.snapshot.params['id'];

    this.actorService.getActor(actorId)
      .subscribe(data => {
        this.actor = data,
        this.actorInShow = data.actorInShow,
        this.imgPath = this.imagePath.createImagePath(
          this.actor.showImageDto[0].path);
      })
  }

}
