import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { Playlist } from '../models/content.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  playlists: Playlist[] = [];
  private clickCount = 0;
  showEasterEggModal = false;

  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit(): void {
    this.playlists = this.contentService.getPlaylists();
  }

  navigateToPlaylist(playlistId: string): void {
    this.contentService.selectPlaylist(playlistId);
    this.router.navigate(['/playlist', playlistId]);
  }

  onPlayButtonClick(event: Event): void {
    event.stopPropagation(); // Prevent playlist navigation

    this.clickCount++;

    if (this.clickCount === 7) {
      this.clickCount = 0;
      this.showEasterEggModal = true;
    }
  }

  closeEasterEggModal(): void {
    this.showEasterEggModal = false;
  }

  visitEricChuPage(): void {
    window.open('https://www.ericchu.one/', '_blank');
    this.closeEasterEggModal();
  }
}
