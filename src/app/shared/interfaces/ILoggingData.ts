import { Logging } from '../../loggings/all-loggings/logging.model';

export interface ILoggingData{
  data: Logging[],
  pageNumber: number,
  totalCount: number,
  pagesCount: number
}