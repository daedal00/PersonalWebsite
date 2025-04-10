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

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
