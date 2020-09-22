import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../../../services/products_service/products.service';
import { Route } from '@angular/compiler/src/core';
import { Products } from '../../../../models/products.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit, OnDestroy {



  product: Products;
  product$: Subscription;
  @ViewChild('file', { static: true }) file: ElementRef;
  @ViewChild('img', { static: true }) img: ElementRef;
  imageEle: HTMLImageElement;
  categorys: Array<string>;
  categorysAr: Array<string>;
  editForm: FormGroup;
  fileList: FileList;
  constructor(
    private fb: FormBuilder,
    private _products: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length !== 0) {
        let id = params.get('id');
        this.product$ = this._products.getProductById(id).subscribe((res: HttpResponse<any>) => {
          if (res.type == HttpEventType.Response) {
            console.log(res);
            this.product = res.body;
            // Get All Categorys
            this.getAllCategorys(res.body.category, res.body.categoryAr);
            this.imageEle = (this.img.nativeElement);
            this.imageEle.src = `http://localhost:3000/${this.product.image}`;
            // Update Form
            this.updateForm(
              res.body.name,
              res.body.description,
              res.body.category,
              res.body.nameAr,
              res.body.descriptionAr,
              res.body.categoryAr,
              res.body.price,
              res.body.discount);
          }
        })
      }
    })
    // Fire Making Form
    this.makeForm();
  }


  // Make Form
  makeForm() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      nameAr: ['', Validators.required],
      descriptionAr: ['', Validators.required],
      categoryAr: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', [Validators.max(100)]]
    })
  }

  // Update Form
  updateForm(name, description, category, nameAr, descriptionAr, categoryAr, price, discount) {
    this.editForm.patchValue({
      name, description, category, nameAr, descriptionAr, categoryAr, price, discount
    })
  }

  // Get All Categors

  getAllCategorys(activeCategory: string, activeCategoryAr: string) {
    console.log(activeCategory, activeCategoryAr)
    this._products.getAllCategorys().subscribe(res => {
      this.categorys = res[0]._categorys.filter(filter => filter !== activeCategory);
      this.categorysAr = res[0]._categorysAr.filter(filter => filter !== activeCategoryAr);
    })
  }

  // return all inputs
  name() {
    return this.editForm.controls.name
  }
  description() {
    return this.editForm.controls.description
  }
  category() {
    return this.editForm.controls.category
  }
  nameAr() {
    return this.editForm.controls.nameAr
  }
  descriptionAr() {
    return this.editForm.controls.descriptionAr
  }
  categoryAr() {
    return this.editForm.controls.categoryAr
  }
  price() {
    return this.editForm.controls.price
  }
  image() {
    return this.editForm.controls.image
  }
  discount() {
    return this.editForm.controls.discount
  }


  change(button: HTMLButtonElement, file: HTMLInputElement, img: HTMLImageElement) {
    if (file.files.length !== 0) {
      button.textContent = `${file.files[0].name}`;
      this.imageEle.src = URL.createObjectURL(file.files[0]);
      this.imageEle.style.display = 'flex';
    }
  }

  onSubmit() {
    let formValue = this.editForm.value;
    console.log(formValue);
    this.fileList = this.file.nativeElement.files;
    let file;
    if (this.fileList.length !== 0) {
      file = this.fileList[0]
    }
    this._products.updateProduct(this.product._id, formValue, file).subscribe(res => {
      this.toastr.info('your product has been updated');
      this.router.navigate(['/admin/products'])
    })
  }

  ngOnDestroy() {
    this.product$.unsubscribe();
  }

}
