import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { switchMap } from 'rxjs';

import { MoreCoursesService } from '../../../services/students-dashboard-services/more-courses.service';
import { Courses } from '../../../interfaces/students-dashboard-interfaces/more-courses.interface';

@Component({
  selector: 'courses-details',
  imports: [CommonModule],
  templateUrl: './courses-details.component.html',
  styleUrl: './courses-details.component.scss',
})
export class CoursesDetailsComponent {
  public moreCourses?: Courses;

  constructor(
    private moreCoursesService: MoreCoursesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.moreCoursesService.getCourseById(id)))
      .subscribe((course) => {
        if (!course) return this.router.navigate(['more-courses']);

        this.moreCourses = course;
        return;
      });
  }
}
