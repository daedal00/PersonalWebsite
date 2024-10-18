import { Component } from '@angular/core';

interface Project {
  title: string;
  shortDescription: string;
  fullDescription: string[];
  technologies: string[];
  icon: string;
  darkModeIcon?: string;
  projectLink?: string;
  repoLink?: string;
  documentationLink?: string;
  expanded: boolean;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Personal Portfolio Website',
      shortDescription:
        'A responsive, modern portfolio showcasing my projects and skills',
      fullDescription: [
        'Designed and developed a responsive single-page application using Angular and TypeScript',
        'Implemented a custom dark mode feature with smooth transitions between light and dark themes',
        'Created reusable components for projects, experience, and skills sections to ensure maintainability',
        'Utilized CSS variables and SCSS for consistent styling and easy theme customization',
        'Integrated Bootstrap for responsive design and custom styling for a unique look',
        'Implemented smooth scrolling and interactive elements to enhance user experience',
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Bootstrap', 'HTML5'],
      icon: 'bi-person-badge',
      projectLink: 'https://samuelyongkim.com/',
      repoLink: 'https://github.com/daedal00/PersonalWebsite',
      expanded: false,
    },
    {
      title: 'FoodTalk',
      shortDescription: 'A dynamic social platform for food enthusiasts',
      fullDescription: [
        'Led the development of core features such as user authentication, post creation, and profile management.',
        'Optimized SQL queries, reducing database query time by 20%.',
        'Collaborated in a team of 3 to design, test, and launch the platform within 6 weeks using Agile methodology.',
        'Authored comprehensive documentation including testing procedures, app functionality, and UML diagrams.',
      ],
      technologies: ['PHP', 'CSS', 'HTML', 'SQL', 'Oracle'],
      icon: 'bi-chat-square-text',
      projectLink: 'https://www.students.cs.ubc.ca/~samuelk2/project/login.php',
      repoLink: 'https://github.com/daedal00/FoodTalk',
      documentationLink: 'assets/foodtalk_documentation.pdf',
      expanded: false,
    },
    {
      title: 'BudgetView',
      shortDescription:
        'A full-stack finance app with real-world bank account integration',
      fullDescription: [
        'Spearheaded the development in 8 weeks, integrating MongoDB and Plaid API for secure bank account connections.',
        'Developed RESTful APIs with OAuth 2.0 for user management.',
        'Implemented CRUD operations for transaction and account management.',
        'Built a scalable backend architecture with Spring Boot, optimizing API response times.',
      ],
      technologies: ['Java Spring Boot', 'React', 'MongoDB', 'PlaidAPI'],
      icon: 'bi-piggy-bank',
      repoLink: 'https://github.com/daedal00/Finance-App',
      expanded: false,
    },
    {
      title: 'RecipeScout',
      shortDescription: 'A recipe search app with dynamic web scraping',
      fullDescription: [
        'Engineered an app that scrapes recipes from AllRecipes.com based on user-input ingredients.',
        'Accelerated search speed by 15% through asynchronous web scraping and multi-threading.',
        'Designed a responsive, user-friendly interface for both desktop and mobile users.',
        'Enhanced accessibility and user experience across different screen sizes.',
      ],
      technologies: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript'],
      icon: 'bi-search',
      repoLink: 'https://github.com/daedal00/AllTheRecipe-Grabber',
      expanded: false,
    },
  ];

  toggleProject(project: Project): void {
    project.expanded = !project.expanded;
  }

  openDocumentation(link: string): void {
    window.open(link, '_blank');
  }
}
