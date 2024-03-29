import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorBasic } from 'src/app/actors/all-actors/actorBasic.model';
import { ActorsService } from 'src/app/actors/all-actors/actors.service';
import { Category } from 'src/app/categories/all-categories/categories.model';
import { CategoriesService } from 'src/app/categories/all-categories/categories.service';
import { DirectorBasic } from 'src/app/directors/all-directors/directorBasic.model';
import { DirectorsService } from 'src/app/directors/all-directors/directors.service';
import { Scene } from 'src/app/scenes/all-scenes/scenes.model';
import { ScenesService } from 'src/app/scenes/all-scenes/scenes.service';
import { ConvertDateService } from 'src/app/shared/services/convert-date.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TheatreBasic } from 'src/app/theatres/all-theatres/theatreBasic.model';
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
  categoryListing: Category[];
  theatreListing: TheatreBasic[];
  scenesInTheatre: Scene[];
  selectedScene: number;
  sceneName: String;
  directorListing: DirectorBasic[];
  actorListing: ActorBasic[];
  showDetails: Show;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private showService: ShowsService,
    private categoryService: CategoriesService,
    private theatreService: TheatreService,
    private sceneService: ScenesService,
    private directorService: DirectorsService,
    private actorService: ActorsService,
    private router: Router,
    private notificationService: NotificationService,
    private convertDateService: ConvertDateService) { }

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
      .subscribe((show: Show) => {
        this.editShow(show),
        this.showDetails = show,
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


  onSubmit() : void {

    var showDate = this.showForm.get('premiereDate').value;
    var showDateTime = this.convertDateService.convertDate(showDate);

    const formData = new FormData();

    formData.append('title', this.showForm.get('title').value);
    formData.append('description', this.showForm.get('description').value);
    formData.append('duration', this.showForm.get('duration').value);
    formData.append('contentAdvisory', 'False');
    formData.append('premiereDate', showDateTime);
    formData.append('categoryId', this.showForm.get('categoryId').value);
    formData.append('writer', this.showForm.get('writer').value);
    formData.append('directorId', this.showForm.get('directorId').value);
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

    this.showService.editShow(this.showDetails.id, formData)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Edited Successfully!',
          'bottom',
          'center'
        ),
        this.router.navigate(['/shows/all-shows'])
        }),
      (err: any) => console.log(err)
  }

  cancel(){
    this.router.navigate(['/shows/all-shows']);
  }

}
