import { Login } from './../models/login.model';
import { environment } from './../../environments/environment';
import { User } from './../models/user.model';
import { Invoice } from '../models/invoice.model';
//import {Total_Cost} from './../models/user.model'
//import { Invoice } from './../models/invoice.model'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BackendURL: String = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }
  //register client
  signupClient(client: User) {
    console.log(client);
    return this.http.post(this.BackendURL + 'clientRegister', client);
  }
  //register employee
  signupEmployee(employee: User) {
    return this.http.post(this.BackendURL + 'employeeRegister', employee);
  }

  Clientlogin(client: Login) {
    return this.http.post(this.BackendURL + 'login', client)
      .pipe(map(response => {
        this.setSession(response);
        return response;
      }));
  }

  Employeesignin(employee: Login) {
    return this.http.post(this.BackendURL + 'employee/:email', employee)
      .pipe(map(response => {
        this.setSession(response);
        return response;
      }));
  }

  /* Employee login */
  signin(login: Login) {
    return this.http.post(this.BackendURL + 'login/employee', login)
      .pipe(map(response => {
        this.setSession(response);
        return response;
      }));
  }

  saveInvoice(invoice) {
    return this.http.post(this.BackendURL + 'saveInvoice', invoice)
      .pipe(map(response => {
        this.setSession(response);
        return response;
      }));
  }

  displayInvoice(invoice: Invoice) {
    console.log(invoice);
    return this.http.post(this.BackendURL + 'displayinvoice', invoice);
  }


  createInvoice(invoice) {
    return this.http.post(this.BackendURL + 'createinvoice', invoice)
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

  setToken(Usertoken:any){
    localStorage.setItem('token',Usertoken.token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  getCost() {
    return JSON.parse(localStorage.getItem('invoice'));
  }
  getTotalCost() {
    return JSON.parse(localStorage.getItem('invoice'));
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