import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScenesService } from '../all-scenes/scenes.service';

@Component({
  selector: 'app-about-scene',
  templateUrl: './about-scene.component.html',
  styleUrls: ['./about-scene.component.sass']
})
export class AboutSceneComponent implements OnInit {

  scene: any;

  constructor(private sceneService: ScenesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let sceneId = this.activatedRoute.snapshot.params['id'];

    this.scene = this.sceneService.getScene(sceneId)
      .subscribe(data =>{
        this.scene = data
      })
  }

}
