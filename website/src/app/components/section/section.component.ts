import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Section, Content } from '../../models/content.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class SectionComponent implements OnInit {
  section: Section | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const sectionId = params['id'];
      if (sectionId) {
        this.loadSection(sectionId);
      }
    });
  }

  private loadSection(sectionId: string): void {
    const foundSection = this.contentService.getSection(sectionId as any);
    this.section = foundSection || null;
    if (this.section) {
      this.contentService.selectSection(sectionId);
      localStorage.setItem('lastVisitedSection', sectionId);
    }
  }

  selectContent(content: Content): void {
    this.router.navigate(['/item', content.id]);
  }

  goBack(): void {
    this.location.back();
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    return dateString;
  }

  getContentKeys(details: Record<string, any>): string[] {
    if (!details) return [];
    return Object.keys(details);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
