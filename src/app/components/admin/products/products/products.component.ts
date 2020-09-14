import { ProductsService } from './../../../../services/products_service/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Orders } from '../../../../models/orders.model';
import { ProductsOfOrders } from '../../../../models/productsOfOrders';
import { Router, ActivatedRoute } from '@angular/router';
import { Products } from '../../../../models/products.model';
import { HttpResponse, HttpEventType, HttpEvent } from '@angular/common/http';
import { environment as env } from '../../../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {


  url = env.DB_URL;
  $(ele) {
    return document.querySelector(ele);
  }

  isLoading: boolean = true;
  categorys: string[]
  p = 1;
  arr = []
  maxMobile = matchMedia('max-width:(767px)');
  filterForm: FormGroup;
  products$: Subscription;
  products: Products[];
  productOrders: ProductsOfOrders[];
  constructor(
    private _products: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCategorys();
    this.route.queryParamMap.subscribe((params) => {
      if (params.keys.length !== 0) {
        this.getProductsByQuery(params)
      } else {
        this.getAllProducts();
        this._products.observer.subscribe(() => {
          this.getAllProducts();
        })

      }
    })
    // Fire Get ALl Orders
    this.makeForm();
  }

  // Make The Form For Filter
  makeForm() {
    this.filterForm = this.fb.group({
      id: [''],
      name: [''],
      category: [''],
      city: [''],
      addedDate: ['']
    })
  }

  // Go To Up On Paginate
  goUp() {
    let products: HTMLDivElement = this.$('.products');
    scrollTo({ top: products.offsetTop });
  }


  // Get All Products
  getAllProducts() {
    this.products$ = this._products.getAllProducts().subscribe((res: HttpResponse<any>) => {
      if (res.type == HttpEventType.Response) {
        this.isLoading = false;
        this.products = res.body;
      } else {
        this.isLoading = true;
      }
    })
  }

  // Get Products by query
  getProductsByQuery(params) {
    this.products$ = this._products.getProductsByQuery(params).subscribe((res: HttpResponse<any>) => {
      if (res.type == HttpEventType.Response) {
        this.isLoading = false;
        this.products = res.body;
      } else {
        this.isLoading = true;
      }
      console.log(res);
    })
  }
  // Get All Categorys
  getAllCategorys() {
    this.products$ = this._products.getAllCategorys().subscribe((res) => {
      this.categorys = res[0]._categorys
      console.log(res);
    })
  }

  // Get Total Price
  totalPrice(i: number, data: Orders) {
    this.productOrders = data[i].orders;
    return this.productOrders.map((order) => order.priceAfterDiscount * order.amount).reduce((prev, current) => prev + current);
  }

  // Filter FN
  filter() {
    let formValue = this.filterForm.value;
    Object.keys(formValue).forEach(key => {
      if (formValue[key] == '') {
        delete formValue[key]
      }
      else {
        if (formValue.addedDate !== '') {
          formValue.addedDate = new Date(formValue.addedDate).toDateString()
        }
        return key
      }
      console.log(formValue)
    })


    this.router.navigate(['/admin/products'], { queryParams: formValue });

  }

  // Toggle Drop Down of delete and edit button
  toggleDropDown(dropDown: HTMLDivElement) {
    dropDown.classList.toggle('activeDropDown');
  }

  // Delete Order By Id
  deleteProduct(productId: string) {
    this._products.deleteProductById(productId).subscribe(res => {
      console.log(res);
    })
  }


  toggleForm(form: HTMLFormElement) {
    form.classList.toggle('activeForm')
  }

  stopProp(e: Event) {
    e.stopPropagation();
  }

  showValues(ele: HTMLInputElement) {
    if (ele.checked) {
      this.arr.push(ele.value)
    } else {
      this.arr = this.arr.filter(m => m != ele.value);
    }
    console.log(this.arr);
  }

  checkAll(mainCheck: HTMLInputElement) {
    let allCheckboxs: any = document.getElementsByClassName('check');
    for (let box of allCheckboxs) {
      if (mainCheck.checked) {
        this.arr.push(box.value)
        box.checked = true;
      } else {
        this.arr = this.arr.filter(m => m != box.value);
        box.checked = false;
      }
    }
    console.log(this.arr);
  }

  ngOnDestroy() {
    this.products$.unsubscribe();
  }


}
