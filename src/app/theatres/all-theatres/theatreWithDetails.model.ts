import { IImage } from "../../shared/interfaces/IImage";
import { SceneWithSectors } from '../../scenes/all-scenes/sceneWithSectors.model';
import { ShowForActor } from 'src/app/shows/all-shows/showForActor.model';

export class TheatreWithDetails {
  id: number;
  name: string;
  description: string;
  email: string;
  workingHours: string;
  telephone: string;
  location: string;
  isTheatreVisible: boolean;
  showImageDtos: IImage[];
  getSceneWithSectorsDtos: SceneWithSectors[];
  showBaseInfoDtos: ShowForActor[];

  constructor(theatre){
    this.id = theatre.id;
    this.name = theatre.name || '';
    this.description = theatre.description || '';
    this.workingHours = theatre.workingHours || '';
    this.telephone = theatre.telephone || '';
    this.location = theatre.location || '';
    this.isTheatreVisible = theatre.isTheatreVisible || '';
    this.showImageDtos = theatre.theatreImage || '';
    this.getSceneWithSectorsDtos = theatre.getSceneWithSectorsDtos || '';
    this.showBaseInfoDtos = theatre.showBaseInfoDtos || '';
  }
}

