import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newclient',
  templateUrl: './newclient.component.html',
  styleUrls: ['./newclient.component.css']
})
export class NewclientComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }



  onSearch() {

    this.router.navigate(['/worklist']);


}
}

