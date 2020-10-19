import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetImagePathService {

constructor() { }

  createImagePath = (imgPath: string) => {
    return "https://localhost:44355/" + imgPath;
}

}
