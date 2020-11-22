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
      ]],
      ActorShowDtos: this.fb.array([this.initialActorRows()]),
      ShowImg: ['']
    });
  }

  initialActorRows(){
    return this.fb.group({
      ActorId: [''],
      ActorRoleName: [''],
      ActorRoleDescription: ['']
    });
  }

  get formArr(){
    return this.showForm.get('ActorShowDtos') as FormArray;
  }

  get actorControls(){
    return this.showForm.controls.ActorShowDtos['controls'];
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

    var showDate = this.showForm.get('PremiereDate').value;
    var showDateTime = this.convertDateService.convertDate(showDate);

    const formData = new FormData();

    formData.append('Title', this.showForm.get('Title').value);
    formData.append('Description', this.showForm.get('ShowDescription').value);
    formData.append('Duration', this.showForm.get('Duration').value);
    formData.append('ContentAdvisory', 'False');
    formData.append('PremiereDate', showDateTime);
    formData.append('CategoryId', this.showForm.get('CategoryId').value);
    formData.append('Writer', this.showForm.get('Writer').value);
    formData.append('DirectorId', this.showForm.get('Director').value);
    formData.append('TheatreId', this.showForm.get('TheatreId').value);
    formData.append('SceneId', this.showForm.get('SceneId').value);

    const actors = this.showForm.get('ActorShowDtos').value;

    for(let i = 0; i < actors.length; i++){
      formData.append('ActorShowDtos[' + i + '][ActorId]', actors[i].ActorId);
      formData.append('ActorShowDtos[' + i + '][ActorRoleName]', actors[i].ActorRoleName);
      formData.append('ActorShowDtos[' + i + '][ActorRoleDescription]', actors[i].ActorRoleDescription);
    }

    const images = this.showForm.get('ShowImg').value;

    for(var i=0; i<images.length; i++){
      formData.append("ShowImages", images[i]);
    }

    console.log();

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
