import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {


  private readonly API = `${environment.API}/dashboard`;

  constructor(private http: HttpClient) {}

  public getLengthUsers(): Observable<any> {
    return this.http.get<Object>(`${this.API}`).pipe(take(1));
  }

  public getbirthdayList(): Observable<any> {
    return this.http.get<any>(`${this.API}/birthday`).pipe(take(1));
  }

  public getLastRegistrations(): Observable<any> {
    return this.http.get<number>(`${this.API}/LastRegistrations`).pipe(take(1));
  }
  
  public getLatestRegistrationUpdates(): Observable<any> {
    return this.http.get<number>(`${this.API}/LatestRegistrationUpdates`).pipe(take(1));
  }
}

// // Busca os dados do administrador pelo seu ID
// public getAdminPorId(id: string): Observable<AdministratorModel> {
//   return this.http.get<AdministratorModel>(`${this.API}/${id}`).pipe(take(1));
// }
// // CAMPO DE BUSCA na tela principal (precisa de ajuste)
// public searchAdministrators(termo: string): Observable<AdministratorModel[]> {
//   return this.http
//     .get(`${this.API}/voluntary?termoBusca=${termo}`)
//     .pipe(retry(10))
//     .pipe(map((resposta: any) => resposta));
// }
