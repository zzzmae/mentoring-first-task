import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatCardActions
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditUserComponent implements OnInit {
  public data: any = inject(MAT_DIALOG_DATA);
  private readonly _dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  private readonly fb = inject(FormBuilder);
  public userForm!: FormGroup;
  public isEdit!: boolean;

  constructor() {
    this.isEdit = !!this.data;
    this.userForm = this.fb.group({
      id: [this.data.id || null],
      name: [this.data.name || '', Validators.required],
      username: [this.data.username || '', Validators.required],
      email: [this.data.email || '', [Validators.required, Validators.email]],
      phone: [this.data.phone || '', [Validators.required, Validators.pattern(/^(\+7|7|8)?\d{10}$/)]]
    });
  }

  ngOnInit() {
    this.userForm.patchValue({...this.data});
  }

  public saveUser(): void {
    if (this.userForm.valid) {
      this._dialogRef.close(this.userForm.value);
    }
  }

  public closeDialog(): void {
    this._dialogRef.close();
  }
}
