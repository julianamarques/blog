import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  url = 'http://localhost:8000/posts/';
  posts: Array<any>;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.getUserPosts();
  }

  getUserPosts() {
    this.http.get<Array<any>>(
      this.url, {headers: ({'Content-Type': 'application/json', Authorization: 'JWT ' + localStorage.getItem('token')}),
      params: {user: localStorage.getItem('user_id')}})
      .subscribe(
        (response) => {
          this.posts = response;
        },
        error => console.log(error));
  }

  deletePost(id: number) {
    this.http.delete(this.url.concat(id.toString()).concat('/'),
    {headers: ({'Content-Type': 'application/json', Authorization: 'JWT ' + localStorage.getItem('token')})})
    .subscribe(
      (response) => {
        this.ngOnInit();
      },
      error => console.log(error)
    );
  }

  publishPost(id: number) {
    this.http.patch(this.url.concat(id.toString()).concat('/'), {public: true},
    {headers: ({'Content-Type': 'application/json', Authorization: 'JWT ' + localStorage.getItem('token')})})
    .subscribe(
      (response) => {
        alert('POST PUBLICADO!');
      },
      error => console.log(error)
    );
  }
}
