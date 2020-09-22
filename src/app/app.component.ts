import { TranslateDetectionService } from './services/translate_service/translate-detection.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentLang: string;
  @ViewChild('main', { static: true }) main: ElementRef;

  constructor(
    private translate: TranslateService, private _translate: TranslateDetectionService, private title: Title) { }

  ngOnInit() {
    this.currentLang = this.translate.defaultLang;
    let getLang = this._translate.getStorageLang();
    let main = (this.main.nativeElement as HTMLDivElement);
    if (getLang == 'en' || getLang == null) {
      this.title.setTitle('depot')
    } else {
      this.title.setTitle('مستودع')
    }
    if (getLang) {
      this.currentLang = getLang;
      this.translate.use(getLang);
    }
    this.translate.onLangChange.subscribe(translate => {
      document.querySelector('html').setAttribute('lang', translate.lang);
      this.translate.use(translate.lang);
      this._translate.langStorage(translate.lang);
      if (translate.lang == 'ar') {
        main.classList.add('rtl');
        this.title.setTitle('مستودع')
      } else {
        main.classList.remove('rtl');
        this.title.setTitle('depot')
      }
    })
  }
}
