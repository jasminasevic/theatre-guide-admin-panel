import { IImage } from '../../shared/interfaces/IImage';

export class Actor {
  id: number;
  actorFirstName: string;
  actorLastName: string;
  actorBiography: string;
  actorImage?: IImage[];

  constructor(actor){
    this.id = actor.Id;
    this.actorFirstName = actor.actorFirstName || '';
    this.actorLastName = actor.actorLastName || '';
    this.actorBiography = actor.actorBiography || '';
    this.actorImage = actor.actorImage || undefined;
  }
}
