import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Jogador } from '../../models/interface.models';

@Injectable({
  providedIn: 'root'
})
export class JogadorService extends BaseService<Jogador> {

  constructor(private http: HttpClient) {
    super('jogadores/', http);
  }

}

