import { Director } from '../../directors/all-directors/directors.model';

export interface IDirectorData {
  data: Director[],
  pageNumber: number,
  totalCount: number,
  pagesCount: number
}
