import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { baseUrl } from '../shared/constants/constant';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private httpService: HttpService) {}

  getBooks(params?: any) {
    return this.httpService.get(baseUrl + `/books?_sort=id&_order=desc`, params);
  }

  getBookDetail(id: string) {
    return this.httpService.get(baseUrl + `/books/` + id);
  }

  createBook(body: any) {
    return this.httpService.post(baseUrl + `/books`, body);
  }

  updateBook(id: string | undefined, body: any) {
    return this.httpService.patch(baseUrl + `/books/` + id, body);
  }

  deleteBook(id: number) {
    return this.httpService.delete(baseUrl + `/books/` + id);
  }
}
