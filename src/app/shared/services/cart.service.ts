import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { baseUrl } from '../constants/constant';
import { Cart } from '../../books/shared/models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpService: HttpService) {}

  getUserCart(userId: number) {
    return this.httpService.get(baseUrl + '/carts?userId' + userId);
  }

  addToCart(cart: Cart) {
    return this.httpService.post(baseUrl + '/carts', cart);
  }
}
