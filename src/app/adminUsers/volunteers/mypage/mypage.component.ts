import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';
import { alertAnimation } from 'src/app/shared/services/alert-animation';
import { AlertService } from 'src/app/shared/services/alert.service';
import { HomePageVoluntaryComponent } from 'src/app/volunteers/home-page-voluntary/home-page-voluntary.component';
import { VolunteersService } from '../services/volunteers.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css', './../../../app-forms/app-forms.css'],
  providers: [VolunteersService],
  animations: [alertAnimation]
})
export class MypageComponent implements OnInit {
  public Voluntary: VoluntaryModel;
  public idVoluntary: number;
  img: any;
  // transformationImg = [{ height: '221', width: '400' }]; 
  // transformationImgCasaDescanso = [{ height: '400', width: '500' }];
  alertState = 'hide';
  labelStatus:string;
  slides = [];
  style: any;
  constructor(
    private alertService: AlertService,
    private voluntaryService: VolunteersService,
    private route: ActivatedRoute
    ) {}
    
    ngOnInit(): void {
      this.Voluntary = this.route.snapshot.data['voluntary'];
      // console.log('o que vem do guard', this.Voluntary);
      this.slides = this.Voluntary.urlsImage.urlImgsCasaDescanso;
   
    }
    
  // FUNÇÕES DE CONTROLES DE ALERTS
  public typeStyle(): {} {
    const alertStyle = this.alertService.style('');
    return {
      success: alertStyle === 'success',
      warning: alertStyle === 'warning',
      information: alertStyle === 'information',
      danger: alertStyle === 'danger',
    };
  }
  public toggle(view?: string): void {
    this.alertState = this.alertService.toggle(view);
  }

  public activAlert(typeAlert: string, mensagem: string): void {
    (this.alertState = this.alertService.toggle('show')),
      this.alertService.content(mensagem),
      (this.style = this.alertService.style(typeAlert));

    setTimeout(() => {
      // fecha o alert após 15 segundos
      this.toggle('hide');
    }, 15000);
  }

  updateStatusVoluntaryCTRL(): void {
    this.Voluntary.status = this.Voluntary.status === "ATIVO" ? "INATIVO" : "ATIVO"
    this.voluntaryService
      .updateStatusVolunteer(this.Voluntary._id, this.Voluntary.status)
      .subscribe(
        () => {
          console.log(this.Voluntary.status)
          this.activAlert(
            'success',
            `Status Alterado com sucesso`
          );
        },
        (error) => {
          console.log('Console do Erro', error);

          this.activAlert(
            'danger',
            `Por algum motivo não foi possivel alterar o Status`
          );

          console.error(
            `O status do ${this.Voluntary.nome} não puderam ser alterados: => Relatório: ${error}`
          );
        },
        // falta corrigir a logica a atualização no banco não esta ocorrendo na mesma sequencia 
      );

 
  }
}
