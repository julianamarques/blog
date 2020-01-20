import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  userData: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.userData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(this.userData).subscribe(
      response => this.router.navigate(['perfil']),
      error => alert(JSON.stringify(error))
    );
  }
}
