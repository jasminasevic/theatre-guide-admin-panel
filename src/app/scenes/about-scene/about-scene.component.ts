import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScenesService } from '../all-scenes/scenes.service';
import { ShowForScene } from '../../shows/all-shows/showForScene.model';

@Component({
  selector: 'app-about-scene',
  templateUrl: './about-scene.component.html',
  styleUrls: ['./about-scene.component.sass']
})
export class AboutSceneComponent implements OnInit {

  scene: any;
  showsOnScene: ShowForScene[];
  sectors: any;

  constructor(private sceneService: ScenesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let sceneId = this.activatedRoute.snapshot.params['id'];

    this.scene = this.sceneService.getSceneWithShows(sceneId)
      .subscribe(data =>{
        this.scene = data,
        this.showsOnScene = data.showBaseInfoDtos,
        this.sectors = data.getSectorDtos,
        console.log(data)
      })
  }

}
