import { Scene } from '../../scenes/all-scenes/scenes.model';

export interface ISceneData {
  data: Scene[];
  pageNumber: number;
  totalCount: number;
  pagesCount: number;
}
