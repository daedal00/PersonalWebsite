# Samuel Kim - Portfolio Website

A clean, minimalistic personal portfolio website showcasing projects, experience, education, and skills with a modern dark theme and intuitive navigation.

## Design Inspiration

This portfolio draws inspiration from [Paco Coursey's website](https://paco.me/) - a masterclass in minimalistic design and typography. Key design principles adopted include:

- **Simplicity First**: Clean layouts with essential content only
- **Typography Focus**: Careful attention to readability and hierarchy
- **Subtle Interactions**: Smooth transitions and hover states
- **Content-Driven**: Design serves the content, not the other way around
- **Professional Minimalism**: Sophisticated simplicity that showcases work effectively

The goal is to create a portfolio that, like Paco's, demonstrates technical skill through both the projects displayed and the craftsmanship of the site itself.

## Features

- Clean, minimalistic design with dark theme
- Projects, experience, education, and skills organized as sections
- Detailed view for each project/experience/skill
- Responsive design for all devices
- Interactive navigation and smooth transitions
- Modern Angular architecture

## Project Structure

### Core Components

- **Home Component** (`src/app/home/`) - Main landing page with section overview
- **Section Component** (`src/app/components/section/`) - Displays content items within each section
- **Content Detail Component** (`src/app/components/content-detail/`) - Detailed view for individual items

### Services

- **Content Service** (`src/app/services/content.service.ts`) - Manages portfolio content and navigation
- Handles section selection, content filtering, and data management

### Models

- **Content Model** (`src/app/models/content.model.ts`) - TypeScript interfaces for content structure
- Defines Section, Content, SectionType, and Technology interfaces

## Content Management

### Adding New Projects

Update the `initializeSections()` method in `src/app/services/content.service.ts`:

```typescript
{
  id: 'project-id',
  title: 'Project Title',
  subtitle: 'Technologies Used',
  description: 'Brief project description',
  imageUrl: 'assets/images/project-image.jpg',
  link: 'https://github.com/username/repo',
  details: {
    Duration: 'Project Timeline',
    Role: 'Your Role',
    'Key Features': 'Main functionality',
    Technologies: [
      { name: 'Technology', icon: 'devicon-tech-plain' }
    ]
  },
  date: 'Date',
  duration: 'Duration'
}
```

### Adding Experience

Add new experience items to the experience section in the same service file:

```typescript
{
  id: 'exp-id',
  title: 'Job Title',
  subtitle: 'Company Name',
  description: 'Role description and achievements',
  details: {
    Duration: 'Employment Period',
    Location: 'Location',
    'Key Achievements': 'Major accomplishments',
    Technologies: [
      { name: 'Technology', icon: 'devicon-tech-plain' }
    ]
  }
}
```

## Asset Management

### Images

Place all images in `src/assets/images/`:

- **Project Images**: Individual project screenshots or logos
- **Default Image**: `default-item.jpg` for items without specific images
- **Wallpapers**: Personal wallpapers (e.g., `wallpaper.png`)

Recommended image sizes:

- Project images: 400x300 pixels
- Profile images: 200x200 pixels

### Documents

Place downloadable documents in `src/assets/`:

- Resume: `Samuel_Kim_Resume.pdf`
- Project reports: `project-report.pdf`
- Research papers: `research-paper.pdf`

## Styling and Theme

### Design System

The website uses a consistent design system defined in `src/styles.scss`:

- **Colors**: Dark theme with carefully chosen contrast ratios
- **Typography**: Inter font family for optimal readability
- **Spacing**: Consistent spacing scale for visual hierarchy
- **Components**: Reusable design tokens for maintainability

### Key Design Principles

- **Minimalism**: Clean layouts with ample whitespace
- **Readability**: Optimized typography and contrast
- **Consistency**: Uniform spacing and component patterns
- **Accessibility**: Proper focus states and semantic HTML
