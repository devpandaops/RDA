import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toggledSideBar = false;
  constructor() { }

  ngOnInit(): void {
  }
  public openSideBar(event?: Event): void {
    event.preventDefault();
     this.toggledSideBar = !this.toggledSideBar;
  };
}
