import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from './../../../services/products_service/products.service';
import { CartService } from './../../../services/cart_service/cart.service';
import { AuthService } from './../../../services/auth_service/auth.service';
import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Carts } from '../../../models/carts.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren('cartInfoChildren') cartInfoChildren: QueryList<any>;
  @ViewChild('cartInfo') cartInfo: ElementRef;
  minWeb = matchMedia('(min-width: 991px)');
  maxMobile = matchMedia('(max-width: 991px)');

  totalPrice: number;
  carts: Carts[];
  cart$: Subscription;
  cartLength: number;
  emailMessage: string;
  passwordMessage: string;
  loginForm: FormGroup;
  registerForm: FormGroup;
  mobile = matchMedia('(max-width: 767px)').matches
  constructor(
    private fb: FormBuilder, public _auth: AuthService,
    private toastr: ToastrService,
    private _cart: CartService,
    private router: Router) { }

  $(ele) {
    return document.querySelector(ele);
  }
  ngOnInit(): void {
    this.getAllCarts$();
    this.getAllCarts();

    let header: HTMLDivElement = this.$('header');
    let body: HTMLDivElement = this.$('body');
    addEventListener('scroll', () => {
      if (scrollY > header.clientHeight) {
        header.classList.add('fixed-top');
        body.style.marginTop = `${header.clientHeight}px`;
      } else {
        header.classList.remove('fixed-top');
        body.style.marginTop = '0px';
      }
    })

    // Fire Login Form
    this.makeLoginForm();
    // Fire register Form
    this.makeRegisterForm();

    let loginAndSignUp: HTMLDivElement = (this.$('.loginAndSignUp'));
    loginAndSignUp.childNodes.forEach((ele: HTMLDivElement) => {
      ele.addEventListener('click', () => {
        this.removeClassLink(loginAndSignUp);
        ele.classList.add('activeLink');

        let forms: HTMLDivElement = this.$(`.forms`);
        this.removeClassForm(forms);

        let eleClass = ele.dataset.show;
        let form: HTMLDivElement = this.$(eleClass);
        form.classList.add('activeForm');
      })
    });
    if (this.maxMobile.matches) {
      let sideBarLinks: HTMLDivElement = this.$('.sideBarLinks');
      sideBarLinks.childNodes.forEach(ele => {
        ele.addEventListener('click', () => {
          let dropDown = (ele.lastChild as HTMLDivElement);
          dropDown.classList.toggle('activeDropDown');
        })
      })
    }
  }

  ngAfterViewInit() {
    this.cartInfoChildren.changes.subscribe(() => {
      if (this.cartInfo !== undefined) {
        let cartInfo = (this.cartInfo.nativeElement as HTMLDivElement);
        let elementsLength = this.cartInfoChildren.toArray();
        if (elementsLength.length > 4) {
          cartInfo.style.overflowY = 'scroll';
          cartInfo.style.padding = '10px';
          cartInfo.style.maxHeight = '300px';
        } else {
          cartInfo.style.overflowY = 'hidden';
          cartInfo.style.height = 'auto';
          if (this.cartLength == 0) {
            cartInfo.style.padding = '0';
          }
        }
      }
    })
  }

  getAllCarts$() {
    this._cart.getAllCartsSubject.subscribe(() => {
      this.getAllCarts();
    })
  }

  getAllCarts() {
    if (this._auth.isLoggedIn()) {
      this.cart$ = this._cart.getAllCarts().subscribe((res: Array<Object>) => {
        this.cartLength = res.length;
        this.carts = res;
        if (res.length !== 0) {
          let totalPrice = this.carts.map((cart) => {
            return cart.amount * cart.priceAfterDiscount
          }).reduce((prev, current) => prev + current)
          this.totalPrice = totalPrice;
        }
      })
    }

  }

  removeCart(id: string, name: string) {
    this._cart.removeCart(id).subscribe(() => {
      this.toastr.error('has been removed', name);
    })
  }

  makeLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  // Get Inputs of Login form
  loginEmail() {
    return this.loginForm.controls.email
  }
  loginPassword() {
    return this.loginForm.controls.password
  }

  // On Login Submit
  loginSubmit() {
    let formValue = this.loginForm.value;
    this._auth.login(formValue.email, formValue.password).subscribe(res => {
      if (res.access_token) {
        this.emailMessage = '';
        this.passwordMessage = '';
        this._auth.setToken(res.access_token, res.role);
        this.toastr.success('has logged in', formValue.email);
        if (res.role == 'admin') {
          this.router.navigate(['/admin'])
        }
        this.$('.popup').classList.remove('activePopup');
        if (!this._auth.isAdmin()) {
          this.getAllCarts();
        }
      } else {
        this.emailMessage = res.emailMessage;
        this.passwordMessage = res.passwordMessage;
      }
    })
  }

  // Logout
  logOut() {
    this._auth.logOut().then(() => {
      this.toastr.error('you are logged out');
    })
  }

  makeRegisterForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    })
  }
  // Get Inputs of Register form
  userName() {
    return this.registerForm.controls.userName
  }
  email() {
    return this.registerForm.controls.email
  }
  password() {
    return this.registerForm.controls.password
  }
  confirmPassword() {
    return this.registerForm.controls.confirmPassword
  }

  onRegister() {
    let formValue = this.registerForm.value;

    this._auth.register(formValue.userName, formValue.email, formValue.password).subscribe(res => {
      this.toastr.success('has been registerd', formValue.email);
      this.$('.popup').classList.remove('activePopup');
      this._auth.setToken(res.access_token, res.role);
      if (!this._auth.isAdmin()) {
        this.getAllCarts();
      }
    })
  }



  // Stop Propagation
  stopProp(e: Event) {
    e.stopPropagation();
  }

  // toggle signup and login popup
  togglePopup(popup: HTMLDivElement) {
    popup.classList.toggle('activePopup');
  }


  removeClassLink(loginAndSignUp) {
    loginAndSignUp.childNodes.forEach((ele: HTMLDivElement) => {
      ele.classList.remove('activeLink')
    })
  }
  removeClassForm(forms) {
    forms.childNodes.forEach((formEle: HTMLDivElement) => {
      formEle.classList.remove('activeForm');
    })
  }


  // Toggle sidebar on mobile
  toggleSideBar(sideBar: HTMLDivElement) {
    sideBar.classList.toggle('activeSidebar');
  }


  ngOnDestroy() {
    // this.cart$.unsubscribe();
  }

}
