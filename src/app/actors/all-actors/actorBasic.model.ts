export class ActorBasic {
  id: number;
  actorFirstName: string;
  actorLastName: string;

  constructor(actor){
    this.id = actor.id;
    this.actorFirstName = actor.actorFirstName || '';
    this.actorLastName = actor.actorLastName || '';
  }
}
