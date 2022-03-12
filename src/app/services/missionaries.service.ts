import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { toFormDataMissionary } from '../app-forms/fileUpload/toFormData';
import { MissionaryModel } from '../shared/entities/missionary.model';

@Injectable({
  providedIn: 'root'
})
export class MissionariesService {

  private readonly API = `${environment.API}/missionaries`;
  constructor(private http: HttpClient) {}

  // pega todos os missionários
  public getMissionaries(): Observable<MissionaryModel[]> {
    return this.http.get<MissionaryModel[]>(`${this.API}`).pipe(take(1));
  }
  // Busca os dados do missionário pelo seu ID
  public getMissionariesPorId(id: string): Observable<MissionaryModel> {
    return this.http.get<MissionaryModel>(`${this.API}/${id}`).pipe(take(1));
  }

  // CAMPO DE BUSCA na tela principal (precisa de ajuste)
  public searchMissionaries(termo: string): Observable<MissionaryModel[]> {
    return this.http
      .get(`${this.API}/missionary?termoBusca=${termo}`)
      .pipe(retry(10))
      .pipe(map((resposta: any) =>  resposta));
  }

  // Headers para fazer o post e o put
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data; boundary=<--- ::::>"}),
  };

  // CADASTRO MISSIONÁRIOS
  public saveMissionaries(missionary: MissionaryModel): Observable<any> {

    return this.http
      .post<MissionaryModel>(
        `${this.API}`,
        toFormDataMissionary(missionary)
      )
      .pipe(retry(1), 
      catchError((err) => {
        console.log(err)
        return err
      })
      )
      .pipe(take(1));
  }

  // Atualiza um missionário
  public updateMissionariesID(
    missionary: MissionaryModel, id: String
  ): Observable<MissionaryModel> {
    console.log("🚀 ~ file: missionaries.service.ts ~ line 59 ~ MissionariesService ~ id", id)
    
    return this.http
      .put<MissionaryModel>(
        `${this.API}/${missionary._id}`,
        toFormDataMissionary(missionary)
      )
      .pipe(retry(1), 
      // catchError(error => this.handleError(error))
      )
      .pipe(take(1));
  }
  public updateStatusMissionary(
    id:string, status:string
  ): Observable<any> {
    return this.http.put(`${this.API}/status/${id}?status=${status}`, status)
      .pipe(retry(2),
      //  catchError(error => this.handleError(error))
      )
      .pipe(take(1));
  }

  // deleta um missionário
  public deleteMissionary(missionary: MissionaryModel) {
    return this.http
      .delete<MissionaryModel>(`${this.API}/${missionary._id}`, this.httpOptions)
      .pipe(retry(2), 
      // catchError(error => this.handleError(error))
      )
      .pipe(take(1));
  }

  // Manipulação de erros
  // public handleError(error: HttpErrorResponse) {
  //   let errorMessage = {};
  //   if (error.error instanceof ErrorEvent) {
  //     // Erro ocorreu no lado do client
  //     Object.assign(errorMessage, { ErroMensagem: error.error.message });
  //     console.log(errorMessage);
      

  //   } else {
  //     // Erro ocorreu no lado do servidor
  //     Object.assign(errorMessage, { StatusCode: error.status });
  //     console.log(`Código do erro: ${error.status}, ` + `mensagem: ${JSON.stringify(error.message)}`);
  //   }


  //   return throwError(errorMessage);
  // }
}
