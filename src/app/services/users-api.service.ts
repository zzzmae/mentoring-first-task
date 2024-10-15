import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { User } from '../components/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private readonly _http = inject(HttpClient);
  private readonly _url = environment.apiUrl;

  public getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._url);
  }

  public addUser(user: User): Observable<User> {
    return this._http.post<User>(this._url, user);
  }
}
