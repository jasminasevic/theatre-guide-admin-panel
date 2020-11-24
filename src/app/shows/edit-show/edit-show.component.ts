import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorsService } from 'src/app/actors/all-actors/actors.service';
import { CategoriesService } from 'src/app/categories/all-categories/categories.service';
import { DirectorsService } from 'src/app/directors/all-directors/directors.service';
import { ScenesService } from 'src/app/scenes/all-scenes/scenes.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TheatreService } from 'src/app/theatres/all-theatres/theatres.service';
import { Show } from '../all-shows/shows.model';
import { ShowsService } from '../all-shows/shows.service';

@Component({
  selector: 'app-edit-show',
  templateUrl: './edit-show.component.html',
  styleUrls: ['./edit-show.component.scss']
})
export class EditShowComponent implements OnInit {

  showForm: FormGroup;
  categoryListing: any = [];
  theatreListing: any = [];
  selectedTheatre: any;
  scenesInTheatre: any = [];
  selectedScene: number;
  sceneName: String;
  directorListing: any = [];
  actorListing: any = [];
  showDetails: any;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private showService: ShowsService,
    private categoryService: CategoriesService,
    private theatreService: TheatreService,
    private sceneService: ScenesService,
    private directorService: DirectorsService,
    private actorService: ActorsService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.categoryService.getCategoryList()
      .subscribe(categories => {
        this.categoryListing = categories
      });

    this.theatreService.getTheatreList()
      .subscribe(theatres => {
        this.theatreListing = theatres
      });

    this.directorService.getDirectorList()
      .subscribe(directors => {
        this.directorListing = directors
      });

    this.actorService.getActorList()
      .subscribe(actors => {
        this.actorListing = actors
      });

    this.showForm = this.createShowForm();

    let showId = this.activatedRoute.snapshot.params['id'];

    this.showService.getShow(showId)
      .subscribe((show: any) => {
        this.editShow(show),
        this.showDetails = show,
        console.log(this.showDetails);
        this.selectedScene = show.sceneId,
        this.sceneName = show.scene
      },
      (err:any) => console.log(err));
  }

  editShow(show){
    this.showForm.patchValue({
      title: show.title,
      categoryId: show.categoryId,
      description: show.description,
      theatreId: show.theatreId,
      sceneId: show.sceneId,
      duration: show.duration,
      premiereDate: show.premiereDate,
      writer: show.writer,
      directorId: show.directorId
    }),
    this.showForm.setControl('actorShowDtos', this.setExistingActors(show.actorShowDtos));
  }

  setExistingActors(actorsSet) : FormArray {
    const actorFormArray = new FormArray([]);
    actorsSet.forEach(a => {
      actorFormArray.push(this.fb.group({
        actorId: a.actorId,
        actorFirstName: a.actorFirstName,
        actorLastName: a.actorLastName,
        actorRoleName: a.actorRoleName,
        actorRoleDescription: a.actorRoleDescription
      }));
    });
    return actorFormArray;
  }

  createShowForm(): FormGroup {
    return this.fb.group({
      title: [''],
      categoryId: [''],
      description: [''],
      theatreId: [''],
      sceneId: [''],
      duration: [''],
      premiereDate: [''],
      writer: [''],
      directorId: [''],
      actorShowDtos: this.fb.array([this.initialActorRows]),
      showImg: ['']
    });
  }

  initialActorRows() : FormGroup {
    return this.fb.group({
      actorId: [''],
      actorRoleName: [''],
      actorRoleDescription: ['']
    });
  }

  get actorControls(){
    return (<FormArray>this.showForm.controls.actorShowDtos['controls']);
  }

  get actorFormArr(){
    return this.showForm.get('actorShowDtos') as FormArray;
  }

  addNewActor(){
    this.actorFormArr.push(this.initialActorRows());
  }

  deleteActorRow(index: number){
    this.actorFormArr.removeAt(index);
  }

  onChangeObj($event){
    this.sceneService.getScenesInTheatre($event)
      .subscribe(data => {
        this.scenesInTheatre = data
      });
  }


  onSubmit() : void{
    this.mapFormValuesToShowModel();
    console.log('posle mapiranja', this.showDetails);
    this.showService.editShow(this.showDetails.id, this.showDetails)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Edited Successfully!',
          'bottom',
          'center'
        ),
        this.router.navigate(['/scenes/all-scenes'])
        }),
      (err: any) => console.log(err)
  }

  mapFormValuesToShowModel(){
    this.showDetails.Title = this.showForm.value.title;
    this.showDetails.CategoryId = this.showForm.value.categoryId;
    this.showDetails.Description = this.showForm.value.description;
    this.showDetails.TheatreId = this.showForm.value.theatreId;
    this.showDetails.SceneId = this.showForm.value.sceneId;
    this.showDetails.Duration = this.showForm.value.duration;
    this.showDetails.PremiereDate = this.showForm.value.premiereDate;
    this.showDetails.Writer = this.showForm.value.writer;
    this.showDetails.DirectorId = this.showForm.value.directorId;
    this.showDetails.ActorShowDtos = this.showForm.value.actorShowDtos;
    this.showDetails.ShowImg = this.showForm.value.showImg;
  }

  cancel(){
    this.router.navigate(['/shows/all-shows']);
  }

}
