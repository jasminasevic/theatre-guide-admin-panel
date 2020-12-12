export class ActorBasic {
  id: number;
  firstName: string;
  lastName: string;

  constructor(actor){
    this.id = actor.id;
    this.firstName = actor.firstName || '';
    this.lastName = actor.lastName || '';
  }
}
