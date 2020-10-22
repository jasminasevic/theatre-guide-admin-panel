export class Category {
  Id: number;
  CategoryName: string;

  constructor(category){
    this.Id = category.Id;
    this.CategoryName = category.Name || '';
  }
}
