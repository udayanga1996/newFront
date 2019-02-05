import { Login } from './../models/login.model';
import { environment } from './../../environments/environment';
import { User } from './../models/user.model';
import { Invoice } from './../models/invoice.model'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BackendURL: String = "http://138.68.177.4:3000/api/";

  constructor(private http: HttpClient) { }

  signupClient(client: User) {
    console.log(client);
    return this.http.post(this.BackendURL + 'clientRegister', client);
  }
  signupEmployee(employee: User) {
    return this.http.post(this.BackendURL + 'employeeRegister', employee);
  }
  
  createinvoice(invoice: Invoice) {
    console.log(invoice);
    return this.http.post(this.BackendURL + 'createinvoice', invoice);
  }

  login(client: Login) {
    return this.http.post(this.BackendURL + 'client/:email', client)
      .pipe(map(response => {
        this.setSession(response);
        return response;
      }));
  }

  Employeesignin(employee: Login) {
    return this.http.post(this.BackendURL + 'login', employee)
      .pipe(map(response => {
        this.setSession(response);
        return response;
      }));
  }

  isAuthenticated() {
    const token = localStorage.getItem('user');
    if (token !== null) {
      return true;
    }
    return false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  signout() {
    this.removeSession();
  }

  private setSession(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  private removeSession() {
    localStorage.removeItem('user');
  }
}

/*signup(user: User) {
  return this.http.post(environment.baseUrl + 'register', user);
}*/