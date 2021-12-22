import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.SignIn(this.email, this.password);
  }

}
