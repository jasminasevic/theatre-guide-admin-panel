import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Play } from '../all-repertories/plays.model';
import { RepertoiresService } from '../all-repertories/repertoires.service';

@Injectable({
  providedIn: 'root'
})
export class AboutRepertoireResolverService implements Resolve<Play> {

constructor(private repertoireService: RepertoiresService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Play> {
    return this.repertoireService.getRepertoire(route.paramMap.get('id'));
  }

}
