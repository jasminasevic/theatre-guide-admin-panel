import { Sector } from "./sector.model";

export class Scene {
  Id: number;
  SceneName: String;
  TheatreName: string;
  Sector: Sector[];

  constructor(scene){
    this.Id = scene.Id;
    this.SceneName = scene.SceneName;
    this.TheatreName = scene.TheatreName;
    this.Sector = scene.Sector;
  }
}
