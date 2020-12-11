export class ShowBaseInfo {
  id: number;
  title: String;
  theatreName: String;
  theatreId: number;
  scene: String;
  sceneId: number;

  constructor(show){
    this.id = show.id;
    this.title = show.title || '';
    this.theatreName = show.theatreName || '';
    this.theatreId = show.theatreId || '';
    this.scene = show.scene || '';
    this.sceneId = show.sceneId || '';
  }
}
