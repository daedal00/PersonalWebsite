import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
      this.enableDarkMode();
    }
  }

  toggleDarkMode(): void {
    if (this.isDarkMode) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  private enableDarkMode(): void {
    this.isDarkMode = true;
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  }

  private disableDarkMode(): void {
    this.isDarkMode = false;
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
}
