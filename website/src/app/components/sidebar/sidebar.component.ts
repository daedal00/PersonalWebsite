import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { PlaylistType, Playlist } from '../../models/content.model';
import { MusicService } from '../../services/music.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import {
  faSpotify,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() menuItemClicked = new EventEmitter<void>();

  faHome = faHome;
  faSearch = faSearch;
  faUser = faUser;
  faSpotify = faSpotify;
  faGithub = faGithub;
  faLinkedin = faLinkedin;

  PlaylistType = PlaylistType;
  searchQuery: string = '';
  searchResults: any[] = [];
  isSearching: boolean = false;
  playlists: Playlist[] = [];

  socialLinks = {
    spotify: 'https://open.spotify.com/user/samuelkim019',
    github: 'https://github.com/daedal00',
    linkedin: 'https://www.linkedin.com/in/samuelkim019',
  };

  constructor(
    private contentService: ContentService,
    private musicService: MusicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playlists = this.contentService.getPlaylists();
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
    this.menuItemClicked.emit();
  }

  navigateToPlaylist(playlistId: string): void {
    this.router.navigate(['/playlist', playlistId]);
    this.menuItemClicked.emit();
  }

  isPlaylistActive(playlistId: string): boolean {
    const url = this.router.url;
    return url.startsWith('/playlist/') && url.endsWith(playlistId);
  }

  selectPlaylist(type: PlaylistType): void {
    this.contentService.selectPlaylist(type);
  }

  playPause(): void {
    this.musicService.togglePlayPause();
  }

  skipToNext(): void {
    this.musicService.skipToNext();
  }

  skipToPrevious(): void {
    this.musicService.skipToPrevious();
  }

  openAboutMe(): void {
    this.contentService.selectContent('about-me');
    this.menuItemClicked.emit();
  }

  search(): void {
    this.isSearching = true;
    this.searchResults = this.contentService.searchContent(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.isSearching = false;
  }

  selectSearchResult(result: any): void {
    if (result.type === 'playlist') {
      this.contentService.selectPlaylist(result.id);
    } else if (result.type === 'content') {
      this.contentService.selectContent(result.id);
    }
    this.clearSearch();
    this.menuItemClicked.emit();
  }

  openExternalLink(type: 'spotify' | 'github' | 'linkedin'): void {
    window.open(this.socialLinks[type], '_blank');
    this.menuItemClicked.emit();
  }
}
