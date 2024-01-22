import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects = [
    { title: 'Project 1', description: 'Description 1', link: 'link-to-project-1' },
    { title: 'Project 2', description: 'Description 2', link: 'link-to-project-2' },
    // Add more projects as needed
  ];

  constructor() { }
}
