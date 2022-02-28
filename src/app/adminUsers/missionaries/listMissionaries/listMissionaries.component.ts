import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listMissionaries',
  templateUrl: './listMissionaries.component.html',
  styleUrls: ['./listMissionaries.component.css']
})
export class ListMissionariesComponent implements OnInit {

  public typeListUsers: String = "MISSIONARY"
  public loggedinUserType: String = "ADMINISTRATOR"
  constructor() { }

  ngOnInit() {
  }

}
