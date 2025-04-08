import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MusicTrack } from '../models/content.model';

export interface Track {
  id: string;
  title: string;
  artist: string;
  audioSrc: string;
  coverImage: string;
}

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private audio: HTMLAudioElement = new Audio();
  private currentTrackSubject = new BehaviorSubject<MusicTrack | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private trackProgressSubject = new BehaviorSubject<number>(0);
  private playlist: MusicTrack[] = [];
  private defaultTracks: MusicTrack[] = [];
  private currentTrackIndex = 0;
  private updateTimeInterval: any;
  private isShuffleEnabledSubject = new BehaviorSubject<boolean>(false);
  private isLoopEnabledSubject = new BehaviorSubject<boolean>(false);
  private shuffledPlaylist: MusicTrack[] = [];

  private tracks: Track[] = [
    {
      id: '1',
      title: 'Sparks',
      artist: 'Coldplay',
      audioSrc: 'assets/music/Coldplay - Sparks.mp3',
      coverImage: 'assets/images/sparks.jpeg',
    },
    {
      id: '2',
      title: 'Nothing',
      artist: 'Bruno Major',
      audioSrc: 'assets/music/Nothing.mp3',
      coverImage: 'assets/images/Nothing.jpeg',
    },
    {
      id: '3',
      title: 'love.',
      artist: 'wave to earth',
      audioSrc: 'assets/music/wave to earth - love..mp3',
      coverImage: 'assets/images/love..jpeg',
    },
  ];

  constructor() {
    // Wait until DOM is ready to get the audio element
    setTimeout(() => {
      this.audio = document.querySelector('#audio-player') || new Audio();

      this.audio.addEventListener('ended', () => {
        this.playNext();
      });

      this.audio.addEventListener('timeupdate', () => {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.trackProgressSubject.next(progress);
      });

      // Load the first track but don't play automatically
      if (this.defaultTracks.length > 0) {
        const firstTrack = this.defaultTracks[0];
        this.currentTrackSubject.next(firstTrack);
        this.audio.src = firstTrack.url;
        this.audio.load();
      }
    }, 500);

    // Initialize default background music
    this.initializeDefaultTracks();

    // Set up time update interval for more accurate time display
    this.updateTimeInterval = setInterval(() => {
      if (this.audio && this.audio.duration) {
        this.trackProgressSubject.next(
          (this.audio.currentTime / this.audio.duration) * 100
        );
      }
    }, 500);
  }

  get currentTrack$(): Observable<MusicTrack | null> {
    return this.currentTrackSubject.asObservable();
  }

  get isPlaying$(): Observable<boolean> {
    return this.isPlayingSubject.asObservable();
  }

  get trackProgress$(): Observable<number> {
    return this.trackProgressSubject.asObservable();
  }

  get isShuffleEnabled$(): Observable<boolean> {
    return this.isShuffleEnabledSubject.asObservable();
  }

  get isLoopEnabled$(): Observable<boolean> {
    return this.isLoopEnabledSubject.asObservable();
  }

  loadPlaylist(tracks: MusicTrack[]): void {
    this.playlist = [...tracks];
  }

  play(track?: MusicTrack): void {
    if (track) {
      if (this.currentTrackSubject.value?.id === track.id) {
        this.resumePlay();
        return;
      }
      this.currentTrackSubject.next(track);
      this.audio.src = track.url;
      this.audio.load();
      this.audio
        .play()
        .then(() => {
          this.isPlayingSubject.next(true);
        })
        .catch((error) => {
          console.error('Error playing audio', error);
        });
    } else if (this.currentTrackSubject.value) {
      this.resumePlay();
    } else if (this.defaultTracks.length > 0) {
      // If no track is specified, play the first default track
      this.play(this.defaultTracks[0]);
    }
  }

  private resumePlay(): void {
    this.audio
      .play()
      .then(() => {
        this.isPlayingSubject.next(true);
      })
      .catch((error) => {
        console.error('Error resuming audio', error);
      });
  }

  pause(): void {
    this.audio.pause();
    this.isPlayingSubject.next(false);
  }

  togglePlayPause(): void {
    if (this.isPlayingSubject.value) {
      this.pause();
    } else {
      this.play();
    }
  }

  skipToNext(): void {
    this.playNext();
  }

  skipToPrevious(): void {
    // If we're more than 3 seconds into the song, restart it
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }

    this.playPrevious();
  }

  playNext(): void {
    if (!this.currentTrackSubject.value) {
      if (this.defaultTracks.length > 0) {
        this.play(this.defaultTracks[0]);
      }
      return;
    }

    // Use shuffled playlist if shuffle is enabled
    const activePlaylist = this.isShuffleEnabledSubject.value
      ? this.shuffledPlaylist
      : this.playlist.length > 0
      ? this.playlist
      : this.defaultTracks;

    if (activePlaylist.length === 0) return;

    const currentIndex = activePlaylist.findIndex(
      (track) => track.id === this.currentTrackSubject.value?.id
    );

    if (currentIndex < activePlaylist.length - 1) {
      // Not the last track, play the next one
      this.play(activePlaylist[currentIndex + 1]);
    } else if (this.isLoopEnabledSubject.value) {
      // If looping and at the end, go back to first track
      this.play(activePlaylist[0]);
    } else if (activePlaylist.length > 0) {
      // If not looping but we have tracks, start from the beginning
      this.play(activePlaylist[0]);
    }
  }

  playPrevious(): void {
    if (!this.currentTrackSubject.value) {
      if (this.defaultTracks.length > 0) {
        this.play(this.defaultTracks[0]);
      }
      return;
    }

    // If we're more than 3 seconds into the song, restart it
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }

    // Use shuffled playlist if shuffle is enabled
    const activePlaylist = this.isShuffleEnabledSubject.value
      ? this.shuffledPlaylist
      : this.playlist.length > 0
      ? this.playlist
      : this.defaultTracks;

    if (activePlaylist.length === 0) return;

    const currentIndex = activePlaylist.findIndex(
      (track) => track.id === this.currentTrackSubject.value?.id
    );

    if (currentIndex > 0) {
      this.play(activePlaylist[currentIndex - 1]);
    } else if (this.isLoopEnabledSubject.value) {
      // If looping and at the beginning, go to the last track
      this.play(activePlaylist[activePlaylist.length - 1]);
    }
  }

  seekTo(percent: number): void {
    if (!this.audio.duration) return;
    this.audio.currentTime = (percent / 100) * this.audio.duration;
  }

  setVolume(volume: number): void {
    this.audio.volume = volume / 100;
  }

  // Method to add custom uploaded music tracks
  addCustomTrack(file: File): Promise<MusicTrack> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('audio/')) {
        reject(new Error('File must be an audio file'));
        return;
      }

      // Create a URL for the audio file
      const url = URL.createObjectURL(file);

      // Create a temporary audio element to get metadata
      const tempAudio = new Audio(url);

      tempAudio.onloadedmetadata = () => {
        // Create a new track
        const track: MusicTrack = {
          id: `custom-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
          artist: 'Custom Upload',
          album: 'My Uploads',
          url: url,
          coverImage: 'assets/images/5.png', // Updated default cover image
        };

        // Add to playlist
        this.defaultTracks.push(track);

        resolve(track);
      };

      tempAudio.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load audio file'));
      };
    });
  }

  getDefaultTracks(): MusicTrack[] {
    return [...this.defaultTracks];
  }

  private initializeDefaultTracks(): void {
    // These would be your pre-loaded tracks - using your uploaded music files
    this.defaultTracks = [
      {
        id: 'default-1',
        name: 'Sparks',
        artist: 'Coldplay',
        album: 'Background Tracks',
        url: 'assets/music/Coldplay - Sparks.mp3',
        coverImage: 'assets/images/sparks.jpeg',
      },
      {
        id: 'default-2',
        name: 'Nothing',
        artist: 'Bruno Major',
        album: 'Background Tracks',
        url: 'assets/music/Nothing.mp3',
        coverImage: 'assets/images/Nothing.jpeg',
      },
      {
        id: 'default-3',
        name: 'love.',
        artist: 'wave to earth',
        album: 'Background Tracks',
        url: 'assets/music/wave to earth - love..mp3',
        coverImage: 'assets/images/love..jpeg',
      },
      {
        id: 'default-4',
        name: 'John Wayne',
        artist: 'Cigarettes After Sex',
        album: 'Background Tracks',
        url: 'assets/music/John Wayne - Cigarettes After Sex.mp3',
        coverImage: 'assets/images/cas.jpg',
      },
      {
        id: 'default-5',
        name: 'bandaids',
        artist: 'keshi',
        album: 'Background Tracks',
        url: 'assets/music/keshi - bandaids.mp3',
        coverImage: 'assets/images/bandaids.jpeg',
      },
    ];
  }

  getTracks(): Track[] {
    return [...this.tracks];
  }

  toggleShuffle(): void {
    const newState = !this.isShuffleEnabledSubject.value;
    this.isShuffleEnabledSubject.next(newState);

    if (newState) {
      this.shufflePlaylist();
    }
  }

  toggleLoop(): void {
    const newState = !this.isLoopEnabledSubject.value;
    this.isLoopEnabledSubject.next(newState);

    // Handle loop state for HTML audio element
    this.audio.loop = newState;
  }

  private shufflePlaylist(): void {
    if (this.defaultTracks.length > 0) {
      // Create a copy of the default tracks
      this.shuffledPlaylist = [...this.defaultTracks];

      // Fisher-Yates shuffle algorithm
      for (let i = this.shuffledPlaylist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shuffledPlaylist[i], this.shuffledPlaylist[j]] = [
          this.shuffledPlaylist[j],
          this.shuffledPlaylist[i],
        ];
      }
    }
  }
}
