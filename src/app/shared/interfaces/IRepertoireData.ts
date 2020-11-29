import { Play } from 'src/app/repertoire/all-repertories/plays.model';

export interface IRepertoireData {
  data: Play[];
  pageNumber: number;
  totalCount: number;
  pagesCount: number;
}
