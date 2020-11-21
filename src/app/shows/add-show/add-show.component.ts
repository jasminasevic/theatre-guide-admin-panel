import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/categories/all-categories/categories.service';
import { ScenesService } from 'src/app/scenes/all-scenes/scenes.service';
import { TheatreService } from 'src/app/theatres/all-theatres/theatres.service';
import { ShowsService } from '../all-shows/shows.service';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.sass']
})
export class AddShowComponent implements OnInit {

  showForm: FormGroup;
  theatreListing: any = [];
  categoryListing: any = [];
  scenesInTheatre: any = [];
  selectedTheatre: any;

  constructor(private showService: ShowsService,
    private theatreService: TheatreService,
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private sceneService: ScenesService) { }

  ngOnInit() {
    this.theatreService.getTheatreList()
      .subscribe(theatres =>{
        this.theatreListing = theatres
      });

      if(this.selectedTheatre != null){
        console.log('ok');
      }

    this.categoryService.getCategoryList()
      .subscribe(categories => {
        this.categoryListing = categories
      });

    this.showForm = this.fb.group({
      Id: 0,
      Title: [''],
      TheatreId: ['', [
        Validators.required
      ]],
      SceneId: ['', [
        // Validators.required
      ]],
      CategoryId: ['', [
        // Validators.required
      ]],
      ShowDescription: ['',[
        // Validators.required
      ]],
      Duration: ['', [
        // Validators.required
      ]],
      ContentAdvisory: [''],
      PremiereDate: [''],
      Writer: [''],
      Director: ['', [
        // Validators.required
      ]]
    });
  }

  onChangeObj($event){
    this.sceneService.getScenesInTheatre($event)
      .subscribe(data =>{
        this.scenesInTheatre = data
      })
  }

  onSubmit(){

  }

  resetForm(){

  }


  cancel(){

  }

}
