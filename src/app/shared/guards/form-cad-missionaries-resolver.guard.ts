import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { MissionariesModule } from 'src/app/missionaries/missionaries.module';
import { MissionariesService } from 'src/app/services/missionaries.service';

@Injectable({
  providedIn: 'root',
})
export class FormCadMissionariesResolverGuard
implements Resolve<MissionariesModule>
{
  constructor(private userSevice: MissionariesService) {


  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MissionariesModule> {
    const idMissionary = route.params.id;
 

    if (route.params && idMissionary) {
      return this.userSevice.getMissionariesPorId(idMissionary);
    }

    return of({
      _id: null,
      typeUser: 'MISSIONARY',
      nome: '',
      cpf: '',
      dataNascimento: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        complemento: '',
        uf: '',
        CEP: '',
      },
      telefone: '',
      igreja: '',
      pastor: '',
      email: '',
      regiao: '',
      projeto: '',
      vinculo: '',
      password: '',
      dataCad: '',
      status: '',
      sexo: '',
      imgFilePrincipal: null,
      urlsImage: {
        urlImgPrincipal: '',
      },
    });
  }
}
