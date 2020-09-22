import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { Subject } from 'rxjs';

const DB_URL = env.DB_URL;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  private subject = new Subject();

  get observer() {
    return this.subject;
  }

  getAllCategorys() {
    return this.http.get<any>(`${DB_URL}/products/categorys`)
  }

  getAllProducts() {
    return this.http.get<any>(`${DB_URL}/products`, { observe: 'events' })
  }

  updateProduct(id: string, body: any, imageFile: File) {
    let fd = new FormData();
    fd.append('name', body.name)
    fd.append('description', body.description)
    fd.append('category', body.category)
    fd.append('nameAr', body.nameAr)
    fd.append('descriptionAr', body.descriptionAr)
    fd.append('categoryAr', body.categoryAr)
    fd.append('price', body.price)
    fd.append('discount', body.discount)
    if (imageFile !== undefined) {
      fd.append('image', imageFile)
    }
    return this.http.patch(`${DB_URL}/products/${id}`, fd)
  }

  getProductsByQuery(q) {
    let params = q.params;
    let x: string = '';
    let query: string = '';
    Object.keys(params).forEach((param) => {
      x += `${param}=${params[param]}&`
      query = x.slice(0, x.length - 1)
    })
    console.log(query);
    return this.http.get<any>(`${DB_URL}/products?${query}`, { observe: 'events' })
  }


  getProductById(productId: string) {
    return this.http.get(`${DB_URL}/products/${productId}`, { observe: 'events' });
  }


  getAllProductsByCategory(category) {
    return this.http.get<any>(`${DB_URL}/products?category=${category}`)
  }

  getAllProductsByMinAndMax(min, max) {
    return this.http.get<any>(`${DB_URL}/products?min=${min}&max=${max}`)
  }

  deleteProductById(productId: string) {
    return this.http.delete<any>(`${DB_URL}/products/${productId}`).pipe(tap(() => this.observer.next()))
  }

  addNewProduct(file: File, body) {
    let fd = new FormData();
    // English
    fd.append('name', body.name);
    fd.append('description', body.description);
    fd.append('category', body.category);
    // English
    // Arabic
    fd.append('nameAr', body.nameAr);
    fd.append('descriptionAr', body.descriptionAr);
    fd.append('categoryAr', body.categoryAr);
    // Arabic
    fd.append('image', file, file.name);
    fd.append('price', body.price);
    fd.append('discount', body.discount);
    return this.http.post<any>(`${DB_URL}/products`, fd);
  }

}
