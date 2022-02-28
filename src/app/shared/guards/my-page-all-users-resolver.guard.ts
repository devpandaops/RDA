import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { VoluntaryModel } from '../entities/voluntary.model';
import { VolunteersService } from '../../services/volunteers.service';
import { MissionaryModel } from '../entities/missionary.model';
import { AdministratorModel } from '../entities/administrator.model';
import { AdminService } from 'src/app/services/admin.service';
import { MissionariesService } from 'src/app/services/missionaries.service';

@Injectable({
  providedIn: 'root',
})
export class MyPageAllUsersResolverGuard
  implements Resolve<VoluntaryModel | MissionaryModel | AdministratorModel>
{
  constructor(
    private voluntaryService: VolunteersService,
    private missionariesService: MissionariesService,
    private adminService: AdminService
  ) {}
  private Voluntary: any;
  private Missionary: any;
  private Administrator: any;

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<VoluntaryModel | MissionaryModel | AdministratorModel> {
    const idUser = route.params.id;
    const userTypeInList = route.params.userTypeInList;
    // console.log(idUser);
    // console.log(userTypeInList)
    if (route.params && idUser) {
      if (userTypeInList === 'VOLUNTARY') {
        return this.voluntaryService.getVolunteersPorId(idUser);
      }
      if (userTypeInList === 'MISSIONARY') {
        return this.missionariesService.getMissionariesPorId(idUser);
      }
      if (userTypeInList === 'ADMINISTRATOR') {
        return this.adminService.getAdminPorId(idUser);
      }
    }
  }
}
