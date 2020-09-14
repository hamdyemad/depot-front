import { environment as env } from './../../../../../environments/environment';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { AuthService } from './../../../../services/auth_service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../../services/cart_service/cart.service';
import { NgwWowService } from 'ngx-wow';
import { ProductsService } from '../../../../services/products_service/products.service';
import { Products } from './../../../../models/products.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  url = env.DB_URL;
  p = 1;
  categorys: Array<string>;
  carousels: Array<any>;
  products: Products[];
  products$: Subscription;
  category$: Subscription;
  activeCarousel = 0;
  constructor(
    private _products: ProductsService, private route: ActivatedRoute,
    private _wow: NgwWowService, private _cart: CartService, private toastr: ToastrService
    , private _auth: AuthService) { }

  $(ele) {
    return document.querySelector(ele);
  }
  ngOnInit(): void {
    this._wow.init();
    // Fire Get All Categorys
    this.getAllCategorys();

    this.route.queryParamMap.subscribe(param => {
      if (param.keys.length !== 0) {
        this.getProductsByQuery(param)
      } else {
        this.getAllProducts();
      }
    })

    this.carousels = [
      {
        header: "contemporary design.",
        paragraph: "a large set of beautiful fully flexible homepage layouts lets you create your website quickly and easily",
        firstImgPath: "../../../../../assets/images/home/slide1.jpg",
        secImgPath: "",
        class: 'activeCarousel'
      },
      {
        header: "contemporary design.",
        paragraph: "a large set of beautiful fully flexible homepage layouts lets you create your website quickly and easily",
        firstImgPath: "../../../../../assets/images/home/slide2.png",
        secImgPath: "../../../../../assets/images/home/slide2sec.png",
        vasa: true,
        class: ''

      },
      {
        header: "contemporary design.",
        paragraph: "a large set of beautiful fully flexible homepage layouts lets you create your website quickly and easily",
        firstImgPath: "../../../../../assets/images/home/slide3.png",
        secImgPath: "",
        class: ''
      }
    ]

    let indecators: HTMLDivElement = this.$('.indecators');
    indecators.childNodes.forEach((indecator: HTMLDivElement) => {
      indecator.addEventListener('click', () => {
        this.removeAllIndecators(indecators);
        indecator.classList.add('activeIndecator');

        let indIndex = +indecator.dataset.index;
        for (let carousel of this.carousels) {
          carousel.class = '';
        }
        this.carousels[indIndex].class = 'activeCarousel';
      })
    })
  }

  // Get All Categorys
  getAllCategorys() {
    this.category$ = this._products.getAllCategorys().subscribe(res => {
      this.categorys = res[0]._categorys;
      console.log('categorys', res);
    })
  }

  // Get Products
  getAllProducts() {
    this.products$ = this._products.getAllProducts().subscribe((res: HttpResponse<any>) => {
      if (res.type == HttpEventType.Response) {
        this.products = res.body;
        console.log('all products', res.body)
      }
    })
  }

  // Get Products by query
  getProductsByQuery(q) {
    this.products$ = this._products.getProductsByQuery(q).subscribe((res: HttpResponse<any>) => {
      if (res.type == HttpEventType.Response) {
        this.products = res.body
        console.log('query products', res.body)
      }
    })
  }

  // Go To Up On Paginate
  goUp() {
    let mainProducts: HTMLDivElement = this.$('.main-products');
    scrollTo({ top: mainProducts.offsetTop - 60 });
  }


  // Add to cart
  addToCart(product: Products) {
    if (this._auth.isLoggedIn()) {
      this._cart.addToCart(
        product._id,
        product.name,
        product.description,
        product.category,
        product.image,
        product.price,
        product.priceAfterDiscount,
        product.discount,
        1).subscribe((res: any) => {
          if (res.ok) {
            this.toastr.info('has been updated', product.name);
          } else {
            this.toastr.success('has added to cart', product.name);
          }
        })
    } else {
      this.toastr.error('please login first to add cart');
    }
  }

  removeAllIndecators(indecators: HTMLDivElement) {
    indecators.childNodes.forEach((indecator: HTMLDivElement) => {
      indecator.classList.remove('activeIndecator')
    })
  }
  ngOnDestroy() {
    this.products$.unsubscribe();
    this.category$.unsubscribe();
  }

}
