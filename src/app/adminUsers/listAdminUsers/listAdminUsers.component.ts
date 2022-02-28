import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
// import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { AdministratorModel } from 'src/app/shared/entities/administrator.model';
@Component({
  selector: 'app-listAdminUsers',
  templateUrl: './listAdminUsers.component.html',
  styleUrls: ['./listAdminUsers.component.css'],
  providers:[AdminService]
})
export class ListAdminUsersComponent implements OnInit {
  public administrators: AdministratorModel[];
  public administrators$: Observable<AdministratorModel[]>;
  public administrator: AdministratorModel;
  public administratorsObservable: Observable<AdministratorModel[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();
  public typeListUsers: String = "ADMINISTRATOR"
  public loggedinUserType: String = "ADMINISTRATOR"

  constructor(

  ) { }
  transformationImg = [{ "height": "300", "width": "400" }];
  transformationImg2 = [{ 'height': '100', 'width': '100' }];
  ngOnInit(): void {

  }


}
