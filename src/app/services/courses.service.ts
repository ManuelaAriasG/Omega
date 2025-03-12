import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CourseInterface, UserInterface } from '../interfaces/user.interface';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private Urlcursos = '/assets/courses.json';

  constructor(private http: HttpClient) { }

  obtenerMentorConCursos(mentorId: number): Observable<UserInterface | null> {
    let cursos = this.http.get<UserInterface[]>(this.Urlcursos).pipe(
      map((users) => this.filtrarCursosPorMentor(users, mentorId))
    );
    return cursos;
  }

  private filtrarCursosPorMentor(users: UserInterface[], mentorId: number): UserInterface | null {
    const mentor = users.find((user) => user.mentorId == mentorId);
    // console.log(mentor);
    if (mentor) {
      return mentor;
    }
    return null;
  }

  getMentorIdFromSession(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.Urlcursos);
  }
}
