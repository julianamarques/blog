import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  displayMenu: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.displayMenu = this.authService.isLoggedIn() ? 'block' : 'none';
  }

  logout() {
    this.authService.logout();
  }

  getAuthUser() {
    this.authService.getAuthUser().subscribe((response) => {
      this.user = JSON.parse(response);
    },
    error => alert('ERRO')
    );
  }

  adicionarPost() {
    this.router.navigate(['add-post']);
  }
}
