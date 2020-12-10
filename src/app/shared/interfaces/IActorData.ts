import { ActorBasic } from 'src/app/actors/all-actors/actorBasic.model';
import { Actor } from '../../actors/all-actors/actors.model';

export interface IActorData {
  data: ActorBasic[],
  pageNumber: number,
  totalCount: number,
  pagesCount: number
}
