import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { MissionariesService } from 'src/app/services/missionaries.service';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';
import { AdministratorModel } from '../entities/administrator.model';
import { MissionaryModel } from '../entities/missionary.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [VolunteersService,]
})
export class ListUsersComponent implements OnInit {

  

  @Input() typeListUsers:String;     // se refere a que tipo de usuário será mostrado na lista
  @Input() loggedinUserType:String  // se refere a qual tipo de usuário está visualizando a lista


  
  public volunteers: VoluntaryModel[];
  public volunteers$: Observable<VoluntaryModel[]> ;
  public missionaries: MissionaryModel[];
  public missionaries$: Observable<MissionaryModel[]> ;
  public administrators: AdministratorModel[];
  public administrators$: Observable<AdministratorModel[]> ;



  


  public volunteersObservable: Observable<VoluntaryModel[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();
  constructor( 
    private voluntaryService: VolunteersService,
    private adminService: AdminService,
    private missionariesService: MissionariesService,
    private route: ActivatedRoute
    
    ) { }

    transformationImg = [{ 'height': '300', 'width': '400' }];
    transformationImg2 = [{ 'height': '100', 'width': '100' }];

    ngOnInit(): void {
      this.queryByUserType()

      this.volunteersObservable = this.subjectPesquisa
        .pipe(debounceTime(1000))
        .pipe(distinctUntilChanged())
        .pipe(
          switchMap((termo: string) => {
            this.volunteers$ = this.voluntaryService.searchVolunteer(termo);
            return this.voluntaryService.searchVolunteer(termo);
          })
        );

        // não ha necessidade de dar so subscribe por estar sendo feito no HTML pelo pipe ASYNC
      // this.volunteersObservable.subscribe(
      //   (volunteers: VoluntaryModel[]) => {
      //     // console.log(volunteers);
      //     // this.volunteers = volunteers;
      //   },
      //   (error: any) => console.log(error),
      //   () => console.log('Evento concluido')
      // );

    }

    public async queryByUserType(){
      switch (this.typeListUsers) {
        case 'ADMINISTRATOR':
          this.administrators$ = this.adminService.getAdministrators();
        break;
          case 'VOLUNTARY':
          this.volunteers$ = this.voluntaryService.getVolunteers();
        break;
        case 'MISSIONARY':
          this.missionaries$ = this.missionariesService.getMissionaries();
        break;
  
        default:
          console.log("A pagina não pode ser aberta devido a não identificação do tipo de usuário logado")
        break;
      }
      
    }

    public pesquisa(termoDaPesquisa: string): void {
      this.subjectPesquisa.next(termoDaPesquisa);
    }

    /*
    usando este componente 

    o paramêtro typeListUsers deve conter uma string passando o tipo de usuário que conterá a lista
    podendo ser 
    "administrators"
    "volunteers"
    "missionaries"

    <app-list-users [typeListUsers]="typeListUsers" [loggedinUserType]="loggedinUserType" ></app-list-users>

    */
}



