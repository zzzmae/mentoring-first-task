import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { User } from '../users.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  public user = input.required<User>();
  public onDeleteUser = output<number>();

  public removeUser(id: number): void {
    this.onDeleteUser.emit(id);
  }
}
