import { ThemeService } from './../../services/color_service/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-themes',
  templateUrl: './change-themes.component.html',
  styleUrls: ['./change-themes.component.scss']
})
export class ChangeThemesComponent implements OnInit {

  constructor(private _theme: ThemeService) { }

  ngOnInit(): void {
    let activeTheme = JSON.parse(localStorage.getItem('theme'));
    if (activeTheme) this._theme.setActiveTheme(activeTheme)
  }

  setBlue() {
    this._theme.setBlueTheme();
  }
  setGreen() {
    this._theme.setGreenTheme();
  }
  setPurple() {
    this._theme.setPurpleTheme();
  }
  setOrange() {
    this._theme.setOrangeTheme();
  }

  setDark() {
    this._theme.setDarkTheme();
  }


  toggleChangeTheme(changeTheme: HTMLDivElement) {
    changeTheme.classList.toggle('activeBox')
  }

}
