import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepertoiresService } from '../all-repertories/repertoires.service';

@Component({
  selector: 'app-about-repertoire',
  templateUrl: './about-repertoire.component.html',
  styleUrls: ['./about-repertoire.component.sass']
})
export class AboutRepertoireComponent {

  play: any;

  constructor(private activatedRoute: ActivatedRoute) {
      this.play = this.activatedRoute.snapshot.data['aboutPlay'];
    }

}
