import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.scss']
})
export class EditUserDataComponent implements OnInit {

  dataForm: FormGroup;
  user: User;
  submitted = false;
  phoneNumberRegex = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$';

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditUserDataComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    if (this.data) {
      this.user = this.data.user;
    }
    this.dataForm = this.formBuilder.group({
      firstName: [this.user ? this.user.firstName : '', Validators.required],
      lastName: [this.user ? this.user.lastName : '', Validators.required],
      phoneNumber: [this.user ? this.user.phoneNumber : '', [Validators.required, Validators.pattern(this.phoneNumberRegex)]],
      birthDate: [this.user ? this.convertStringToDate(this.user.birthDate) : '', Validators.required],
    });
  }

  get form(): any {
    return this.dataForm.controls;
  }

  convertStringToDate(dateString: string): Date {
    const date = dateString.split('/');
    return new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));
  }

  updateDetails(): void {
    this.submitted = true;
    if (!this.dataForm.invalid) {
      this.dialogRef.close({
        firstName: this.form.firstName.value,
        lastName: this.form.lastName.value,
        birthDate: this.form.birthDate.value,
        phoneNumber: this.form.phoneNumber.value
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
