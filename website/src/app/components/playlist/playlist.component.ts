import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { MusicService } from '../../services/music.service';
import {
  Content,
  Playlist,
  MusicTrack,
  PlaylistType,
} from '../../models/content.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  playlist: Playlist | null = null;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private musicService: MusicService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const playlistId = params.get('id');
      if (playlistId) {
        this.contentService.selectPlaylist(playlistId);
        this.contentService.selectedPlaylist$.subscribe((playlist) => {
          this.playlist = playlist;
        });
      }
    });
  }

  openContentDetail(contentId: string): void {
    this.contentService.selectContent(contentId);
  }

  playItem(content: Content, index: number): void {
    // For demonstration - create a fake track from content item
    const track: MusicTrack = {
      id: content.id,
      name: content.title,
      artist: content.subtitle,
      album: this.playlist?.name || '',
      url: '', // Would be the actual audio file URL
      coverImage: content.imageUrl || '',
    };

    // If we had actual music tracks, we would load them here
    // For now, just trigger the detail view
    this.openContentDetail(content.id);
  }

  hasTechnologies(item: Content): boolean {
    return (
      !!item.details &&
      !!item.details['Technologies'] &&
      Array.isArray(item.details['Technologies']) &&
      item.details['Technologies'].length > 0
    );
  }

  getTopTechnologies(item: Content, count: number): any[] {
    if (!this.hasTechnologies(item) || !item.details) {
      return [];
    }
    return item.details['Technologies'].slice(0, count);
  }

  getDefaultItemImage(item: Content): string {
    // Use different default images based on the playlist type or other criteria
    if (this.playlist) {
      switch (this.playlist.type) {
        case PlaylistType.PROJECTS:
          return 'assets/images/6.png';
        case PlaylistType.EXPERIENCE:
          return 'assets/images/5.png';
        case PlaylistType.EDUCATION:
          return 'assets/images/7.png';
        case PlaylistType.SKILLS:
          return 'assets/images/3.png';
        default:
          return 'assets/images/1.png';
      }
    }
    return 'assets/images/1.png';
  }
}
