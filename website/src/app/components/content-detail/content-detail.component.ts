import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { Content } from '../../models/content.model';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ContentDetailComponent implements OnInit, OnDestroy {
  content: Content | null = null;
  private subscription?: Subscription;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.subscription = this.contentService.selectedContent$.subscribe(
      (content) => {
        this.content = content;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeDetail(): void {
    this.contentService.toggleSidebar(false);
  }

  openExternalLink(): void {
    if (this.content?.link) {
      window.open(this.content.link, '_blank');
    }
  }

  openDocumentationLink(): void {
    if (this.content?.documentationLink) {
      window.open(this.content.documentationLink, '_blank');
    }
  }

  openWallpaperLink(): void {
    if (this.content?.wallpaperLink) {
      window.open(this.content.wallpaperLink, '_blank');
    }
  }

  openReportLink(): void {
    if (this.content?.reportLink) {
      window.open(this.content.reportLink, '_blank');
    }
  }

  openNotebookLink(): void {
    if (this.content?.notebookLink) {
      window.open(this.content.notebookLink, '_blank');
    }
  }

  openImageInNewTab(): void {
    if (this.content?.imageUrl) {
      window.open(this.content.imageUrl, '_blank');
    }
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
