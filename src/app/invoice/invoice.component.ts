import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService, NotificationModel } from '../services/notification.service';
import { Invoice } from '../models/invoice.model';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  token: string
  user: User;
  invoice: Invoice;
  form: FormGroup;
  view: boolean = false;
  apiInvoice: any;

  constructor(private builder: FormBuilder,
    private auth: AuthService,
    private notifiService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.builder.group({
      Basic_charge: ['', Validators.required]
    });
    this.token = localStorage.getItem('token');
  }

  viewDiv() {
    this.onSubmit();
  }

  onSubmit() {

    if (this.form.value.Basic_charge == "") {
      this.notifiService.notify({
        title: 'Ooops!',
        description: 'Please recheck form fields for red cross!',
        type: 'danger'
      });
      return;
    }


    const invoice = {
      token: this.token,
      Basic_charge: this.form.value.Basic_charge
    }
    this.auth.createInvoice(invoice).subscribe((result: any) => {
      console.log(result.invoice);
      this.apiInvoice = result.invoice;
      this.view = true;
    })

  }

  saveInvoice() {
    this.auth.saveInvoice({ Frontinvoice: this.apiInvoice }).subscribe((result: any) => {
      console.log(result);
      if (result.success) {
        this.notifiService.notify({
          title: 'Invoice',
          description: result.msg,
          type: 'success'
        });
        this.router.navigate(['/profile']);
      }
      else {
        this.notifiService.notify({
          title: 'Invoice',
          description: result.msg,
          type: 'danger'
        });
      }
    })
  }
  clearInvoice(){
    this.form.reset();
    this.view = false;
  }

}
