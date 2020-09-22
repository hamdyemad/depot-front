import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductsService } from './../../../../services/products_service/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @ViewChild('file') file: ElementRef;
  @ViewChild('img', { static: true }) img: ElementRef;
  imageEle: HTMLImageElement;
  addForm: FormGroup;
  fileList: FileList;
  constructor(
    private fb: FormBuilder,
    private _products: ProductsService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // Fire Making Form
    this.makeForm();
  }


  // Make Form
  makeForm() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      nameAr: ['', Validators.required],
      descriptionAr: ['', Validators.required],
      categoryAr: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      discount: [0, [Validators.max(100)]]
    })
  }

  // return all inputs
  name() {
    return this.addForm.controls.name
  }
  description() {
    return this.addForm.controls.description
  }
  category() {
    return this.addForm.controls.category
  }
  // Arabic
  nameAr() {
    return this.addForm.controls.nameAr
  }
  descriptionAr() {
    return this.addForm.controls.descriptionAr
  }
  categoryAr() {
    return this.addForm.controls.categoryAr
  }
  // Arabic
  price() {
    return this.addForm.controls.price
  }
  image() {
    return this.addForm.controls.image
  }
  discount() {
    return this.addForm.controls.discount
  }

  change(button: HTMLButtonElement, file: HTMLInputElement, img: HTMLImageElement) {
    if (file.files.length !== 0) {
      button.textContent = `${file.files[0].name}`;
      img.removeAttribute('hidden');
      this.imageEle = (this.img.nativeElement);
      this.imageEle.src = URL.createObjectURL(file.files[0]);
      this.imageEle.style.display = 'flex';
    }
  }


  onSubmit() {
    let formValue = this.addForm.value;
    this.fileList = this.file.nativeElement.files;
    this._products.addNewProduct(this.fileList[0], formValue).subscribe(res => {
      console.log(res);
      this.toastr.success('has been added', formValue.name);
      this.router.navigate(['/admin/products']);
    })
  }

}
