import { Post } from './post.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
      this.fetchPosts();
  }

  onCreatePost(postData: Post ) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-d4625-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isFetching = true;
    // important: subscription required to start request stream
    this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-d4625-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key })
          }
        }
        return postsArray;
      })
      )
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      })
  }

  onClearPosts() {
    // Send Http request
  }
}
