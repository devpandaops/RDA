import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { MissionariesService } from 'src/app/services/missionaries.service';
import { VolunteersService } from 'src/app/services/volunteers.service';

import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';
import { alertAnimation } from 'src/app/shared/services/alert-animation';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AdministratorModel } from '../entities/administrator.model';
import { MissionaryModel } from '../entities/missionary.model';


@Component({
  selector: 'app-my-page-all-users',
  templateUrl: './myPageAllUsers.component.html',
  styleUrls: ['./myPageAllUsers.component.css', './../../app-forms/app-forms.css'],
  providers: [VolunteersService],
  animations: [alertAnimation]
})
export class MyPageAllUsersComponent implements OnInit {

  public User: VoluntaryModel | MissionaryModel | AdministratorModel;
  Voluntary: any;
  Missionary: any;
  Administrator: any;

  public idVoluntary: number;
  img: any;
  // transformationImg = [{ height: '221', width: '400' }]; 
  // transformationImgCasaDescanso = [{ height: '400', width: '500' }];
  alertState = 'hide';
  labelStatus:string;
  slides = [];
  style: any;
  loggeInUserType: string;
  constructor(
    private alertService: AlertService,
    private voluntaryService: VolunteersService,
    private missionariesService: MissionariesService,
    private route: ActivatedRoute
    ) {}
    
    ngOnInit(): void {
      this.loggeInUserType = this.route.snapshot.data['loggeInUserType']
      this.User = this.route.snapshot.data['userTypeInList'];
      

      if(this.User.typeUser === "VOLUNTARY"){
        
        this.Voluntary = this.User
        this.Voluntary as VoluntaryModel;
        this.slides = this.Voluntary.urlsImage.urlImgsCasaDescanso;
      }
      if(this.User.typeUser === "MISSIONARY"){
        this.Missionary = this.User
        this.Missionary as MissionaryModel;
      }
      if(this.User.typeUser === "ADMINISTRATOR"){
        this.Administrator = this.User
        this.Administrator as AdministratorModel;
      }

      // console.log('o que vem do guard', this.Voluntary);


   
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

  updateStatusUserCTRL(): void {
    this.User.status = this.User.status === "ATIVO" ? "INATIVO" : "ATIVO"

    if(this.Voluntary){
      this.voluntaryService
        .updateStatusVolunteer(this.User._id, this.User.status)
        .subscribe({
         next: () => {
            console.log(this.User.status)
            this.activAlert(
              'success',
              `Status Alterado com sucesso`
            );
          },
          error:(error) => {
            console.log('Console do Erro', error);
  
            this.activAlert(
              'danger',
              `Por algum motivo não foi possivel alterar o Status`
            );
  
            console.error(
              `O status do ${this.User.nome} não puderam ser alterados: => Relatório: ${error}`
            );
          },
          // falta corrigir a logica a atualização no banco não esta ocorrendo na mesma sequencia 
        });
    }
    if(this.Missionary){
      this.missionariesService
      .updateStatusMissionary(this.User._id, this.User.status)
      .subscribe({
       next: () => {
          console.log(this.User.status)
          this.activAlert(
            'success',
            `Status Alterado com sucesso`
          );
        },
        error:(error) => {
          console.log('Console do Erro', error);

          this.activAlert(
            'danger',
            `Por algum motivo não foi possivel alterar o Status`
          );

          console.error(
            `O status do ${this.User.nome} não puderam ser alterados: => Relatório: ${error}`
          );
        },
        // falta corrigir a logica a atualização no banco não esta ocorrendo na mesma sequencia 
      });
    }


 
  }

}




