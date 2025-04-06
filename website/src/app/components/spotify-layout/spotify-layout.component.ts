import { Component, OnInit } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { filter } from 'rxjs/operators';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ContentDetailComponent } from '../content-detail/content-detail.component';
import { PlayerComponent } from '../player/player.component';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../../models/content.model';

@Component({
  selector: 'app-spotify-layout',
  templateUrl: './spotify-layout.component.html',
  styleUrls: ['./spotify-layout.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SidebarComponent,
    ContentDetailComponent,
    PlayerComponent,
  ],
  standalone: true,
})
export class SpotifyLayoutComponent implements OnInit {
  sidebarOpen = false;
  navigationHistory: string[] = [];
  currentHistoryIndex = -1;

  // Search properties
  searchQuery: string = '';
  searchResults: any[] = [];
  isSearchActive: boolean = false;
  playlists: Playlist[] = [];

  isMobileSidebarOpen = false;

  constructor(
    private contentService: ContentService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.contentService.sidebarOpen$.subscribe((isOpen) => {
      this.sidebarOpen = isOpen;
    });

    // Load playlists for the search results
    this.playlists = this.contentService.getPlaylists();

    // Simplified navigation tracking
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Only add to history if it's a new route
        if (
          this.currentHistoryIndex === -1 ||
          this.navigationHistory[this.currentHistoryIndex] !==
            event.urlAfterRedirects
        ) {
          // If we navigated after going back, trim the forward history
          if (this.currentHistoryIndex < this.navigationHistory.length - 1) {
            this.navigationHistory = this.navigationHistory.slice(
              0,
              this.currentHistoryIndex + 1
            );
          }

          // Add the new URL to history
          this.navigationHistory.push(event.urlAfterRedirects);
          this.currentHistoryIndex = this.navigationHistory.length - 1;
        }
      });
  }

  toggleSidebar(): void {
    this.contentService.toggleSidebar();
  }

  navigateBack(): void {
    if (this.canNavigateBack()) {
      this.currentHistoryIndex--;
      this.router.navigateByUrl(
        this.navigationHistory[this.currentHistoryIndex]
      );
    }
  }

  navigateForward(): void {
    if (this.canNavigateForward()) {
      this.currentHistoryIndex++;
      this.router.navigateByUrl(
        this.navigationHistory[this.currentHistoryIndex]
      );
    }
  }

  canNavigateBack(): boolean {
    return this.currentHistoryIndex > 0;
  }

  canNavigateForward(): boolean {
    return this.currentHistoryIndex < this.navigationHistory.length - 1;
  }

  closeDetailSidebar(event: MouseEvent): void {
    // Only close if sidebar is open and we're not clicking a link or other interactive element
    if (this.sidebarOpen) {
      const targetElement = event.target as HTMLElement;
      // Check if the click wasn't on an interactive element (buttons, links, etc.)
      const isInteractiveElement =
        targetElement.closest('button') ||
        targetElement.closest('a') ||
        targetElement.closest('.playlist-item') ||
        targetElement.closest('.track-item');

      if (!isInteractiveElement) {
        this.contentService.toggleSidebar(false);
      }
    }

    // Also close mobile sidebar if clicked outside
    const sidebarElement = document.querySelector('.sidebar') as HTMLElement;
    if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
      this.isMobileSidebarOpen = false;
      sidebarElement.classList.remove('mobile-open');
    }
  }

  openAboutMe(): void {
    this.router.navigate(['/about']);
  }

  // Search functions
  onSearchFocus(): void {
    this.isSearchActive = true;
  }

  onSearchInput(): void {
    if (this.searchQuery.trim()) {
      this.searchResults = this.contentService.searchContent(this.searchQuery);
    } else {
      this.searchResults = [];
    }
  }

  selectSearchResult(result: any): void {
    if (result.type === 'playlist') {
      this.navigateToPlaylist(result.id);
    } else if (result.type === 'content') {
      // Navigate to the playlist first, then select the content
      this.router.navigate(['/playlist', result.playlistId]).then(() => {
        // After navigation completes, select the specific content
        this.contentService.selectContent(result.id);
      });
    }
    this.isSearchActive = false;
  }

  navigateToPlaylist(playlistId: string): void {
    this.router.navigate(['/playlist', playlistId]);
    this.isSearchActive = false;
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    const sidebarElement = document.querySelector('.sidebar') as HTMLElement;
    if (sidebarElement) {
      if (this.isMobileSidebarOpen) {
        sidebarElement.classList.add('mobile-open');
      } else {
        sidebarElement.classList.remove('mobile-open');
      }
    }
  }
}
