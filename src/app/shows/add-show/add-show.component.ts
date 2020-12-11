import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActorsService } from 'src/app/actors/all-actors/actors.service';
import { CategoriesService } from 'src/app/categories/all-categories/categories.service';
import { DirectorsService } from 'src/app/directors/all-directors/directors.service';
import { ScenesService } from 'src/app/scenes/all-scenes/scenes.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TheatreService } from 'src/app/theatres/all-theatres/theatres.service';
import { ShowsService } from '../all-shows/shows.service';
import { ConvertDateService } from '../../shared/services/convert-date.service';

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
  directorListing: any = [];
  actorListing: any = [];

  constructor(private showService: ShowsService,
    private theatreService: TheatreService,
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private sceneService: ScenesService,
    private directorService: DirectorsService,
    private actorService: ActorsService,
    private router: Router,
    private notificationService: NotificationService,
    private convertDateService: ConvertDateService) { }

  ngOnInit() {
    this.theatreService.getTheatreList()
      .subscribe(theatres =>{
        this.theatreListing = theatres
      });

    this.categoryService.getCategoryList()
      .subscribe(categories => {
        this.categoryListing = categories
      });

    this.directorService.getDirectorList()
      .subscribe(directors => {
        this.directorListing = directors
      });

    this.actorService.getActorList()
      .subscribe(actors =>{
        this.actorListing = actors
      });

    this.showForm = this.fb.group({
      id: 0,
      title: [''],
      theatreId: ['', [
        Validators.required
      ]],
      sceneId: ['', [
        // Validators.required
      ]],
      categoryId: ['', [
        // Validators.required
      ]],
      showDescription: ['',[
        // Validators.required
      ]],
      duration: ['', [
        // Validators.required
      ]],
      contentAdvisory: [''],
      premiereDate: [''],
      writer: [''],
      director: ['', [
        // Validators.required
      ]],
      actorShowDtos: this.fb.array([this.initialActorRows()]),
      showImg: ['']
    });
  }

  initialActorRows(){
    return this.fb.group({
      actorId: [''],
      actorRoleName: [''],
      actorRoleDescription: ['']
    });
  }

  get formArr(){
    return this.showForm.get('actorShowDtos') as FormArray;
  }

  get actorControls(){
    return this.showForm.controls.actorShowDtos['controls'];
  }

  addNewActor(){
    this.formArr.push(this.initialActorRows());
  }

  deleteActorRow(index: number){
    this.formArr.removeAt(index);
  }

  onChangeObj($event){
    this.sceneService.getScenesInTheatre($event)
      .subscribe(data =>{
        this.scenesInTheatre = data
      })
  }

  onSubmit(){

    var showDate = this.showForm.get('premiereDate').value;
    var showDateTime = this.convertDateService.convertDate(showDate);

    const formData = new FormData();

    formData.append('title', this.showForm.get('title').value);
    formData.append('description', this.showForm.get('showDescription').value);
    formData.append('duration', this.showForm.get('duration').value);
    formData.append('contentAdvisory', 'False');
    formData.append('premiereDate', showDateTime);
    formData.append('categoryId', this.showForm.get('categoryId').value);
    formData.append('writer', this.showForm.get('writer').value);
    formData.append('directorId', this.showForm.get('director').value);
    formData.append('theatreId', this.showForm.get('theatreId').value);
    formData.append('sceneId', this.showForm.get('sceneId').value);

    const actors = this.showForm.get('actorShowDtos').value;

    for(let i = 0; i < actors.length; i++){
      formData.append('actorShowDtos[' + i + '][actorId]', actors[i].actorId);
      formData.append('actorShowDtos[' + i + '][actorRoleName]', actors[i].actorRoleName);
      formData.append('actorShowDtos[' + i + '][actorRoleDescription]', actors[i].actorRoleDescription);
    }

    const images = this.showForm.get('showImg').value;

    for(var i=0; i<images.length; i++){
      formData.append("showImages", images[i]);
    }

    this.showService.addShow(formData)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Added Successfully!',
          'bottom',
          'center'
        ),
        this.router.navigate(['shows/all-shows']);
      });

  }

  cancel(){
    this.router.navigate(['/shows/all-shows']);
  }

}
