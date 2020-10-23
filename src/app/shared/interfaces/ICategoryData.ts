import { Category } from "../../categories/all-categories/categories.model";

export interface ICategoryData {
  data: Category[],
  pageNumber: number,
  totalCount: number,
  pagesCount: number
}
