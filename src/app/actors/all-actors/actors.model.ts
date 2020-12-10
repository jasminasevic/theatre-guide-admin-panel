import { IImage } from '../../shared/interfaces/IImage';
import { ShowForActor } from '../../shows/all-shows/showForActor.model';

export class Actor {
  id: number;
  actorFirstName: string;
  actorLastName: string;
  actorBiography: string;
  actorImage?: IImage[];
  actorInShow: ShowForActor[]

  constructor(actor){
    this.id = actor.Id;
    this.actorFirstName = actor.actorFirstName || '';
    this.actorLastName = actor.actorLastName || '';
    this.actorBiography = actor.actorBiography || '';
    this.actorImage = actor.actorImage || undefined;
    this.actorInShow = actor.actorInShow || '';
  }
}
