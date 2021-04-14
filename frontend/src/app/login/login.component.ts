import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormsModule;

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    const userInfo = {
      username: this.userName.value,
      password: this.password.value,
    };
    console.log(userInfo);
    this._authService.loginUser(userInfo).subscribe(
      (res) => {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/home']);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
