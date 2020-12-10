export class Category {
  id: number;
  categoryName: string;

  constructor(category){
    this.id = category.id;
    this.categoryName = category.name || '';
  }
}
