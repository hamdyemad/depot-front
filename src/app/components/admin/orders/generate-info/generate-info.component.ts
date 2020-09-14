import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderService } from '../../../../services/order_service/order.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generate-info',
  templateUrl: './generate-info.component.html',
  styleUrls: ['./generate-info.component.scss']
})
export class GenerateInfoComponent implements OnInit {

  csvRows = []
  excelGeneratorForm: FormGroup;
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
    this.makeSeqForm();
  }

  makeSeqForm() {
    this.excelGeneratorForm = this.fb.group({
      seqs: []
    })
  }

  onChangeStatus() {
    let formValue = this.excelGeneratorForm.value;

    let txt: string = formValue.seqs;
    let filterArray = txt.split('\n');
    let seqs = [];
    for (let i of filterArray) {
      seqs.push({ seq: i })
    }
    formValue.seqs = seqs;

    this._order.getOrdersBySeq(formValue).subscribe((res: Array<any>) => {
      if (res.length == 0) {
        this.toastr.info('there is no orders like this id');
        formValue.seqs = '';
      } else {
        const data = res.map(row => ({
          clientName: row.clientName,
          address: row.address,
          city: row.city,
          mobile: row.mobile
        }))
        const csvData = this.objectToCsv(data);
        this.downloadCsv(csvData);
        this.csvRows = [];
        seqs = [];
        this.toastr.success('exported successfully !');
        this.excelGeneratorForm.reset();

      }
    })


  }


  objectToCsv(data) {
    // get the headers first
    const headers = Object.keys(data[0])
    this.csvRows.push(headers.join(','));

    for (let row of data) {
      console.log(row);
      let values = headers.map(header => {
        let escaped = ('' + row[header]).replace(/"/g, '\\"')
        return `"${escaped}"`
      }).join(',');
      this.csvRows.push(values);

    }
    return this.csvRows.join('\n');


  }
  downloadCsv(csvRows) {
    let blob = new Blob([csvRows], { type: 'text/xlsx' });
    let url = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'hamdy.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
