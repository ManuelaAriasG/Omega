import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MoreCoursesService } from './services/more-courses.service';
import { Courses } from './interfaces/more-courses.interface';

@Component({
  selector: 'more-courses',
  imports: [RouterModule, CommonModule],
  templateUrl: './more-courses.component.html',
  styleUrl: './more-courses.component.scss',
})
export class MoreCoursesComponent implements OnInit {
  public moreCourses: Courses[] = [];

  constructor(private moreCoursesService: MoreCoursesService) {}

  ngOnInit(): void {
    this.moreCoursesService
      .getMoreCourses()
      .subscribe((data) => (this.moreCourses = data));
  }
}
