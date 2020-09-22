import { TranslateService } from '@ngx-translate/core';
import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateDetectionService {

  currentLang: string;
  link: HTMLLinkElement;
  constructor(private translate: TranslateService) { }

  $(ele) {
    return document.querySelector(ele);
  }

  changeStyle(elementRef: ElementRef) {
    let element = (elementRef.nativeElement as HTMLDivElement)
    if (this.getStorageLang() == 'ar') {
      element.classList.add('right')
    } else {
      element.classList.remove('right')
    }
    this.translate.onLangChange.subscribe(translation => {
      if (translation.lang == 'ar') {
        element.classList.add('right')
      } else {
        element.classList.remove('right')
      }
    });
  }

  langStorage(lang: string) {
    localStorage.setItem('lang', lang);
  }

  getStorageLang() {
    return localStorage.getItem('lang');
  }

}
