import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core'
import { Button } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage,Button],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  isDark = signal(false)

  toggledarkmode(){
    this.isDark.update(value => !value)
    document.documentElement.classList.toggle('app-dark', this.isDark() )
  }


}
