import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url = 'http://localhost:8000/public-posts/';
  posts: Array<any>;

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit() {
    this.getPublicPosts();
  }

  getPublicPosts() {
    this.http.get<Array<any>>(
      this.url, {headers: ({'Content-Type': 'application/json'})})
      .subscribe(
        (response) => {
          this.posts = response;
        },
        error => alert('ERRO'));
  }

}
