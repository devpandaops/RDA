import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { VoluntaryModel } from '../entities/voluntary.model';
import { VolunteersService } from '../../adminUsers/volunteers/services/volunteers.service';

@Injectable({
  providedIn: 'root',
})
export class FormCadVolunteersResolverGuard implements Resolve<VoluntaryModel> {
  constructor(private voluntaryService: VolunteersService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<VoluntaryModel> {
    const idVoluntary = route.params.id;
    console.log(idVoluntary);

    if (route.params && idVoluntary) {
      return this.voluntaryService.getVolunteersPorId(idVoluntary);
    }

    return of({
      _id: null,
      typeUser: 'VOLUNTARY',
      nome: '',
      CPF: '',
      dataNascimento: '',
      sexo: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        complemento: '',
        uf: '',
        CEP: '',
      },
      profissao: '',
      telefone: '',
      telefoneFx: '',
      estadoCivil: '',
      email: '',
      password: '',
      password2: '',
      imgFilePrincipal: null,
      imgsCasaDescansoFile: null,
      imgFileCasaDescansoPrincipal: null,
      nomeIg: '',
      pastor: '',
      typeVoluntary: {
        chekbox1Profissao: false,
        chekbox2Intercessor: false,
        chekbox3Cuidador: false,
        chekbox4CasaDescanso: false,
      },
      chekbox5Aconselhamento: false,
      especialidade: '',
      urlsImage: {
        urlImgPrincipal: '',
        urlImgCasaDescansoPrincipal: '',
        urlImgsCasaDescanso: [],
      },
      servicoOferecido: '',
      dataCad: '',
      status: '',
      localDescanso: {
        typeLocalDescanso: {
          casaDePraia: false,
          casaDeCampo: false,
          pousada: false,
          hotel: false,
          outros: false,
        },
        nomeLocalDescanso: '',
        CNPJLocalDescanso: '',
        enderecoLocalDescanso: {
          ruaLocalDescanso: '',
          numeroLocalDescanso: '',
          complementoLocalDescanso: '',
          CEPLocalDescanso: '',
          bairroLocalDescanso: '',
          cidadeLocalDescanso: '',
          ufLocalDescanso: '',
        },
        estaraDisponivel: {
          duranteTodoAno: false,
          exetoFinaisDeSemana: false,
          exetoFeriadosProlongadosComemorativos: false,
          baixaTemporada: false,
          outrasDisponibilidades: false,
          outrasDisponibilidadesDescrito: '',
        },
        

        maximoDiariaPg: '',
        maximoHospedesPorVez: '',
        qtFamiliaMes: '',
        custoHospedagem: '',
        valorHospedagem: '',
        alimentacao: false,

        valorRefeicoes: '',
        qtQuartos: '',
        qtSuites: '',
        qtCamasCasal: '',
        qtCamasSolteiro: '',
        camaDescrito: '',
        servicosDisponibilizados: {
          quarto: {
            roupaCama: false,
            travesseiros: false,
            outrosQuarto: ''
          },
          cozinha: {
            geladeira: false,
            fogao: false,
            microOndas: false,
            mesaJantar:false,
            itensBasicos:false,
            utensiliosBasicos:false,
            outrosCozinha:''
          },
          banheiros:{
            roupaBanho:false,
            itensBasicosHigiene:false,
            itensBasicosBeleza:false,
            outrosBanheiro:''
          },
          salaEstar:{
            TV: false,
            internet: false,
            sofa:false,
            outrosSalaEstar:''
          },
          areaExterna:{
            garagem: false,
            piscina: false,
            churasqueira:false,
            quadra: false,
            jogos:false,
            restaurantes: false,
            outrosareaExeterna:''
          },
          outrosServicosOferecidos: false,
          outrosServicosOferecidosDescrito: '',
        },
      },
    });
    // return of({
    //   _id: null,
    //   typeUser: 'VOLUNTARY',
    //   nome: 'teste',
    //   CPF: '321555161651',
    //   dataNascimento: '',
    //   sexo: 'M',
    //   endereco: {
    //     rua: 'gdsg',
    //     numero: 'ffgsdfg',
    //     bairro: 'sdfgsdf',
    //     cidade: 'fgsfdg',
    //     complemento: 'dfgsfdg',
    //     uf: '',
    //     CEP: '321313215',
    //   },
    //   profissao: 'sdfgsd',
    //   telefone: '(21) 88633-255',
    //   telefoneFx: '',
    //   estadoCivil: '',
    //   email: 'teste@teste',
    //   password: '321321321',
    //   password2: '321321321',
    //   imgFilePrincipal: null,
    //   imgsCasaDescansoFile: null,
    //   imgFileCasaDescansoPrincipal: null,
    //   nomeIg: '',
    //   pastor: '',
    //   typeVoluntary: {
    //     chekbox1Profissao: false,
    //     chekbox2Intercessor: true,
    //     chekbox3Cuidador: false,
    //     chekbox4CasaDescanso: true,
    //   },
    //   chekbox5Aconselhamento: false,
    //   especialidade: '',
    //   urlsImage: {
    //     urlImgPrincipal: '',
    //     urlImgCasaDescansoPrincipal: '',
    //     urlImgsCasaDescanso: [],
    //   },
    //   servicoOferecido: '',
    //   dataCad: '',
    //   status: '',
    //   localDescanso: {
    //     typeLocalDescanso: {
    //       casaDePraia: true,
    //       casaDeCampo: false,
    //       pousada: false,
    //       hotel: false,
    //       outros: false,
    //     },
    //     nomeLocalDescanso: 'dfadsfa',
    //     CNPJLocalDescanso: '161651651651',
    //     enderecoLocalDescanso: {
    //       ruaLocalDescanso: 'fadsfa',
    //       numeroLocalDescanso: 'adsfasd',
    //       complementoLocalDescanso: 'adfadsf',
    //       CEPLocalDescanso: '03122010',
    //       bairroLocalDescanso: 'adfads',
    //       cidadeLocalDescanso: 'dsfafa',
    //       ufLocalDescanso: '',
    //     },
    //     estaraDisponivel: {
    //       duranteTodoAno: true,
    //       exetoFinaisDeSemana: false,
    //       exetoFeriadosProlongadosComemorativos: false,
    //       baixaTemporada: false,
    //       outrasDisponibilidades: false,
    //       outrasDisponibilidadesDescrito: '',
    //     },
        

    //     maximoDiariaPg: '1',
    //     maximoHospedesPorVez: '1',
    //     qtFamiliaMes: '1',
    //     custoHospedagem: '5',
    //     valorHospedagem: '5',
    //     alimentacao: true,

    //     valorRefeicoes: '5',
    //     qtQuartos: '5',
    //     qtSuites: '5',
    //     qtCamasCasal: '5',
    //     qtCamasSolteiro: '5',
    //     camaDescrito: '5',
    //     servicosDisponibilizados: {
    //       quarto: {
    //         roupaCama: true,
    //         travesseiros: false,
    //         outrosQuarto: 'fdasfasd'
    //       },
    //       cozinha: {
    //         geladeira: false,
    //         fogao: false,
    //         microOndas: true,
    //         mesaJantar:false,
    //         itensBasicos:false,
    //         utensiliosBasicos:false,
    //         outrosCozinha:'adfasd'
    //       },
    //       banheiros:{
    //         roupaBanho:false,
    //         itensBasicosHigiene:true,
    //         itensBasicosBeleza:false,
    //         outrosBanheiro:'fasdfasd'
    //       },
    //       salaEstar:{
    //         TV: false,
    //         internet: false,
    //         sofa:false,
    //         outrosSalaEstar:'adsfasd'
    //       },
    //       areaExterna:{
    //         garagem: false,
    //         piscina: false,
    //         churasqueira:true,
    //         quadra: false,
    //         jogos:false,
    //         restaurantes: false,
    //         outrosareaExeterna:'fasdfasd'
    //       },
    //       outrosServicosOferecidos: false,
    //       outrosServicosOferecidosDescrito: 'dfads',
    //     },
    //   },
    // });
  }
}
