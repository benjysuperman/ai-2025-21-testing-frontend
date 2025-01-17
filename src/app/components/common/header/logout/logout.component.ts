import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [
    TranslatePipe
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  logout(event:MouseEvent) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigateByUrl("home");
  }
}
