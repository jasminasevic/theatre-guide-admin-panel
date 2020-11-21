import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ScenesService } from '../all-scenes/scenes.service';
import { TheatreService } from '../../theatres/all-theatres/theatres.service';
import { Scene } from '../all-scenes/scenes.model';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-edit-scene',
  templateUrl: './edit-scene.component.html',
  styleUrls: ['./edit-scene.component.sass']
})
export class EditSceneComponent implements OnInit {

  sceneForm: FormGroup;
  sceneDetails: any;
  theatreListing: any = [];
  selectedValue: number;
  selectedTheatre: String;

  constructor(private activatedRoute: ActivatedRoute,
    private sceneService: ScenesService,
    private router: Router,
    private theatreService: TheatreService,
    private fb: FormBuilder,
    private notificationService: NotificationService) {}

  ngOnInit() {
    this.theatreService.getTheatreList()
    .subscribe(data => {
      this.theatreListing = data;
      });

    this.sceneForm = this.createSceneForm();

    let sceneId = this.activatedRoute.snapshot.params.id;

    this.sceneService.getScene(sceneId)
      .subscribe(
        (scene: Scene) => {
          this.editScene(scene),
          this.sceneDetails = scene;
          this.selectedValue = scene.TheatreId;
        },
        (err: any) => console.log(err)
      );
  }

  editScene(scene){
    this.sceneForm.patchValue({
      sceneName: scene.sceneName,
      theatreId: scene.theatreId,
    }),
    this.sceneForm.setControl('addSectorDtos', this.setExistingSectors(scene.getSectorDtos));
  }

  setExistingSectors(sectorSets) : FormArray {
    const sectorFormArray = new FormArray([]);
    sectorSets.forEach(s => {
      sectorFormArray.push(this.fb.group({
        sectorName: s.sectorName,
        seatCapacity: s.seatCapacity,
        rowsTotalNumber: s.rowsTotalNumber
      }));
    });
    return sectorFormArray;
  }


  createSceneForm() : FormGroup {
    return this.fb.group({
      sceneName: [ '',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
        ]],
      theatreId : [ '',
        [
          Validators.required
        ]],
      addSectorDtos : this.fb.array([this.initialSectorRows()])
    });
  }

  get sectorControls(){
    return (<FormArray>this.sceneForm.controls.addSectorDtos['controls']);
  }

  initialSectorRows() : FormGroup {
    return this.fb.group({
      sectorName: ['',
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9-\\s]{1,}([a-zA-Z0-9-]{1,})*$')
      ]],
      seatCapacity: ['',
      [
        Validators.required,
        Validators.pattern('^[0-9][0-9]*$')
      ]],
      rowsTotalNumber: ['',
      [
        Validators.required,
        Validators.pattern('^[0-9][0-9]*$')
      ]],
    });
  }

  get formArr(){
    return this.sceneForm.get('addSectorDtos') as FormArray;
  }

  addNewSector(){
    this.formArr.push(this.initialSectorRows());
  }

  onSubmit() : void {
    this.mapFormValuesToSceneModel();
    console.log(this.sceneDetails);
    this.sceneService.editScene(this.sceneDetails.id, this.sceneDetails)
      .subscribe(
        () => {
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

  mapFormValuesToSceneModel(){
    this.sceneDetails.SceneName = this.sceneForm.value.sceneName;
    this.sceneDetails.TheatreId = this.sceneForm.value.theatreId;
    this.sceneDetails.AddSectorDtos = this.sceneForm.value.addSectorDtos;
  }

  deleteSectorRow(index: number){
    this.formArr.removeAt(index);
  }

  cancel(){
    this.router.navigate(['/scenes/all-scenes']);
  }

}
