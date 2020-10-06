import { Theatre } from '../../theatres/all-theatres/theatres.model';

export interface ITheatreData {
  data: Theatre[],
  pageNumber: number,
  totalCount: number,
  pagesCount: number
}
