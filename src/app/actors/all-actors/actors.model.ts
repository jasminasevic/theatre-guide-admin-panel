import { IImage } from '../../shared/interfaces/IImage';

export class Actor {
  Id: number;
  ActorFirstName: string;
  ActorLastName: string;
  ActorBiography: string;
  ActorImage: IImage[];

  constructor(actor){
    this.Id = actor.Id;
    this.ActorFirstName = actor.ActorFirstName || '';
    this.ActorLastName = actor.ActorLastName || '';
    this.ActorBiography = actor.ActorBiography || '';
    this.ActorImage = actor.TheatreImage || '';
  }
}
