import { Component, ElementRef, ViewChild } from '@angular/core';
import { Project } from './projects.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  @ViewChild('projectModal') projectModal!: ElementRef;

  projects: Project[] = [
    {
      title: 'FoodTalk',
      description: 'Collaborated on developing "Food Talk", a dynamic social platform for local food enthusiasts. The project involved user authentication, post creation, commenting, and profile management. Emphasized database optimization using SQL and Oracle for efficient data handling and swift retrieval processes. Focused on designing responsive user interfaces and maintained comprehensive documentation throughout the project.',
      technologies: ['HTML/CSS', 'PHP', 'SQL', 'Oracle'],
      imageUrl: 'assets/foodtalk.png', 
      link: 'https://www.students.cs.ubc.ca/~samuelk2/project/login.php',
      documentationLink: 'assets/foodtalk_documentation.pdf'
    },
    {
      title: 'Personal Finance App',
      description: 'Developed a full-stack financial application integrating MongoDB and PlaidAPI. Implemented RESTful APIs for user management processes, including registration and authentication. The application features CRUD operations for transaction and account management, utilizing Spring Boot for a scalable backend architecture.',
      technologies: ['Java SpringBoot', 'React', 'MongoDB', 'PlaidAPI'],
      imageUrl: 'assets/pie.png',  // Replace with actual image path
      link: 'https://github.com/daedal00/Finance-App',  // Actual link to FoodTalk
    },
    {
      title: 'AllTheRecipe Grabber',
      description: 'Engineered a recipe search application with real-time data scraping from AllRecipes.com. Employed Docker for backend containerization to ensure scalability and consistent deployment. The application provides a seamless recipe searching experience with a user-friendly interface and efficient backend processes.',
      technologies: ['Python', 'Flask', 'HTML/CSS', 'Javascript'],
      imageUrl: 'assets/foodtalk.png', 
      link: 'https://github.com/daedal00/AllTheRecipe-Grabber',
    },
    {
      title: 'Maplestory Cubing Simulator',
      description: 'Created a Java-based simulation application that replicates the cubing process from the MMORPG, Maplestory. The project includes CRUD operations with JSON persistence, an event logging system for user actions, and robust JUnit testing to ensure error-free functionality.',
      technologies: ['Java', 'IntelliJ', 'Java Swing', 'JUnit'],
      imageUrl: 'assets/foodtalk.png', 
      link: 'https://github.com/daedal00/Maplestory-Cubing-Simulator',
    },
    {
      title: 'Destination Diner',
      description: 'A unique application that recommends restaurants along a specified route. Users input their starting point and destination, and the application suggests eateries within a certain radius of the route. Developed using Python, it integrates with Google Maps for route calculation and Yelp for fetching restaurant details.',
      technologies: ['Google Maps/Yelp API', 'Python'],
      imageUrl: 'assets/foodtalk.png', 
      link: 'https://github.com/daedal00/destination_diner',
    },
    {
      title: 'Pomodoro Timer',
      description: 'Simple Pomodoro Timer Project as I am a frequent user of this study method while studying for school.',
      technologies: ['Java', 'Java Swing'],
      imageUrl: 'assets/foodtalk.png', 
      link: 'https://github.com/daedal00/PomodoroTimer',
    },
    // ... other projects with details from your resume
  ];

  selectedProject: Project | null = null;

  constructor() {}

  selectProject(project: Project): void {
    this.selectedProject = project;
    // Trigger the modal to open
    ($(this.projectModal.nativeElement) as any).modal('show');
  }

  closeModal(): void {
    ($(this.projectModal.nativeElement) as any).modal('hide');
  }
  
}
