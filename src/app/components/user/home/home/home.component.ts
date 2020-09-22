import { TranslateDetectionService } from './../../../../services/translate_service/translate-detection.service';
import { TranslateService } from '@ngx-translate/core';
import { environment as env } from './../../../../../environments/environment';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { AuthService } from './../../../../services/auth_service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../../services/cart_service/cart.service';
import { NgwWowService } from 'ngx-wow';
import { ProductsService } from '../../../../services/products_service/products.service';
import { Products } from './../../../../models/products.model';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
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
  isLoading: boolean = true;
  categorys: Array<string>;
  carousels: Array<any>;
  products: Products[];
  translate$: Subscription;
  products$: Subscription;
  category$: Subscription;
  activeCarousel = 0;
  constructor(
    private _products: ProductsService, private route: ActivatedRoute,
    private _wow: NgwWowService, private _cart: CartService, private toastr: ToastrService
    , private _auth: AuthService, public translate: TranslateService, private _translate: TranslateDetectionService) { }

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

    // Start Carousel And Indecators
    this.carousels = [
      {
        header: "home.carousel.header",
        paragraph: "home.carousel.paragraph",
        firstImgPath: "../../../../../assets/images/home/slide1.jpg",
        secImgPath: "",
        class: 'activeCarousel'
      },
      {
        header: "home.carousel.header",
        paragraph: "home.carousel.paragraph",
        firstImgPath: "../../../../../assets/images/home/slide2.png",
        secImgPath: "../../../../../assets/images/home/slide2sec.png",
        vasa: true,
        class: ''

      },
      {
        header: "home.carousel.header",
        paragraph: "home.carousel.paragraph",
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
    // End Carousel And Indecators

  }


  // Get All Categorys
  getAllCategorys() {
    this.category$ = this._products.getAllCategorys().subscribe(res => {
      if (this._translate.getStorageLang() == 'en' || this._translate.getStorageLang() == null) {
        this.categorys = res[0]._categorys;
      } else {
        this.categorys = res[0]._categorysAr;
      }
      this.translate$ = this.translate.onLangChange.subscribe((translation) => {
        if (translation.lang == 'en') {
          this.categorys = res[0]._categorys;
        } else {
          this.categorys = res[0]._categorysAr;
        }
      })
      console.log('categorys', res);
    })
  }

  // Get Products
  getAllProducts() {
    this.products$ = this._products.getAllProducts().subscribe((res: HttpResponse<any>) => {
      console.log(res.type)
      if (res.type == HttpEventType.Response) {
        this.products = res.body;
        console.log('all products', res.body)
        this.isLoading = false;
      }
    })
  }

  // Get Products by query
  getProductsByQuery(q) {
    this.products$ = this._products.getProductsByQuery(q).subscribe((res: HttpResponse<any>) => {
      if (res.type == HttpEventType.Response) {
        this.products = res.body
        console.log('query products', res.body)
        this.isLoading = false;
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
        // en
        product.name,
        product.description,
        product.category,
        // en
        // ar
        product.nameAr,
        product.descriptionAr,
        product.categoryAr,
        // ar
        product.image,
        product.price,
        product.priceAfterDiscount,
        product.discount,
        1).subscribe((res: any) => {
          if (this.translate.currentLang == 'en') {
            if (res.ok) {
              this.toastr.info("it's added before", product.name);
            } else {
              this.toastr.success('has added to cart', product.name);
            }
          } else {
            if (res.ok) {
              this.toastr.info('تم اضافته من قبل', product.nameAr);
            } else {
              this.toastr.success('تم اضافته للسلة', product.nameAr);
            }
          }
        })
    } else {
      this.toastr.error('برجاء التسجيل أولا لأتمام عملية الأضافة');
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
    this.translate$.unsubscribe();
  }

}
