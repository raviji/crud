
import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {AuthService} from '../core/security/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService,
                private router: Router) {

  }

  ngOnInit() {
  }

  login() {
    this.authService.doGoogleLogin()
    .then( (res) => {
      console.log(res);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

}
