import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministratorModel } from '../entities/administrator.model';
import { MissionaryModel } from '../entities/missionary.model';
import { VoluntaryModel } from '../entities/voluntary.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggeInUserType: any;
  public User: any

  constructor(   private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.User = this.route.snapshot.data['user']
    this.loggeInUserType = this.route.snapshot.data['loggeInUserType']

  }



}
