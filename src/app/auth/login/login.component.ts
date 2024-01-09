import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]*$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/
          ),
        ],
      ],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .pipe(
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error Message',
              detail: 'Connection error!',
            });
            return throwError(() => error);
          })
        )
        .subscribe((response) => {
          if (response.length) {
            localStorage.setItem('user', JSON.stringify(response[0]));
            this.authService.isAuthenticated = true;

            this.router.navigate(['/']);

            setTimeout(() => {
              localStorage.removeItem('user');
              this.authService.isAuthenticated = false;
            }, 10000);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning Message',
              detail: "User doesn't exist!",
            });
          }
        });
    }
  }
}
