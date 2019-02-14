import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  type = "employee";
  ifEmployee = true;

  constructor(private builder: FormBuilder,
    private notifiService: NotificationService,
    private auth: AuthService,
    private router: Router) {


  }

  ngOnInit() {
    ;

    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/profile']);
    }
    this.form = this.builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }


  Employee() {
    this.type = "employee"
    this.ifEmployee = true;
    console.log("Em");


  }

  Client() {
    this.type = "client"
    this.ifEmployee = false;
    console.log("Cli");


  }

  onSubmit() {
    if (this.ifEmployee) {
      this.auth.signin(this.form.value)
        .subscribe((result) => {

          this.auth.setToken(result);

          this.notifiService.notify({
            title: 'Well Done!',
            description: 'You have successfully logged in!',
            type: 'success'
          });

          // console.log(result.token);
          this.router.navigate(['/profile']);
          
        }, err => {
          this.notifiService.notify({
            title: 'Ooops!',
            description: 'Your login has something wrong!',
            type: 'danger'
          });
        });

    }

    else {
      this.auth.signin(this.form.value.this.type)
        .subscribe((client: User) => {
          this.notifiService.notify({
            title: 'Well Done!',
            description: 'You have successfully logged in!',
            type: 'success'
          });

          this.router.navigate(['/newclient']);

        }, err => {
          this.notifiService.notify({
            title: 'Ooops!',
            description: 'Your login has something wrong!',
            type: 'danger'
          });
        });

    }
  }
}