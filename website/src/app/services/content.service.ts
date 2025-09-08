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
            id: 'exp2',
            title: 'Software Engineer (Part-time)',
            subtitle: 'ConnectPie – Cloud integration for restaurants',
            description:
              'Designed and implemented a multi-tenant order delivery system that bridges Ecwid e-commerce platform with legacy Windows XP-based POS systems, ensuring real-time takeout order delivery with zero data loss for local restaurants',
            imageUrl: '',
            details: {
              Duration: 'July 2025 - Present',
              Location: 'Port Coquitlam, BC',
              'Company Overview':
                'ConnectPie integrates modern cloud services with legacy POS systems for local restaurants, enabling them to process online takeout orders without manual intervention',
              Technologies: [
                { name: 'Python', icon: 'devicon-python-plain' },
                { name: 'FastAPI', icon: 'devicon-fastapi-plain' },
                { name: 'AWS', icon: 'devicon-amazonwebservices-plain' },
                { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
                { name: 'Pulumi', icon: 'devicon-pulumi-plain' },
                { name: 'Docker', icon: 'devicon-docker-plain' },
              ],
              'Key Contributions': [
                'Designed a multi-tenant order delivery system that receives Ecwid webhooks in AWS, persists them in PostgreSQL, and delivers them via polling agents to on-prem POS machines',
                'Implemented REST APIs in FastAPI for webhook ingestion, order persistence, and POS agent polling with long-polling and ACK semantics for reliable delivery',
                'Provisioned AWS resources (API Gateway, Lambda, RDS) using Pulumi as Infrastructure-as-Code for reproducible deployments and cost-efficient scaling',
                'Built fault tolerance features including order queuing for offline POS agents, retry mechanisms, and "effectively once" delivery semantics',
                'Authored comprehensive Confluence documentation covering architecture decisions, system diagrams, and scaling strategies',
              ],
              'Technical Impact':
                'Enabled restaurants using legacy POS systems to process online takeout orders without manual intervention, with zero-loss delivery guarantee even during connectivity issues',
              'System Architecture':
                'Created a scalable solution supporting restaurants with different POS setups while guaranteeing reliability through idempotent delivery state tracking',
            },
            date: 'July 2025 - Present',
            duration: 'Ongoing',
          },
          {
            id: 'exp1',
            title: 'Software Engineer Intern',
            subtitle: 'Savi Finance – Fintech startup (1.7k users)',
            description:
              'Launched core categorization features, automated transaction-email ingestion with AWS and OpenAI, and led zero-downtime database migrations at Savi Finance, a fintech startup offering AI-powered personal finance tools that help users track spending, set financial goals, and sync accounts from 15,000+ institutions with bank-grade encryption and real-time updates',
            imageUrl: '',
            details: {
              Duration: 'January 2024 - August 2024',
              Location: 'Remote',
              'Company Overview':
                'Savi Finance (financesavi.com) is a fintech startup offering AI-powered personal finance tools that help users track spending, set and achieve financial goals, and sync accounts from 15,000+ institutions with bank-grade encryption and real-time updates',
              Technologies: [
                { name: 'TypeScript', icon: 'devicon-typescript-plain' },
                { name: 'GraphQL', icon: 'devicon-graphql-plain' },
                { name: 'Node.js', icon: 'devicon-nodejs-plain' },
                { name: 'Nx Remote', icon: 'devicon-nixos-plain' },
              ],
              'Key Achievements': [
                'Launched a core income/expense categorization feature in 7 days, enabling product team to ship ahead of schedule and meet customer expectations',
                'Automated transaction-email ingestion pipeline with AWS (SES, SNS, SQS) and OpenAI 4o-mini, improving data consistency for 400+ users and eliminating manual categorization steps (~35 sec saved per email)',
                'Led an 8-step, zero-downtime database migration, ensuring uninterrupted service across all financial platforms',
                'Verified GraphQL microservice endpoints using Playground, curl & MongoDB Compass, implemented Jest smoke tests to catch regressions before production, boosting release confidence',
                'Authored three Agile-ready technical specifications (API design, workflow automation, categorization logic) alongside PMs, designers, and consultants to accelerate releases',
              ],
              'Technical Impact':
                'Delivered production-ready features that improved user experience for 1.7k+ users while maintaining system reliability and data integrity',
              'Cross-functional Collaboration':
                'Worked closely with product managers, designers, and consultants to translate business requirements into technical specifications and deliverables',
            },
            date: 'January 2024 - August 2024',
            duration: '8 months',
          },
        ],
      },
    ];
  }
}
