import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../models/content.model';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class ContentDetailComponent implements OnInit, OnDestroy {
  content: Content | null = null;
  previousRoute: string = 'Index';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Determine back button text based on localStorage or referrer
    const lastVisitedSection = localStorage.getItem('lastVisitedSection');
    const referrer = document.referrer;

    if (lastVisitedSection) {
      // Capitalize first letter of section name
      this.previousRoute =
        lastVisitedSection.charAt(0).toUpperCase() +
        lastVisitedSection.slice(1);
    } else if (referrer.includes('/section/')) {
      // Extract section name from referrer URL
      const sectionMatch = referrer.match(/\/section\/([^\/]+)/);
      if (sectionMatch) {
        const sectionName = sectionMatch[1];
        this.previousRoute =
          sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
      } else {
        this.previousRoute = 'Index';
      }
    } else {
      this.previousRoute = 'Index';
    }

    this.route.params.subscribe((params) => {
      const contentId = params['id'];
      if (contentId) {
        this.loadContent(contentId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadContent(contentId: string): void {
    this.contentService.selectContent(contentId);
    this.contentService.selectedContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((content) => {
        this.content = content;
      });
  }

  goBack(): void {
    this.location.back();
  }

  getBackButtonText(): string {
    return this.previousRoute || 'back';
  }

  shouldHideSection(key: string, value: any): boolean {
    // Hide sections that are just text without actual links or meaningful content
    if (
      key === 'Documentation' &&
      typeof value === 'string' &&
      !value.startsWith('http')
    ) {
      return true;
    }

    // Hide overly long sections that don't add value
    if (typeof value === 'string' && value.length > 300) {
      return true;
    }

    // Hide sections with generic or redundant information
    const redundantSections = ['Project Type', 'Business Value'];
    if (redundantSections.includes(key)) {
      return true;
    }

    return false;
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  getContentKeys(details: Record<string, any>): string[] {
    if (!details) return [];
    return Object.keys(details);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    return dateString;
  }
}
