import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Login } from '../../interfaces/login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  model: Login = {
    userId: 'test@nv.com',
    password: 'tested'
  };

  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public authService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/list';
    this.authService.logout();
  }

  get form(): any {
    return this.loginForm.controls;
  }

  login(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      if (this.form.userId.value === this.model.userId && this.form.password.value === this.model.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', this.form.userId.value);
        this.router.navigate([this.returnUrl]);
      } else {
        this.message = 'Invalid ID/Password';
      }
    }
  }

}
