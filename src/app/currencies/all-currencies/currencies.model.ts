export class Currency {
  id: number;
  cattegoryName: String;

    constructor(currency){
      this.id = currency.id;
      this.cattegoryName = currency.cattegoryName || '';
    }
}
