import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Sala } from '../../models/sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService extends BaseService<Sala> {

  constructor(private http: HttpClient) {
    super('sala/', http);
  }

}

