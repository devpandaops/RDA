import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministratorModel } from 'src/app/shared/entities/administrator.model';
import { MissionaryModel } from 'src/app/shared/entities/missionary.model';
import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';

@Component({
  templateUrl: './home-page-missionary.component.html',
  styleUrls: ['./home-page-missionary.component.css']
})
export class HomePageMissionaryComponent implements OnInit {

  // public dataUser:Observable<MissionaryModel>
  // public loggedinUserType: String = "MISSIONARY"
  public typeListUsers: String = "VOLUNTARY"
  public loggedinUserType: String = "MISSIONARY"
  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.dataUser = this.route.snapshot.data.missionary;
    // console.log(this.dataUser)
  }

}
