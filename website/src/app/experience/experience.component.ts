import { Component } from '@angular/core';

interface Job {
  title: string;
  company: string;
  companyLink: string;
  period: string;
  responsibilities: string[];
  skills: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  job: Job = {
    title: 'Software Engineer Intern',
    company: 'Savi Finance',
    companyLink: 'https://savifinance.com',
    period: 'Jan. 2024 - Sep. 2024',
    responsibilities: [
      'Delivered an income and expense categorization system in just 7 days, contributing to a successful product release ahead of the scheduled launch date.',
      'Automated transaction email parsing and categorization using AWS services (SNS, SQS, SES) and OpenAI 4o-mini, reducing customer workload by 35 seconds and enhancing data flow for over 400 users.',
      'Led an 8-step, zero-downtime database migration, ensuring uninterrupted service across all financial platforms.',
      'Architected 3 technical documents for automating transaction processes and categorization systems, collaborating with product managers, designers, and technical consultants for strategic planning.',
    ],
    skills: ['TypeScript', 'GraphQL', 'Node.js', 'Nx', 'AWS'],
  };
}
