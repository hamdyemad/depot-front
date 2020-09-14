import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../../../services/order_service/order.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-status-of-orders',
  templateUrl: './change-status-of-orders.component.html',
  styleUrls: ['./change-status-of-orders.component.scss']
})
export class ChangeStatusOfOrdersComponent implements OnInit {

  statusForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _order: OrderService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(res => {
      console.log(res);
    })

    //fire make status form
    this.makeStatusForm();
  }

  makeStatusForm() {
    this.statusForm = this.fb.group({
      status: [],
      seqs: []
    })
  }

  onChangeStatus() {
    let formValue = this.statusForm.value;
    if (formValue.status == null || formValue.status == '' || formValue.seqs == null || formValue.seqs == '') {
      this.toastr.info('please fill the form');
    } else {
      let txt: string = formValue.seqs;
      let filterArray = txt.split('\n');
      let seqs = [];
      for (let i of filterArray) {
        seqs.push({ "seq": i })
      }
      formValue.seqs = seqs;
      this._order.updateStatus(formValue).subscribe(res => {
        this.statusForm.reset();
        console.log(res);
        if (res.nModified !== 0) {
          this.toastr.success('status changed!');
          this.onAddOrdersHistory(formValue)
        } else {
          this.toastr.info("id dosn't compare to the id of orders");
        }
      })
    }
  }

  // Add Array of history
  onAddOrdersHistory(formValue) {
    let body = {
      seqs: formValue.seqs,
      history: {
        notifiedCustomer: false,
        dateModified: new Date(),
        status: formValue.status
      }
    }
    this._order.addOrdersHistory(body).subscribe(res => {
      console.log(res);
    })
  }

}
