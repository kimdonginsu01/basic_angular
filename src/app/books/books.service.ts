import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { baseUrl } from '../shared/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpService: HttpService) { }

  getBooks(params?: any) {
    return this.httpService.get(baseUrl + `/books`, params);
  }
}
