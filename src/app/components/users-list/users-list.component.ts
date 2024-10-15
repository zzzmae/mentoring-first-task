import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    UserCardComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  private readonly _usersService = inject(UsersService);
  public users$ = this._usersService.users$;
  private readonly dialog = inject(MatDialog);

  public ngOnInit(): void {
    this._usersService.loadUsers();
  }

  public deleteUser(id: number): void {
    this._usersService.deleteUser(id);
  }

  public openAddEditDialog(isEdit: boolean): void {
    const dialogRef = this.dialog.open(UserCardComponent, {
      width: '40%',
      data: {
        isEdit: true,
      }
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      if(result) {

      }
    })
  }
}
