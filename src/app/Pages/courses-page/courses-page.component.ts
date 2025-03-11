import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Course {
  name: string;
  price: number;
}

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})

export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchValue: string = '';
  showFilter: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadCourses();
  }

  private loadCourses() {
    this.http.get<Course[]>('/assets/db.json').subscribe(data => {
      this.courses = data;
      this.filteredCourses = [...this.courses];
    });
  }

  onSearch() {
    const value = this.searchValue.trim();
    this.filteredCourses = value ? this.filterCoursesByPrice(value) : [...this.courses];
  }

  private filterCoursesByPrice(value: string): Course[] {
    return this.courses.filter(course => course.price.toString().includes(value));
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  sortCourses(criteria: string) {
    switch (criteria) {
      case 'priceAsc':
        this.filteredCourses.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredCourses.sort((a, b) => b.price - a.price);
        break;
      case 'alphabetic':
        this.filteredCourses.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }
}