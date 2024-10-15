import { inject, Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { User } from '../components/users.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _usersApiService = inject(UsersApiService);
  private _usersSubject$ = new BehaviorSubject<User[]>([]);
  public users$ = this._usersSubject$.asObservable();

  public loadUsers(): void {
    this._usersApiService.getUsers().subscribe((users: User[]) => {
      this._usersSubject$.next(users);
    }, (error) => {
      console.error('Error while getting users', error);
    });
  }

  public deleteUser(id: number): void {
    this._usersSubject$.next(this._usersSubject$.value.filter((deletedUser) => deletedUser.id != id));
  }

  public addUser(newUser: User): void {
    this._usersApiService.addUser(newUser).subscribe((addedUser: User) => {
      this._usersSubject$.subscribe(currentUsers => {
        const updatedUsers = [...currentUsers, newUser];
        this._usersSubject$.next(updatedUsers);
      });
    });
  }
}
