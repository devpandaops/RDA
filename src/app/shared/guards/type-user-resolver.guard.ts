import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
   Resolve,
} from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';


@Injectable({
  providedIn: 'root',
})
export class TypeUserResolverGuard implements Resolve<String> {
  constructor(

    private authService: AuthService,
    ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): String {
    const payload = this.authService.getTypeUser();
    
    // const idUser = route.params.id;


    switch (payload.type) {
      case 'ADMINISTRATOR':
        return 'ADMINISTRATOR'
      break;
      case 'MISSIONARY':
        return 'MISSIONARY';
      break;
      case 'VOLUNTARY':
          return 'VOLUNTARY';
      break;

      default:
        console.log("A pagina não pode ser aberta devido a não identificação do tipo de usuário logado")
      break;
    }
    
  }
}
