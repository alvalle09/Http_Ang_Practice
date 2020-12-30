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
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      }, error => {
        this.error = error.message;      
      }
    );
  }

  onCreatePost(postData: Post ) {
    this.postsService.createAndStorePost(postData.title, postData.content)
      .subscribe(posts => {
        this.isFetching = false;
      }, error => {
        this.error = error.message;
        console.log(error);
      },
      () => this.onFetchPosts());          
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.error = error.message;      
        console.log(error);
        });
  }

  private fetchPosts() {
   this.postsService.fetchPosts();      
  }

  onClearPosts() {
    // handled in post.service, but get notified here
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }
}

