import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CourseInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseDetailService {
  private Urlcursos = '/assets/courses.json';

  constructor(private http: HttpClient) { }

  obtenerDetallesCurso(mentorId: number, courseId: number): Observable<CourseInterface> {
    return this.http.get<CourseInterface[]>(this.Urlcursos).pipe(
      map((users) => this.filtrarCursoPorMentorYIdCurso(users, mentorId, courseId))
    )
  }

  private filtrarCursoPorMentorYIdCurso(users: CourseInterface[], mentorId: number, courseId: number): any {
    console.log(users);
    console.log(mentorId);
    console.log(courseId);
    const detalleC = users.find((mentor) => mentor.id === mentorId);
    if (users) {
      //   const curso = mentor.curso.find((curso: CourseInterface) => curso.id === courseId);
      //   if (curso) {
      //     return { 
      //       curso
      //     }
      //   }
    }
    return null
  }
}
