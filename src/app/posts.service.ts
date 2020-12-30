import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  //error = new Subject<string>();  

  constructor(private http: HttpClient){};

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    // Send Http request
    return this.http
      .post<{ name: string }>(
        "https://ng-complete-guide-d4625-default-rtdb.firebaseio.com/posts.json",
        postData
      );
  }

  fetchPosts() {
    //...
    return this.http
      .get<{ [key: string]: Post }>(
        "https://ng-complete-guide-d4625-default-rtdb.firebaseio.com/posts.json"
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
            // do some tasks with error, i.e. analytics
            return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      "https://ng-complete-guide-d4625-default-rtdb.firebaseio.com/posts.json"
    );
  }
}
