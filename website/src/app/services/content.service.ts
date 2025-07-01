import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Content, Section, SectionType } from '../models/content.model';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private sections: Section[] = [];
  private selectedSectionSubject = new BehaviorSubject<Section | null>(null);
  private selectedContentSubject = new BehaviorSubject<Content | null>(null);

  constructor() {
    this.initializeSections();
  }

  get selectedSection$(): Observable<Section | null> {
    return this.selectedSectionSubject.asObservable();
  }

  get selectedContent$(): Observable<Content | null> {
    return this.selectedContentSubject.asObservable();
  }

  selectSection(sectionId: string): void {
    const section = this.sections.find((s) => s.id === sectionId);
    if (section) {
      this.selectedSectionSubject.next(section);
    }
  }

  selectContent(contentId: string): void {
    for (const section of this.sections) {
      const content = section.items.find(
        (item: Content) => item.id === contentId
      );
      if (content) {
        // Create a copy to avoid mutating the original
        const contentCopy: Content = {
          ...content,
        };

        // Make sure Duration appears first in the details object for better UI organization
        if (contentCopy.details) {
          const { Duration, ...otherDetails } = contentCopy.details as any;
          if (Duration) {
            contentCopy.details = {
              Duration,
              ...otherDetails,
            };
          }
        }

        this.selectedContentSubject.next(contentCopy);
        return;
      }
    }
  }

  getSections(): Section[] {
    return [...this.sections];
  }

  getSection(type: SectionType): Section | undefined {
    return this.sections.find((s) => s.type === type);
  }

  searchContent(query: string): any[] {
    if (!query.trim()) return [];

    const results: any[] = [];
    const lowerQuery = query.toLowerCase();

    // Search in sections
    this.sections.forEach((section) => {
      if (
        section.name.toLowerCase().includes(lowerQuery) ||
        section.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          id: section.id,
          name: section.name,
          description: section.description,
          type: 'section',
        });
      }

      // Search in content items
      section.items.forEach((item: Content) => {
        if (
          item.title.toLowerCase().includes(lowerQuery) ||
          item.subtitle.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            type: 'content',
            sectionId: section.id,
          });
        }
      });
    });

    return results;
  }

  // Keep the old method names for backward compatibility during transition
  getPlaylists(): Section[] {
    return this.getSections();
  }

  getPlaylist(type: SectionType): Section | undefined {
    return this.getSection(type);
  }

  selectPlaylist(sectionId: string): void {
    this.selectSection(sectionId);
  }

  get selectedPlaylist$(): Observable<Section | null> {
    return this.selectedSection$;
  }

  private initializeSections(): void {
    // Real data for Samuel Kim's portfolio based on the resume
    this.sections = [
      {
        id: 'projects',
        name: 'Projects',
        description: 'Key technical projects and applications',
        type: SectionType.PROJECTS,
        items: [
          {
            id: 'project9',
            title: 'Muse: Music Discovery & Review Platform',
            subtitle: 'Go, GraphQL, React, TypeScript, PostgreSQL, Docker',
            description:
              'A Letterboxd-inspired platform for music lovers featuring album reviews, playlist curation, and music discovery. Built with a clean monolithic architecture using Go and GraphQL.',
            imageUrl: 'assets/images/default-item.jpg',
            link: 'https://github.com/daedal00/Muse',
            details: {
              Duration: 'May 2025 - Present',
              Role: 'Full-stack Developer & Architect',
              'Key Features':
                'User authentication with JWT, album ratings and reviews (1-5 stars), playlist creation and management, music search via Spotify API integration',
              'Frontend Technologies':
                'React, TypeScript, modern web development (planned)',
              'Backend Technologies':
                'Go, GraphQL (gqlgen), PostgreSQL, Redis, Docker',
              Architecture:
                'Monolithic backend with GraphQL API, schema-first development approach, repository pattern for clean separation of concerns',
              'External Integrations':
                'Spotify Web API for music metadata and search functionality',
              'Technical Highlights':
                'Complete test coverage for all repositories, JWT-based authentication, cursor-based pagination, comprehensive GraphQL schema design',
              'Current Status':
                'Backend 90% complete with all core features implemented, frontend development ready to begin',
            },
            documentationLink:
              'https://living-bramble-28c.notion.site/1cfade68a5ff80d2b5a0c5987671bc9f?v=1cfade68a5ff8189bcd8000cc7747e5e&source=copy_link',
            date: 'May 2025',
            duration: 'Ongoing',
          },
          {
            id: 'project10',
            title: 'Cosmic Void Galaxies Machine Learning',
            subtitle: 'Python, Scikit-learn, Astropy, Machine Learning',
            description:
              'Applied supervised machine learning to classify galaxies residing within cosmic voids using SDSS DR7 data, achieving 0.80 F1 score with Random Forest classifier.',
            imageUrl: 'assets/images/default-item.jpg',
            reportLink:
              'assets/Identifying Cosmic Void Galaxies with Machine Learning_ 310 Final Project Report.pdf',
            notebookLink: 'assets/SDSS_Catalog.pdf',
            details: {
              Duration: 'April 2025',
              Role: 'Data Scientist & Researcher',
              Course: 'Physics 310: Machine Learning with Physics',
              'Research Objective':
                'Identify galaxies residing within cosmic voids using machine learning to enhance understanding of large-scale cosmic structures',
              'Key Achievements':
                'F1 score of 0.80 for void class classification, 55.4% mean per-void recall, 95% void detection rate',
              Technologies: [
                { name: 'Python', icon: 'devicon-python-plain' },
                { name: 'Scikit-learn', icon: 'devicon-sklearn-plain' },
                { name: 'NumPy', icon: 'devicon-numpy-original' },
                { name: 'Pandas', icon: 'devicon-pandas-original' },
              ],
              'ML Techniques':
                'Random Forest Classifier, HalvingGridSearchCV hyperparameter tuning, cross-validation',
              'Data Source':
                'Sloan Digital Sky Survey (SDSS) DR7 with precomputed void catalogue',
            },
            date: 'April 2025',
            duration: '4 months',
          },
          {
            id: 'project11',
            title: 'BigWay Fun Invite Website',
            subtitle: 'JavaScript, HTML, CSS, Express',
            description:
              'A playful and creative website designed to ask friends and others out for BigWay restaurant in a fun, interactive way with form responses sent via email.',
            imageUrl: 'assets/images/default-item.jpg',
            link: 'https://github.com/daedal00/ilovebigway',
            liveWebsiteLink:
              'https://www.imadethissitetoaskyououtforbigway.com/',
            details: {
              Duration: 'April 2025',
              Role: 'Full-stack Developer',
              'Development Time': 'Single day project',
              'Key Features':
                'Interactive password entry, personalized user experience, availability scheduling, email form submission',
              Technologies: [
                { name: 'JavaScript', icon: 'devicon-javascript-plain' },
                { name: 'HTML', icon: 'devicon-html5-plain' },
                { name: 'CSS', icon: 'devicon-css3-plain' },
                { name: 'Express', icon: 'devicon-express-original' },
              ],
              'Technical Implementation':
                'Frontend with vanilla JavaScript for interactivity, Express backend for form processing and email sending',
            },
            date: 'April 2025',
            duration: '1 day',
          },
          {
            id: 'project8',
            title: 'Hyprland Dotfiles',
            subtitle: 'Shell, CSS, Configuration Management',
            description:
              'Personal dotfiles configuration for Arch Linux with Hyprland window manager, featuring a beautiful Gruvbox-themed desktop environment.',
            imageUrl: 'assets/wallpaper.png',
            link: 'https://github.com/daedal00/dotfiles',
            wallpaperLink:
              'https://gruvbox-wallpapers.pages.dev/wallpapers/anime/my-neighbor-totoro-sunflowers.png',
            details: {
              Duration: 'April 2025 - Present',
              Role: 'System Administrator',
              'System Setup': 'Arch Linux with Hyprland window manager',
              'Key Components':
                'Waybar status bar, Wofi application launcher, custom Hyprland configuration, Gruvbox color scheme',
              Technologies: [
                { name: 'Shell', icon: 'devicon-bash-plain' },
                { name: 'CSS', icon: 'devicon-css3-plain' },
                { name: 'Linux', icon: 'devicon-linux-plain' },
              ],
              Features:
                'Tiling window management, custom keybindings, aesthetic status bar, application launcher integration',
            },
            date: 'April 2025',
            duration: 'Ongoing',
          },
          {
            id: 'project5',
            title: 'Where2Eat',
            subtitle: 'TypeScript, React, Express',
            description:
              'A real-time collaborative voting platform that streamlines group decision-making for restaurant choices in Vancouver and the Lower Mainland.',
            imageUrl: 'assets/images/default-item.jpg',
            link: 'https://github.com/daedal00/where2eat',
            details: {
              Duration: 'February 2025',
              Role: 'Full-stack Developer',
              'Key Features':
                'Real-time voting system, invite code generation, user-based voting, location-based restaurant suggestions',
              Technologies: [
                { name: 'TypeScript', icon: 'devicon-typescript-plain' },
                { name: 'React', icon: 'devicon-react-original' },
                { name: 'Express', icon: 'devicon-express-original' },
                { name: 'Node.js', icon: 'devicon-nodejs-plain' },
              ],
              'Technical Achievements':
                'Implemented real-time synchronization, built responsive UI with React hooks, developed secure invite code system',
              Deployment:
                'Frontend hosted on Vercel with serverless backend functions for scalability',
            },
            date: 'February 2025',
            duration: '2 weeks',
          },
          {
            id: 'project6',
            title: 'RouteBite',
            subtitle:
              'TypeScript, Express, Google Maps + Yelp API, MongoDB, React',
            description:
              'An innovative travel companion app that intelligently recommends quality restaurants along user-specified routes, enhancing the journey experience.',
            imageUrl: 'assets/images/default-item.jpg',
            link: 'https://github.com/daedal00/RouteBite',
            details: {
              Duration: 'September 2024',
              Role: 'Full-stack Developer & Project Lead',
              'Key Features':
                'Route-based restaurant recommendations, intelligent filtering based on ratings and price, customizable search radius',
              Technologies: [
                { name: 'TypeScript', icon: 'devicon-typescript-plain' },
                { name: 'React', icon: 'devicon-react-original' },
                { name: 'Express', icon: 'devicon-express-original' },
                { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
                { name: 'Google Maps', icon: 'devicon-google-plain' },
              ],
              'Technical Challenges':
                'Integrated complex geospatial calculations with Google Maps API to determine restaurant proximity to routes',
              APIs: 'Google Maps API for route calculation, Yelp API for restaurant data',
              'Development Process':
                'Agile methodology with rapid one-week development cycle and continuous integration',
            },
            date: 'September 2024',
            duration: '1 week',
          },
          {
            id: 'project1',
            title: 'FoodTalk',
            subtitle: 'PHP, CSS, HTML, SQL, Oracle',
            description:
              'A dynamic social platform for food enthusiasts, featuring user authentication, post creation, and profile management.',
            imageUrl: 'assets/images/default-item.jpg',
            link: 'https://github.com/daedal00/foodtalk',
            details: {
              Duration: 'December 2023',
              Role: 'Lead Developer',
              'Team Size': '3 developers',
              'Key Contributions':
                'Led core feature development including user authentication, post creation, and profile management. Optimized SQL queries reducing database query time by 20%.',
              Methodology: 'Agile development with 6-week timeline',
              Documentation:
                'Authored comprehensive testing procedures, functionality guides, and UML diagrams',
              Technologies: [
                { name: 'PHP', icon: 'devicon-php-plain' },
                { name: 'HTML', icon: 'devicon-html5-plain' },
                { name: 'CSS', icon: 'devicon-css3-plain' },
                { name: 'SQL', icon: 'devicon-mysql-plain' },
                { name: 'Oracle', icon: 'devicon-oracle-plain' },
              ],
            },
            date: 'December 2023',
            duration: '6 weeks',
          },
          {
            id: 'project2',
            title: 'BudgetView',
            subtitle: 'Java Spring Boot, React, Plaid API, MongoDB',
            description:
              'A comprehensive full-stack finance app that securely connects real-world bank accounts for tracking and categorizing financial transactions.',
            imageUrl: 'assets/images/default-item.jpg',
            link: 'https://github.com/daedal00/FinanceAppAPI',
            details: {
              Duration: 'November 2023',
              Role: 'Full-stack Developer',
              Repositories: 'Frontend and Backend available on GitHub',
              'Key Features':
                'Secure bank account integration via Plaid API, transaction categorization and analysis, user authentication, responsive dashboard',
              Technologies: [
                { name: 'Java', icon: 'devicon-java-plain' },
                { name: 'Spring Boot', icon: 'devicon-spring-plain' },
                { name: 'React', icon: 'devicon-react-original' },
                { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
              ],
              'Technical Highlights':
                'Implemented secure OAuth2 authentication, containerized with Docker for scalability, designed RESTful API architecture',
              'Business Value':
                'Empowers users to gain control of their finances by providing real-time insights and transaction analysis',
              Achievements:
                'Boosted system efficiency by 25% using Data Transfer Objects, implemented OAuth 2.0 for secure authentication',
              Architecture:
                'RESTful API design, scalable backend with Spring Boot',
            },
            date: 'November 2023',
            duration: '8 weeks',
          },
          {
            id: 'project3',
            title: 'RecipeScout',
            subtitle: 'Python, Flask, HTML, CSS, JavaScript',
            description:
              'A recipe search app that lets users input ingredients and dynamically scrape recipes from AllRecipes.com.',
            imageUrl: 'assets/images/default-item.jpg',
            link: 'https://github.com/daedal00/recipescout',
            details: {
              Duration: 'August 2023',
              Role: 'Full-stack Developer',
              'Key Features':
                'Ingredient-based recipe search, responsive design, real-time recipe discovery',
              Technologies: [
                { name: 'Python', icon: 'devicon-python-plain' },
                { name: 'Flask', icon: 'devicon-flask-original' },
                { name: 'HTML', icon: 'devicon-html5-plain' },
                { name: 'CSS', icon: 'devicon-css3-plain' },
                { name: 'JavaScript', icon: 'devicon-javascript-plain' },
              ],
              Performance:
                'Accelerated search speed by 15% through asynchronous web scraping and multi-threading',
              Design:
                'Responsive, user-friendly interface that adjusts across different screen sizes',
            },
            date: 'August 2023',
            duration: '4 weeks',
          },
          {
            id: 'project7',
            title: 'MapleStory Cubing Simulator',
            subtitle: 'Java, Swing, Object-Oriented Design',
            description:
              'A simulation tool that allows MapleStory players to experiment with the game\'s "cubing" system for equipment enhancement without the real-world financial cost.',
            imageUrl: 'assets/images/default-item.jpg',
            link: 'https://github.com/daedal00/Maplestory-Cubing-Simulator',
            details: {
              Duration: 'December 2022',
              Role: 'Solo Developer',
              'Course Project':
                'Developed for CPSC 210 (Software Construction) at UBC',
              'Technical Highlights':
                'Implemented complex probability systems, designed object-oriented architecture with proper encapsulation and inheritance, created persistent data storage with JSON',
              'Key Features':
                'Equipment stat simulation, cube re-rolling system, stat tracking, save/load functionality, user-friendly GUI',
              Technologies: [
                { name: 'Java', icon: 'devicon-java-plain' },
                { name: 'Swing', icon: 'devicon-java-plain' },
                { name: 'JSON', icon: 'devicon-javascript-plain' },
              ],
              'Software Engineering Principles':
                'Applied SOLID principles, implemented event-driven programming, used MVC architecture, practiced test-driven development',
              'Problem Solved':
                'Allows players to test enhancement strategies without spending thousands of dollars on in-game purchases',
              'Learning Outcomes':
                'Gained experience in GUI development, event handling, file I/O, and software design patterns',
            },
            date: 'December 2022',
            duration: '4 weeks',
          },
        ],
      },
      {
        id: 'experience',
        name: 'Experience',
        description: 'Professional work history and internships',
        type: SectionType.EXPERIENCE,
        items: [
          {
            id: 'exp1',
            title: 'Software Engineer Intern',
            subtitle: 'Savi Finance',
            description:
              'Developed income and expense categorization systems, automated email parsing, and led database migrations in a fast-paced fintech environment.',
            imageUrl: '',
            details: {
              Duration: 'January 2024 - August 2024',
              Location: 'Remote',
              Technologies: [
                { name: 'TypeScript', icon: 'devicon-typescript-plain' },
                { name: 'GraphQL', icon: 'devicon-graphql-plain' },
                { name: 'Node.js', icon: 'devicon-nodejs-plain' },
                { name: 'Nx', icon: 'devicon-nixos-plain' },
              ],
              'Key Achievements':
                'Developed income and expense categorization system in just 7 days. Automated transaction email parsing using AWS and OpenAI 4o-mini, reducing customer workload by 35 seconds.',
              Leadership:
                'Led an 8-step, zero-downtime database migration ensuring uninterrupted service.',
              Collaboration:
                'Worked with cross-functional team of 5 to architect technical documents for automation processes.',
            },
            date: 'January 2024 - August 2024',
            duration: '8 months',
          },
        ],
      },
    ];
  }
}
