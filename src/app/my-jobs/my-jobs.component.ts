import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {
  client: User;
  filters: string[];

  constructor() { }

  ngOnInit() {
    this.filters = [
      'All', 'Top rated', 'Highest Price', 'Most commented'
    ];
  }

}
