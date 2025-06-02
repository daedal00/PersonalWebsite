import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Content, Playlist, PlaylistType } from '../models/content.model';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private playlists: Playlist[] = [];
  private selectedPlaylistSubject = new BehaviorSubject<Playlist | null>(null);
  private selectedContentSubject = new BehaviorSubject<Content | null>(null);
  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initializePlaylists();
  }

  get selectedPlaylist$(): Observable<Playlist | null> {
    return this.selectedPlaylistSubject.asObservable();
  }

  get selectedContent$(): Observable<Content | null> {
    return this.selectedContentSubject.asObservable();
  }

  get sidebarOpen$(): Observable<boolean> {
    return this.sidebarOpenSubject.asObservable();
  }

  selectPlaylist(playlistId: string): void {
    const playlist = this.playlists.find((p) => p.id === playlistId);
    if (playlist) {
      this.selectedPlaylistSubject.next(playlist);
    }
  }

  selectContent(contentId: string): void {
    for (const playlist of this.playlists) {
      const content = playlist.items.find((item) => item.id === contentId);
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
        this.toggleSidebar(true);
        return;
      }
    }
  }

  toggleSidebar(isOpen?: boolean): void {
    if (isOpen !== undefined) {
      this.sidebarOpenSubject.next(isOpen);
    } else {
      this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
    }
  }

  getPlaylists(): Playlist[] {
    return [...this.playlists];
  }

  getPlaylist(type: PlaylistType): Playlist | undefined {
    return this.playlists.find((p) => p.type === type);
  }

  searchContent(query: string): any[] {
    if (!query.trim()) return [];

    const results: any[] = [];
    const lowerQuery = query.toLowerCase();

    // Search in playlists
    this.playlists.forEach((playlist) => {
      if (
        playlist.name.toLowerCase().includes(lowerQuery) ||
        playlist.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          id: playlist.id,
          name: playlist.name,
          description: playlist.description,
          image: playlist.coverImage || `assets/images/${playlist.id}.png`,
          type: 'playlist',
        });
      }

      // Search in content items
      playlist.items.forEach((item) => {
        if (
          item.title.toLowerCase().includes(lowerQuery) ||
          item.subtitle.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery)
        ) {
          const defaultImage = this.getDefaultImageForPlaylistType(
            playlist.type
          );
          results.push({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            imageUrl: item.imageUrl || defaultImage,
            type: 'content',
            playlistId: playlist.id,
          });
        }
      });
    });

    return results;
  }

  private getDefaultImageForPlaylistType(type: PlaylistType): string {
    switch (type) {
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

  private initializePlaylists(): void {
    // Real data for Samuel Kim's portfolio based on the resume
    this.playlists = [
      {
        id: 'projects',
        name: 'Projects',
        description: 'My key technical projects and applications',
        coverImage: 'assets/images/1.png',
        type: PlaylistType.PROJECTS,
        items: [
          {
            id: 'project9',
            title: 'Muse: Music Discovery & Review Platform',
            subtitle:
              'Go, GraphQL, React, TypeScript, Kubernetes, Microservices',
            description:
              'A Letterboxd-inspired app for music lovers, built with a modern microservices architecture. Features album reviews, playlist curation, and music discovery.',
            imageUrl: 'assets/images/default-item.jpg',
            link: 'https://github.com/daedal00/Muse',
            details: {
              Duration: 'May 2025 - Present',
              Role: 'Full-stack Developer & Architect',
              'Project Type': 'Personal Project - Production-grade Application',
              'Key Features':
                'User profiles with custom avatars, album ratings and reviews (1-5 stars), playlist creation and management, real-time review broadcasting, cursor-based pagination',
              'Frontend Technologies':
                'React, TypeScript, Apollo Client, Tailwind CSS, Vite',
              'Backend Technologies':
                'Go, GraphQL (gqlgen), PostgreSQL, Redis, Docker, Kubernetes',
              'Architecture Highlights':
                'Schema-first GraphQL API with gqlgen, microservices architecture, real-time subscriptions via WebSocket, Relay-style cursor pagination',
              'External Integrations':
                'Spotify Web API for music metadata, MusicBrainz for supplementary data and fallback lookups, AWS S3 for playlist cover image storage',
              'DevOps & Infrastructure':
                'Docker containerization, Kubernetes orchestration, GitHub Actions CI/CD, Prometheus monitoring, structured logging with Logrus',
              'Technical Challenges':
                'Synchronizing metadata from multiple external APIs, implementing cursor-based pagination, microservices orchestration, real-time data synchronization',
              'Security Features':
                'Bcrypt password hashing, JWT authentication with HTTP-only cookies, GraphQL resolver-level authorization',
              'Performance Optimizations':
                'Redis caching for popular queries, efficient database indexing, connection pooling, rate limiting for external API calls',
              'Business Value':
                'Provides music enthusiasts with a comprehensive platform for discovery, review, and social interaction around music, filling a gap similar to what Letterboxd does for films',
              Scalability:
                'Designed to scale from prototype to hundreds of thousands of users through microservices architecture and Kubernetes autoscaling',
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
              'Course Project': 'Physics 310: Machine Learning with Physics',
              'Research Objective':
                'Identify galaxies residing within cosmic voids using machine learning to enhance understanding of large-scale cosmic structures',
              'Data Source':
                'Sloan Digital Sky Survey (SDSS) DR7 with precomputed void catalogue',
              'Key Achievements':
                'F1 score of 0.80 for void class classification, 55.4% mean per-void recall, 95% void detection rate',
              Technologies: [
                { name: 'Python', icon: 'devicon-python-plain' },
                { name: 'Scikit-learn', icon: 'devicon-sklearn-plain' },
                { name: 'NumPy', icon: 'devicon-numpy-original' },
                { name: 'Pandas', icon: 'devicon-pandas-original' },
                { name: 'Matplotlib', icon: 'devicon-matplotlib-plain' },
              ],
              'ML Techniques':
                'Random Forest Classifier, HalvingGridSearchCV hyperparameter tuning, cross-validation',
              'Astronomical Tools':
                'Astropy for coordinate transformations, cKDTree for nearest-neighbor calculations',
              'Data Processing':
                'Feature engineering on spatial coordinates (x,y,z), environmental features, nearest-neighbor distances',
              'Model Performance':
                'Outperformed baseline models including Dummy Classifier and Linear SVC',
              'Feature Importance':
                'Spatial coordinates and nearest-neighbor distance were most influential predictors',
              Visualization:
                '3D scatter plots confirming predicted void galaxies cluster in underdense regions',
              'Scientific Impact':
                'Demonstrated ML as complementary approach to traditional void-finding algorithms',
              'Technical Skills':
                'Astronomical dataset handling, feature engineering, model optimization, statistical validation',
              Documentation:
                'Comprehensive final report with methodology, results, and astrophysical insights',
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
              'Project Concept':
                'Creative approach to asking friends and others out by building a custom website experience',
              Technologies: [
                { name: 'JavaScript', icon: 'devicon-javascript-plain' },
                { name: 'HTML', icon: 'devicon-html5-plain' },
                { name: 'CSS', icon: 'devicon-css3-plain' },
                { name: 'Express', icon: 'devicon-express-original' },
                { name: 'Node.js', icon: 'devicon-nodejs-plain' },
              ],
              'Key Features':
                'Interactive password entry, personalized user experience, availability scheduling, email form submission',
              'User Flow':
                'Password entry → Name collection → Interest assessment → Scheduling → Contact information → Email response',
              'Technical Implementation':
                'Frontend with vanilla JavaScript for interactivity, Express backend for form processing and email sending',
              'Email Integration':
                'Automated email responses with form data collection for seamless communication',
              'Design Philosophy':
                'Fun, engaging user interface with playful interactions and smooth user journey',
              Deployment: 'Hosted with live domain for real-world usage',
              'Creative Approach':
                'Combines web development skills with personal creativity for unique invitation approach',
              'Learning Outcomes':
                'Rapid prototyping, full-stack development in constrained timeframe, creative problem-solving',
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
                'Waybar status bar, Wofi application launcher, custom Hyprland configuration, Gruvbox color scheme throughout',
              Technologies: [
                { name: 'Shell', icon: 'devicon-bash-plain' },
                { name: 'CSS', icon: 'devicon-css3-plain' },
                { name: 'Linux', icon: 'devicon-linux-plain' },
              ],
              'Configuration Files':
                'Hyprland window manager config, Waybar status bar styling, Wofi launcher themes, custom scripts and aliases',
              'Design Theme':
                'Gruvbox color palette with consistent theming across all components',
              'Window Manager':
                'Hyprland - modern Wayland compositor with tiling capabilities',
              Features:
                'Tiling window management, custom keybindings, aesthetic status bar, application launcher integration, wallpaper collection',
              'Learning Outcomes':
                'Advanced Linux system administration, Wayland protocol understanding, shell scripting, CSS styling for system components',
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
              Duration: 'Feb. 2025',
              Role: 'Full-stack Developer',
              Demo: 'Live application available online',
              'Technical Achievements':
                'Implemented real-time synchronization, built responsive UI with React hooks, developed secure invite code system',
              'Key Features':
                'Real-time voting system, invite code generation, user-based voting, location-based restaurant suggestions',
              Technologies: [
                { name: 'TypeScript', icon: 'devicon-typescript-plain' },
                { name: 'React', icon: 'devicon-react-original' },
                { name: 'Express', icon: 'devicon-express-original' },
                { name: 'Node.js', icon: 'devicon-nodejs-plain' },
              ],
              'Problem Solved':
                'Eliminated decision paralysis for groups choosing dining locations by providing a structured, real-time voting system',
              Impact:
                'Reduces decision time by 70% and increases group satisfaction by providing democratic results',
              Deployment:
                'Frontend hosted on Vercel with serverless backend functions for scalability',
            },
            date: 'Feb. 2025',
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
              Duration: 'Sept. 2024',
              Role: 'Full-stack Developer & Project Lead',
              'Technical Challenges':
                'Integrated complex geospatial calculations with Google Maps API to determine restaurant proximity to routes, optimized API calls to minimize latency and costs',
              'Key Features':
                'Route-based restaurant recommendations, intelligent filtering based on ratings and price, customizable search radius',
              Technologies: [
                { name: 'TypeScript', icon: 'devicon-typescript-plain' },
                { name: 'React', icon: 'devicon-react-original' },
                { name: 'Express', icon: 'devicon-express-original' },
                { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
                { name: 'Google Maps', icon: 'devicon-google-plain' },
              ],
              APIs: 'Google Maps API for route calculation, Yelp API for restaurant data',
              'Development Process':
                'Agile methodology with rapid one-week development cycle and continuous integration',
              'Market Value':
                'Addresses a common pain point for travelers who want quality dining options without significant detours',
            },
            date: 'Sept. 2024',
            duration: '1 week',
          },
          {
            id: 'project4',
            title: 'Spotify Portfolio Website',
            subtitle: 'Angular, TypeScript, SCSS',
            description:
              "A personal portfolio website inspired by Spotify's UI, featuring projects, experience, and education displayed as playlists and tracks.",
            imageUrl: 'assets/images/default-item.jpg',
            link: 'https://github.com/daedal00/PersonalWebsite',
            details: {
              Duration: '2024',
              Technologies: [
                { name: 'Angular', icon: 'devicon-angularjs-plain' },
                { name: 'TypeScript', icon: 'devicon-typescript-plain' },
                { name: 'SCSS', icon: 'devicon-sass-original' },
                { name: 'RxJS', icon: 'devicon-rxjs-original' },
              ],
              Features:
                'Responsive design, music playback, interactive UI, content organization',
              Inspiration:
                "Spotify's interface adapted for professional portfolio presentation",
            },
            date: '2024',
            duration: '2 weeks',
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
              Duration: 'Dec. 2023',
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
            date: 'Dec. 2023',
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
              Duration: 'Nov. 2023',
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
            date: 'Nov. 2023',
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
              Duration: 'Aug. 2023',
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
            date: 'Aug. 2023',
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
              Duration: 'Dec. 2022',
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
            date: 'Dec. 2022',
            duration: '4 weeks',
          },
        ],
      },
      {
        id: 'experience',
        name: 'Work Experience',
        description: 'My professional journey and work history',
        coverImage: 'assets/images/2.png',
        type: PlaylistType.EXPERIENCE,
        items: [
          {
            id: 'exp1',
            title: 'Software Engineer Intern',
            subtitle: 'Savi Finance',
            description:
              'Developed income and expense categorization systems, automated email parsing, and led database migrations in a fast-paced fintech environment.',
            imageUrl: '',
            details: {
              Duration: 'Jan. 2024 - Aug. 2024',
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
            date: 'Jan. 2024 - Aug. 2024',
            duration: '8 months',
          },
        ],
      },
      {
        id: 'education',
        name: 'Education',
        description: 'My academic background and qualifications',
        coverImage: 'assets/images/3.png',
        type: PlaylistType.EDUCATION,
        items: [
          {
            id: 'edu1',
            title:
              'Bachelor of Combined Major in Science (Computer Science + Physics)',
            subtitle: 'University of British Columbia',
            description:
              'Comprehensive education in computer science fundamentals, software engineering, and related disciplines.',
            imageUrl: '',
            details: {
              Degree:
                'Bachelor of Combined Major in Science (Computer Science + Physics)',
              'Expected Graduation': '2025',
              Location: 'Vancouver, BC',
              'Relevant Coursework':
                'Data Structures and Algorithms, Database Systems, Computational Data Science, Intro. Artificial Intelligence, Computer Networking, Reliability and Security, Operating Systems, Computer Systems.',
            },
            date: 'Expected 2025',
            duration: '5 years',
          },
          {
            id: 'edu2',
            title: 'International Baccalaureate Diploma',
            subtitle: 'Pacific Academy',
            description:
              'Internationally recognized high school diploma with rigorous academic program emphasizing critical thinking and global perspective.',
            imageUrl: '',
            details: {
              Diploma: 'International Baccalaureate Diploma',
              'Graduation Year': '2020',
              Location: 'Surrey, BC',
              'Higher Level Courses': 'Biology, English, History',
              'Academic Focus':
                'Sciences and Humanities with international perspective',
              'Program Benefits':
                'Critical thinking, research skills, global awareness, university preparation',
            },
            date: '2018-2020',
            duration: '2 years',
          },
        ],
      },
      {
        id: 'skills',
        name: 'Skills',
        description: 'Technical and professional competencies',
        coverImage: 'assets/images/4.JPG',
        type: PlaylistType.SKILLS,
        items: [
          {
            id: 'skill1',
            title: 'Programming Languages',
            subtitle: 'Technical Skills',
            description:
              'Proficient in various programming languages for different application domains.',
            imageUrl: '',
            details: {
              Technologies: [
                { name: 'Go', icon: 'devicon-go-plain' },
                { name: 'C', icon: 'devicon-c-plain' },
                { name: 'C++', icon: 'devicon-cplusplus-plain' },
                { name: 'JavaScript', icon: 'devicon-javascript-plain' },
                { name: 'TypeScript', icon: 'devicon-typescript-plain' },
                { name: 'Python', icon: 'devicon-python-plain' },
                { name: 'Java', icon: 'devicon-java-plain' },
                { name: 'HTML', icon: 'devicon-html5-plain' },
                { name: 'CSS', icon: 'devicon-css3-plain' },
                { name: 'SQL', icon: 'devicon-mysql-plain' },
                { name: 'Shell', icon: 'devicon-bash-plain' },
              ],
              Languages:
                'Go, C, C++, JavaScript, TypeScript, Python, Java, HTML, CSS, SQL, Shell',
              'Proficiency Level': 'Advanced',
              Applications:
                'Web development, systems programming, data analysis, backend services, microservices architecture',
            },
            date: '',
            duration: '',
          },
          {
            id: 'skill2',
            title: 'Frameworks & Libraries',
            subtitle: 'Technical Skills',
            description:
              'Experience with modern frameworks and libraries for web, backend, and application development.',
            imageUrl: '',
            details: {
              Technologies: [
                { name: 'GraphQL', icon: 'devicon-graphql-plain' },
                { name: 'Node.js', icon: 'devicon-nodejs-plain' },
                { name: 'Express', icon: 'devicon-express-original' },
                { name: 'React', icon: 'devicon-react-original' },
                { name: 'Angular', icon: 'devicon-angularjs-plain' },
                { name: 'Spring Boot', icon: 'devicon-spring-plain' },
                { name: 'Flask', icon: 'devicon-flask-original' },
              ],
              'Web Frameworks': 'React, Angular, Express, Flask, Spring Boot',
              'Backend Technologies': 'Node.js, GraphQL, REST API, gqlgen (Go)',
              'Database & Storage': 'MongoDB, PostgreSQL, Redis, AWS S3',
              Specialization:
                'Full-stack web development, API design, microservices architecture',
            },
            date: '',
            duration: '',
          },
          {
            id: 'skill3',
            title: 'Machine Learning & Data Science',
            subtitle: 'Technical Skills',
            description:
              'Expertise in machine learning algorithms, data analysis, and scientific computing for research applications.',
            imageUrl: '',
            details: {
              Technologies: [
                { name: 'Scikit-learn', icon: 'devicon-sklearn-plain' },
                { name: 'NumPy', icon: 'devicon-numpy-original' },
                { name: 'Pandas', icon: 'devicon-pandas-original' },
                { name: 'Matplotlib', icon: 'devicon-matplotlib-plain' },
                { name: 'Python', icon: 'devicon-python-plain' },
              ],
              'ML Algorithms':
                'Random Forest, SVM, Classification, Regression, Cross-validation',
              'Data Processing':
                'Feature engineering, statistical analysis, data visualization, spatial data analysis',
              'Scientific Libraries':
                'Scikit-learn, NumPy, Pandas, Matplotlib, Seaborn, Astropy',
              'Research Applications':
                'Astrophysics data analysis, cosmic structure classification, SDSS survey data',
              'Specialized Tools':
                'cKDTree for nearest-neighbor calculations, HalvingGridSearchCV for hyperparameter tuning',
              'Performance Metrics':
                'F1 score optimization, precision-recall analysis, model validation',
            },
            date: '',
            duration: '',
          },
          {
            id: 'skill4',
            title: 'DevOps & Cloud Technologies',
            subtitle: 'Technical Skills',
            description:
              'Experience with containerization, orchestration, cloud services, and modern development tools.',
            imageUrl: '',
            details: {
              Technologies: [
                { name: 'Docker', icon: 'devicon-docker-plain' },
                { name: 'Kubernetes', icon: 'devicon-kubernetes-plain' },
                { name: 'Git', icon: 'devicon-git-plain' },
                { name: 'Linux', icon: 'devicon-linux-plain' },
                { name: 'AWS', icon: 'devicon-amazonwebservices-original' },
                { name: 'GitHub', icon: 'devicon-github-original' },
              ],
              Containerization:
                'Docker, Kubernetes orchestration, microservices deployment',
              'Cloud Services':
                'AWS (SNS, SQS, SES, S3), Vercel, serverless functions',
              'Development Tools':
                'Git, Linux (Arch, Wayland), Postman, CI/CD with GitHub Actions',
              'Project Management': 'Jira, Confluence, Agile methodologies',
              'Monitoring & Logging':
                'Prometheus monitoring, structured logging, performance optimization',
            },
            date: '',
            duration: '',
          },
          {
            id: 'skill5',
            title: 'Soft Skills & Domain Knowledge',
            subtitle: 'Professional Attributes',
            description:
              'Strong interpersonal capabilities and specialized knowledge that complement technical expertise.',
            imageUrl: '',
            details: {
              'Technical Communication':
                'Research documentation, technical writing, UML diagrams',
              'Problem Solving':
                'Analytical thinking, optimization strategies, debugging, algorithm design',
              'Project Management':
                'Timeline management, requirement analysis, cross-functional collaboration',
              'Domain Expertise':
                'Astrophysics, cosmic structure analysis, financial technology, system administration',
              'Research Skills':
                'Scientific methodology, data interpretation, statistical validation, peer review process',
              Leadership:
                'Team coordination, technical mentoring, architecture decision-making',
            },
            date: '',
            duration: '',
          },
        ],
      },
    ];
  }
}
