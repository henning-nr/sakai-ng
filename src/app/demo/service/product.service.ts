import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) {
    }
    baseUrl = 'https://ancient-troll-v9499vw6vvj2rxq-3000.app.github.dev/';

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    // GET DA API
    getProducts() {
        return this.http.get<any>(this.baseUrl + 'products')
            .toPromise()
            .then(res => {
                return res as Product[]
            })
    }

    // POST DA API
    addProduct(product: Product) {
        return this.http.post<any>(this.baseUrl + 'products', product)
            .toPromise()
            .then(res => {
                console.log('produto adicionado', res);
                return res as Product
            })
    }

     // DELETE DA API
    deleteProduct(id: any) {
        return this.http.delete<any>(this.baseUrl + 'products'+ '/' + id)
            .toPromise()
            .then(res => {
                return res as Product[]
            })
    }

    updateProduct(product: Product) {
        return this.http.put<any>(this.baseUrl + 'products' + '/' + product.id, product)
            .toPromise()
            .then(res => {
                return res as Product
            })
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
