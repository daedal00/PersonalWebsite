import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from '../../services/music.service';
import { MusicTrack } from '../../models/content.model';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class PlayerComponent implements OnInit, OnDestroy {
  currentTrack: MusicTrack | null = null;
  isPlaying = false;
  trackProgress = 0;
  volume = 70;
  showUploadDialog = false;
  uploadError = '';
  defaultTracks: MusicTrack[] = [];
  isShuffleEnabled = false;
  isLoopEnabled = false;
  private timeUpdateSubscription?: Subscription;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService.currentTrack$.subscribe((track) => {
      this.currentTrack = track;
    });

    this.musicService.isPlaying$.subscribe((isPlaying) => {
      this.isPlaying = isPlaying;

      // When playback starts, create an interval to update time more frequently
      if (isPlaying && !this.timeUpdateSubscription) {
        this.timeUpdateSubscription = interval(500).subscribe(() => {
          // Force UI update for time displays
          this.updateTimeDisplay();
        });
      } else if (!isPlaying && this.timeUpdateSubscription) {
        this.timeUpdateSubscription.unsubscribe();
        this.timeUpdateSubscription = undefined;
      }
    });

    this.musicService.trackProgress$.subscribe((progress) => {
      this.trackProgress = progress;
    });

    this.musicService.isShuffleEnabled$.subscribe((isEnabled) => {
      this.isShuffleEnabled = isEnabled;
    });

    this.musicService.isLoopEnabled$.subscribe((isEnabled) => {
      this.isLoopEnabled = isEnabled;
    });

    // Load default tracks
    this.defaultTracks = this.musicService.getDefaultTracks();
  }

  ngOnDestroy(): void {
    if (this.timeUpdateSubscription) {
      this.timeUpdateSubscription.unsubscribe();
    }
  }

  updateTimeDisplay(): void {
    // This method forces change detection to update the time displays
  }

  togglePlay(): void {
    if (this.isPlaying) {
      this.musicService.pause();
    } else {
      this.musicService.play();
    }
  }

  playNext(): void {
    this.musicService.playNext();
  }

  playPrevious(): void {
    this.musicService.playPrevious();
  }

  onProgressChange(event: any): void {
    const percent = event.target.value;
    this.musicService.seekTo(percent);
  }

  onVolumeChange(event: any): void {
    this.volume = event.target.value;
    this.musicService.setVolume(this.volume);
  }

  toggleUploadDialog(): void {
    this.showUploadDialog = !this.showUploadDialog;
    this.uploadError = '';
  }

  handleFileUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.musicService
      .addCustomTrack(file)
      .then((track) => {
        this.defaultTracks = this.musicService.getDefaultTracks();
        this.showUploadDialog = false;
        // Optionally play the new track immediately
        this.musicService.play(track);
      })
      .catch((error) => {
        this.uploadError = error.message;
      });
  }

  playTrack(track: MusicTrack): void {
    this.musicService.play(track);
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  get currentTime(): string {
    const audioElem = this.audio;
    return this.formatTime(
      audioElem && !isNaN(audioElem.currentTime) ? audioElem.currentTime : 0
    );
  }

  get totalTime(): string {
    const audioElem = this.audio;
    return this.formatTime(
      audioElem && !isNaN(audioElem.duration) ? audioElem.duration : 0
    );
  }

  private get audio(): HTMLAudioElement | null {
    return document.querySelector('#audio-player');
  }

  toggleShuffle(): void {
    this.musicService.toggleShuffle();
  }

  toggleLoop(): void {
    this.musicService.toggleLoop();
  }
}
