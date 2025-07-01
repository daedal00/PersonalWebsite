import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ContentService } from '../services/content.service';
import { Section } from '../models/content.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class HomeComponent implements OnInit {
  sections: Section[] = [];

  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit(): void {
    this.sections = this.contentService.getSections();
  }

  navigateToSection(sectionId: string): void {
    this.contentService.selectSection(sectionId);
    this.router.navigate(['/section', sectionId]);
  }
}
