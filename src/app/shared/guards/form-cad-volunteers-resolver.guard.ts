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

@Injectable({
  providedIn: 'root',
})
export class FormCadVolunteersResolverGuard implements Resolve<VoluntaryModel> {
  constructor(private voluntaryService: VolunteersService) {
   

  }

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
      aconselhamentoBiblico: {
        seuMinistrioNaIgreja: '',
        cursoAconselhamentoBiblico: '',
        ondeCursou: '',
        anoDeConclusaoCurso: '',
        experienciaAconselhamentoBiblico: '',
      },
      voluntarioProfissao: {
        especialidade: '',
        dicasEspecialidade: '',
        servicoOferecido: {
          servicoOferecidoAtendimentos: false,
          servicoOferecidoConsultorias: false,
          servicoOferecidoPalestras: false,
          servicoOferecidoGruposDeOrientacaoWhatsapp: false,
          servicoOferecidoEscreverConteudos: false,
          servicoOferecidoOutros: false,
          servicoOferecidoOutrosDescrito: '',
        },
      },

      voluntarioIntercessor: {
        ministerioNaIgreja: '',
        habilidadesWhatsapp: '',
      },
      urlsImage: {
        urlImgPrincipal: '',
        urlImgCasaDescansoPrincipal: '',
        urlImgsCasaDescanso: [],
      },
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
            outrosQuarto: '',
          },
          cozinha: {
            geladeira: false,
            fogao: false,
            microOndas: false,
            mesaJantar: false,
            itensBasicos: false,
            utensiliosBasicos: false,
            outrosCozinha: '',
          },
          banheiros: {
            roupaBanho: false,
            itensBasicosHigiene: false,
            itensBasicosBeleza: false,
            outrosBanheiro: '',
          },
          salaEstar: {
            TV: false,
            internet: false,
            sofa: false,
            outrosSalaEstar: '',
          },
          areaExterna: {
            garagem: false,
            piscina: false,
            churasqueira: false,
            quadra: false,
            jogos: false,
            restaurantes: false,
            outrosareaExeterna: '',
          },
          outrosServicosOferecidos: false,
          outrosServicosOferecidosDescrito: '',
        },
      },
    });
  }
}
