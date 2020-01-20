import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  url = 'http://localhost:8000/users/';
  name: string;
  password: string;
  email: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveUser() {
    this.http.post(this.url, {name: this.name, email: this.email, password: this.password},
    {headers: ({'Content-Type': 'application/json', Authorization:  'JWT '.concat(localStorage.getItem('token'))})})
    .subscribe((response) => {
      this.router.navigate(['login']);
    },
      error => console.log(error)
    );
  }
}
