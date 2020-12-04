import { Purchase } from "../../purchases/all-purchases/purchases.model";

export interface IPurchaseData {
  data: Purchase[];
  pageNumber: number;
  totalCount: number;
  pagesCount: number;
}
