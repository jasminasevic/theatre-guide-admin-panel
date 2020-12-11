import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectorsService } from '../all-directors/directors.service';
import { ShowForDirector } from '../../shows/all-shows/showForDirector.model'

@Component({
  selector: 'app-about-director',
  templateUrl: './about-director.component.html',
  styleUrls: ['./about-director.component.sass']
})
export class AboutDirectorComponent implements OnInit {

  director: any;
  directorShow: ShowForDirector[];

  constructor(private directorService: DirectorsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let directorId = this.activatedRoute.snapshot.params['id'];

    this.directorService.getDirector(directorId)
      .subscribe(data => {
        this.director = data,
        this.directorShow = data.showBaseInfoDtos
    })
  }

}
