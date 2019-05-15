import { AuthService } from './../auth/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Login component: Main component of the login page
 * @author Boenec Yann
 * @date 21/02/2019
 */
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  /**
   * Login component constructor
   * @param router: Router argument
   */
  constructor(private router: Router, private authService: AuthService) { }

  /**
   * On init standard function
   */
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  /**
   * Action to be performed when submit button is pressed.
   */
  onFormSubmit(): void {
    this.authService.login(this.formLogin.get('username').value, this.formLogin.get('password').value).subscribe((response) => {
      this.authService.setTokens(response);
      this.router.navigate(['/home']);
    });
  }
}
