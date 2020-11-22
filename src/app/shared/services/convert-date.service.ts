import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertDateService {

constructor() { }

  convertDate(fullDate){
    var date = new Date(fullDate),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),

    hrs = ("0" + date.getHours()),
    mins = ("0" + date.getMinutes()),
    secs = ("0" + date.getSeconds());

    var convertedDate = [date.getFullYear(), mnth, day].join("-");
    var convertedTime = [hrs, mins, secs].join(":");

    return convertedDate + ' ' + convertedTime;
  }

  getDateFromDateTime(fullDate){
    var date = new Date(fullDate),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);

    var convertedDate = [date.getFullYear(), mnth, day].join("-");

    return convertedDate;
  }

}
