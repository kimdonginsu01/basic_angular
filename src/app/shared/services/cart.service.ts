import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { baseUrl } from '../constants/constant';
import { Cart } from '../../books/shared/models/cart';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new Subject();
  public cart$ = this.cartSubject.asObservable();

  constructor(private httpService: HttpService) {}

  createCartProduct(data: any) {
    return this.httpService.post(baseUrl + '/product-carts', data);
  }

  updateCartProduct(id: number | string, data: any) {
    return this.httpService.patch(baseUrl + '/product-carts/' + id, data);
  }

  getUserCart(userId: number) {
    return this.httpService.get(
      baseUrl + '/product-carts?_expand=books&usersId=' + userId
    );
  }

  deleteCartProduct(id: number | string) {
    return this.httpService.delete(baseUrl + '/product-carts/' + id);
  }

  updateCart(value: any) {
    this.cartSubject.next(value);
  }

  // addToCart(cart: Cart) {
  //   return this.httpService.post(baseUrl + '/carts', cart);
  // }
}
