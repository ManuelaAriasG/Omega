import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { CourseContentService } from '../../services/students-dashboard-services/course-content.service';
import { CourseContent } from '../../interfaces/students-dashboard-interfaces/course-content.interface';

@Component({
  selector: 'course-content',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss',
})
export class CourseContentComponent implements OnInit {
  protected visible = false;
  public courseContent: CourseContent[] = [];

  constructor(
    private courseContentService: CourseContentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.courseContentService.getCourseContent().subscribe((data) => {
      this.courseContent = data;
    });
  }

  // Show content
  selectedContent: string = '';
  showContent(section: string) {
    this.selectedContent = section;
  }

  // Show video
  getVideoUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
