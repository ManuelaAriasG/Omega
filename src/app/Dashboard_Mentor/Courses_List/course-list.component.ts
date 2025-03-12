import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { CoursesService } from '../../services/courses.service';
import { CardComponent } from '../Cards/card.component';
import { log } from 'console';
import { ActivatedRoute } from '@angular/router';
import { CourseInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-course-list',
  imports: [NgFor, CardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
  courses: CourseInterface[] = [];
  mentorId: number = 0;
  mentor: any;

  constructor(private coursesService: CoursesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        this.mentorId = Number(params['id']);
        // console.log(this.mentorId);
      },
      error: (error) => {
        console.error("Error al obtener los parámetros de la ruta:", error);
      }
    });
    this.coursesService.obtenerMentorConCursos(this.mentorId).subscribe({
      next: (data) => {
        // console.log(data);
        this.courses = data?.cursos || [];
        this.mentor = data?.nombre || '';
      },
      error: (error) => {
        console.error("Error cargando los cursos del mentor:", error);
      }
    });
  }
}


