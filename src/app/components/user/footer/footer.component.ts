import { TranslateDetectionService } from './../../../services/translate_service/translate-detection.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('footer', { static: true }) footer: ElementRef;
  constructor(public translate: TranslateService, private _translate: TranslateDetectionService) { }

  ngOnInit(): void {
    this._translate.changeStyle(this.footer);
  }

}
