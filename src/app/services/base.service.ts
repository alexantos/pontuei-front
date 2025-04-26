import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable()
export class BaseService<Parametro> { //Parâmetro (por exemplo tipo Sala da models)

    constructor(@Inject('url') private url: string, private httpClient: HttpClient) { }


    listar(params?: HttpParams | any): Observable<Parametro> {
        return this.httpClient.get<Parametro>(environment.url_back + '/' + this.url, { params: params });
    }

    pegarId(id: any): Observable<Parametro> {
        return this.httpClient.get<Parametro>(environment.url_back + '/' + this.url + id + '/')
    }

    criar(parametro: Parametro): Observable<Parametro> {
        return this.httpClient.post<Parametro>(environment.url_back + '/' + this.url, parametro)
    }

    excluir(id?: string): Observable<Parametro> {
        return this.httpClient.delete<Parametro>(environment.url_back + '/' + this.url + id)
    }

    editar(parametro: any, id?: string): Observable<Parametro> {
        return this.httpClient.patch<Parametro>(environment.url_back + '/' + this.url + id + '/', parametro)
    }

    pegarPelaUrl(url: string): Observable<Parametro> {
        return this.httpClient.get<Parametro>(url);
    }
}