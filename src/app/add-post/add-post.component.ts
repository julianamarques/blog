import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  url = 'http://localhost:8000/posts/';
  title: string;
  content: string;
  public: boolean;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  savePost() {
    this.http.post(this.url, {title: this.title, content: this.content, public: this.public, user: localStorage.getItem('user_id')},
    {headers: ({'Content-Type': 'application/json', Authorization: 'JWT ' + localStorage.getItem('token')})})
    .subscribe((response) => {
      this.router.navigate(['perfil']);
    },
    error => console.log(error)
    );
  }
}
