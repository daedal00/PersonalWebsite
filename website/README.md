# Spotify-Themed Portfolio Website

A personal portfolio website with a Spotify-inspired UI, displaying projects, experiences, education, and skills as playlists and tracks.

## Features

- Spotify-inspired UI with dark theme
- Projects, experience, education, and skills organized as playlists
- Interactive music player
- Detailed view for each project/experience/skill
- Background music playback

## How to Add Music

There are two ways to add music to your portfolio:

### 1. Using the UI (Easiest Method)

1. Click on the music icon in the player bar at the bottom of the screen
2. Click "Upload Music" button in the dialog that appears
3. Select an audio file from your computer
4. Your uploaded track will automatically start playing and be added to your music library

### 2. Adding Files Directly (For Development)

1. Add your music files to the `src/assets/music/` directory
2. Make sure to include appropriate album art in `src/assets/images/`
3. Update the `initializeDefaultTracks()` method in `src/app/services/music.service.ts` to include your tracks:

```typescript
private initializeDefaultTracks(): void {
  this.defaultTracks = [
    {
      id: 'default-1',
      name: 'Your Track Name',
      artist: 'Artist Name',
      album: 'Album Name',
      url: 'assets/music/your-file-name.mp3',
      coverImage: 'assets/images/your-cover-image.jpg'
    },
    // Add more tracks as needed
  ];
}
```

## Adding and Updating Content Images

### Where to Place Images

All images for your portfolio content should be stored in the appropriate folders within the `src/assets/images/` directory:

1. **Playlist Covers**:

   - Place playlist cover images in `src/assets/images/`
   - Recommended size: 300x300 pixels
   - Reference these in `content.service.ts` for each playlist's `coverImage` property
   - Examples: `projects.jpg`, `experience.jpg`, `education.jpg`, `skills.jpg`

2. **Content Item Images**:

   - Place individual content item images in `src/assets/images/`
   - Recommended size: 200x200 pixels
   - Reference these in `content.service.ts` for each content item's `imageUrl` property
   - Examples: `foodtalk.jpg`, `budgetview.jpg`, `ubc.jpg`, etc.

3. **Music Album Art**:
   - Place music cover images in `src/assets/images/`
   - Recommended size: 200x200 pixels
   - Reference these in `music.service.ts` for each track's `coverImage` property
   - Examples: `lofi-cover.jpg`, `ambient-cover.jpg`, etc.

### Updating Image References

When you add new images, you'll need to update the references in:

1. **For Content**: `src/app/services/content.service.ts` in the `initializePlaylists()` method
2. **For Music**: `src/app/services/music.service.ts` in the `initializeDefaultTracks()` method

Example image paths:

```typescript
// For playlist covers
coverImage: "assets/images/projects.jpg";

// For content items
imageUrl: "assets/images/project1.jpg";

// For music tracks
coverImage: "assets/images/music-cover.jpg";
```

## File Organization

- `src/app/models/content.model.ts` - Data models for content and music
- `src/app/services/content.service.ts` - Service for managing portfolio content
- `src/app/services/music.service.ts` - Service for audio playback
- `src/app/components/spotify-layout/` - Main layout component
- `src/app/components/sidebar/` - Navigation sidebar
- `src/app/components/playlist/` - Content display
- `src/app/components/content-detail/` - Detailed view component
- `src/app/components/player/` - Music player component
- `src/assets/music/` - Music files
- `src/assets/images/` - Cover images and other visual assets

## Development

1. Install dependencies: `npm install`
2. Start development server: `ng serve`
3. Navigate to `http://localhost:4200/`

## Building for Production

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
