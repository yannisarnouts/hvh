import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email = '';
  password = '';
  public errorMessage = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.IsLoggedIn();
  }

  async IsLoggedIn() {
    const loggedIn = await this.authService.isLoggedIn();
    if (loggedIn) {
      this.router.navigate(['admin']);
    }
  }

  signIn() {
    const _ = this;
    this.authService.SignIn(this.email, this.password).then(function(userCredentials: any) {
      _.router.navigate(['/admin']);
    }).catch(function(error: any) {
      _.errorMessage = true;
    });
  }

}
