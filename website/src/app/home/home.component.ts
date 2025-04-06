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

  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit(): void {
    this.playlists = this.contentService.getPlaylists();
  }

  navigateToPlaylist(playlistId: string): void {
    this.contentService.selectPlaylist(playlistId);
    this.router.navigate(['/playlist', playlistId]);
  }
}
