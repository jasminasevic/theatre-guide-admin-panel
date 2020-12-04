import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectorsService } from '../all-directors/directors.service';

@Component({
  selector: 'app-about-director',
  templateUrl: './about-director.component.html',
  styleUrls: ['./about-director.component.sass']
})
export class AboutDirectorComponent implements OnInit {

  director: any;

  constructor(private directorService: DirectorsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let directorId = this.activatedRoute.snapshot.params['id'];

    this.directorService.getDirector(directorId)
      .subscribe(data => {
        this.director = data
    })
  }

}
