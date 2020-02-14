import { Component , OnInit} from '@angular/core';
import { AlertService, LoginService } from './_service';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { UserToken } from './_model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'inventory-assets';
  year: any;
  idleState = 'Not started.';
  userToken: UserToken = new UserToken();

  constructor(private loginService: LoginService,
              private router: Router,
              private bnIdle: BnNgIdleService,
              private alertService: AlertService) {
    this.year =  this.year = (new Date()).getFullYear();
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

ngOnInit() {
  this.timeOut();
}
  timeOut() {
    this.bnIdle.startWatching(300).subscribe((res) => {
      if (res) {
          console.log('session expired');
          this.logout();
          if (this.userToken.token != null) {
            this.alertService.error('You have beeen Loged Out due to 5Minutes of inactivity. Please Login Again to proceed', true);
          }
      }
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
