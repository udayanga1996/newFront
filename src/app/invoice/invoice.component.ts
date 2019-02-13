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
  user: User;
  invoice: Invoice;
  form: FormGroup;
  view: boolean = false;

  constructor(private builder: FormBuilder,
    private auth: AuthService,
    private notifiService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.builder.group({
      User_ID: ['', Validators.required],
      Employee_name: ['', Validators.required],
      Basic_charge: ['', Validators.required],
      Cost: ['', Validators.required],
      Total_Cost: ['', Validators.required]
    });
    this.user = this.auth.getUser();
    this.form.patchValue({ User_ID: this.auth.getUser()._id });
    this.form.patchValue({ Employee_name: this.auth.getUser().fname });
    //this.form.patchValue({Cost:this.})
    //this.form.patchValue({Total_Cost:this.auth.getTotalCost().Total_Cost})
    console.log(this.user);

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

    this.view = true;


    const invoice = {
      //token: this.user,
      Basic_charge: this.form.value.Basic_charge,
      Cost:parseInt(this.form.value.Basic_charge) * 30 / 100,
      Total_Cost: parseInt(this.form.value.Basic_charge) + parseInt(this.form.value.Basic_charge) * 30 / 100,
    }

    //console.log(invoice);

    this.auth.saveInvoice(this.invoice)
      .subscribe((invoice: Invoice) => {
        console.log(invoice);
      }, err => {
        this.notifiService.notify({
          title: 'Ooops!',
          description: 'something wrong!',
          type: 'danger'
        });
      });
  }



}
