import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';
import {VolunteersService} from '../../../services/volunteers.service';


@Component({
  selector: 'app-ListVolunteers',
  templateUrl: './listVolunteers.component.html',
  styleUrls: ['./listVolunteers.component.css'],
  providers: [VolunteersService]
})
export class ListVolunteersComponent implements OnInit {


  public typeListUsers: String = "VOLUNTARY"
  public loggedinUserType: String = "ADMINISTRATOR"

  public volunteers: VoluntaryModel[];
  public volunteers$: Observable<VoluntaryModel[]> ;
  public voluntary: VoluntaryModel;
  public volunteersObservable: Observable<VoluntaryModel[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();
  constructor( private VoluntaryService: VolunteersService,
               private route: ActivatedRoute) { }

    transformationImg = [{ 'height': '300', 'width': '400' }];
    transformationImg2 = [{ 'height': '100', 'width': '100' }];

    ngOnInit(): void {
      this.volunteers$ = this.VoluntaryService.getVolunteers();

      this.volunteersObservable = this.subjectPesquisa
        .pipe(debounceTime(1000))
        .pipe(distinctUntilChanged())
        .pipe(
          switchMap((termo: string) => {
            this.volunteers$ = this.VoluntaryService.searchVolunteer(termo);
            return this.VoluntaryService.searchVolunteer(termo);
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

    public pesquisa(termoDaPesquisa: string): void {
      this.subjectPesquisa.next(termoDaPesquisa);
    }

}
