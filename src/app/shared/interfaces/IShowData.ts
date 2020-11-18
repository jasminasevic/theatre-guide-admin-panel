import { Show } from '../../shows/all-shows/shows.model';

export interface IShowData {
  data: Show[],
  pageNumber: number,
  totalCount: number,
  pagesCount: number
}
