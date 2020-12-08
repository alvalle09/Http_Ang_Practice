import { PostsService } from './posts.service';
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

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
      this.fetchPosts();
  }

  onCreatePost(postData: Post ) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isFetching = true;
    
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
      // important: subscription required to start request stream
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      })
  }

  onClearPosts() {
    // Send Http request
  }
}
