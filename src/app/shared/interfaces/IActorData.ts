import { Actor } from '../../actors/all-actors/actors.model';

export interface IActorData {
  data: Actor[],
  pageNumber: number,
  totalCount: number,
  pagesCount: number
}
