import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../all-users/users.model';
import { UserService} from '../all-users/users.service';
import { GetImagePathService } from 'src/app/shared/services/get-image-path.service';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.sass']
})
export class AboutUserComponent implements OnInit {

  user: any;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    let userId = this.activatedRoute.snapshot.params['id'];

    this.user = this.userService.getOneUser(userId)
      .subscribe(data=> {
        this.user = data
      });
  }
}
