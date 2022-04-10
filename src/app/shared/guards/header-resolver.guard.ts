import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
   Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { MissionariesService } from 'src/app/services/missionaries.service';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { AdministratorModel } from '../entities/administrator.model';
import { MissionaryModel } from '../entities/missionary.model';
import { VoluntaryModel } from '../entities/voluntary.model';


@Injectable({
  providedIn: 'root',
})
export class HeaderResolverGuard implements Resolve<VoluntaryModel | AdministratorModel | MissionaryModel> {
  constructor(

    private authService: AuthService,
    private adminService: AdminService,
    private missionariesService: MissionariesService,
    private voluntaryService: VolunteersService
    ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable< VoluntaryModel | AdministratorModel | MissionaryModel> {

    const payload = this.authService.getTypeUser();
    const idUser = payload.sub;
    if (route.params && idUser) {
      switch (payload.type) {
        case 'ADMINISTRATOR':
          return this.adminService.getAdminPorId(idUser)
        break;
        case 'MISSIONARY':
          return this.missionariesService.getMissionariesPorId(idUser)
        break;
        case 'VOLUNTARY':
          return this.voluntaryService.getVolunteersPorId(idUser)
        break;
  
        default:
          console.log("A pagina não pode ser aberta devido a não identificação do tipo de usuário logado")
        break;
      }

    }

    
    
  }
}
