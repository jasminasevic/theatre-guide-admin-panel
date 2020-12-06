import { Currency } from '../../currencies/all-currencies/currencies.model';

export interface ICurrencyData {
  data: Currency[],
  pageNumber: number,
  totalCount: number,
  pagesCount: number
}
