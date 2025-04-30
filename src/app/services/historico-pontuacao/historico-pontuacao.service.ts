import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HistoricoPontuacao } from '../../models/interface.models';

@Injectable({
  providedIn: 'root'
})
export class HistoricoPontuacaoService extends BaseService<HistoricoPontuacao> {

  constructor(private http: HttpClient) {
    super('historico-pontuacao/', http);
  }

}

