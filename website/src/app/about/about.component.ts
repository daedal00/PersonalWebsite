import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  skills = {
    languages: [
      'C',
      'C++',
      'JavaScript',
      'TypeScript',
      'HTML',
      'CSS',
      'SQL',
      'Python',
      'Java',
    ],
    frameworks: ['Node.js', 'Express', 'React', 'Spring Boot', 'Flask'],
    librariesAndApis: [
      'GraphQL',
      'REST API',
      'MongoDB',
      'Mongoose',
      'JSON-RPC',
      'Nx',
      'Styled-Components',
    ],
    tools: [
      'Git',
      'Linux',
      'Postman',
      'Docker',
      'Jira',
      'Confluence',
      'GitHub',
      'AWS',
    ],
  };

  contactInfo = {
    phone: '(778) 953-2568',
    email: 'samuelk2@student.ubc.ca',
    linkedin: 'linkedin.com/in/samuelkim019',
    github: 'daedal00',
  };
}
