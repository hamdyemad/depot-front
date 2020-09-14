import { Theme, purple, orange, dark, blue, green } from '../../themes';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }
  active: Theme = blue;
  availableThemes = [blue, dark];


  getActiveTheme() {
    return this.active
  }

  setBlueTheme() {
    this.setActiveTheme(blue)
  }

  setGreenTheme() {
    this.setActiveTheme(green)
  }
  setPurpleTheme() {
    this.setActiveTheme(purple)
  }

  setOrangeTheme() {
    this.setActiveTheme(orange)
  }

  setDarkTheme() {
    this.setActiveTheme(dark)
  }

  setActiveTheme(theme: Theme) {
    this.active = theme;
    Object.keys(this.active.properites).forEach((prop) => {
      document.documentElement.style.setProperty(prop, this.active.properites[prop])
      localStorage.setItem('theme', JSON.stringify(this.active));
    })
  }


}
