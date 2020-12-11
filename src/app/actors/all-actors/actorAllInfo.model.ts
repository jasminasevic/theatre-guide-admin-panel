import { IImage } from '../../shared/interfaces/IImage';
import { ShowForActor } from '../../shows/all-shows/showForActor.model';
import { TheatreBasic } from '../../theatres/all-theatres/theatreBasic.model';

export class ActorAllInfo {
  id: number;
  actorFirstName: string;
  actorLastName: string;
  actorBiography: string;
  actorImage?: IImage[];
  actorInShow: ShowForActor[];
  theatreBasicDtos: TheatreBasic[];

  constructor(actor){
    this.id = actor.Id;
    this.actorFirstName = actor.actorFirstName || '';
    this.actorLastName = actor.actorLastName || '';
    this.actorBiography = actor.actorBiography || '';
    this.actorImage = actor.actorImage || undefined;
    this.actorInShow = actor.actorInShow || '';
    this.theatreBasicDtos = actor.theatreBasicDtos || '';
  }
}
