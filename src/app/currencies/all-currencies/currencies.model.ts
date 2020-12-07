export class Currency {
  id: number;
  currencyName: String;

    constructor(currency){
      this.id = currency.id;
      this.currencyName = currency.currencyName || '';
    }
}
