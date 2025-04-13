// students.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'students',  // This is the tag that will be used in the template
  template: `
    <h1>Student View</h1>
    <h2>{{ getTitle() }} - Current Date: {{ getCurrentDate() }}</h2>
  `
})
export class StudentsComponent {
  title = 'My List of students';

  getTitle() {
    return this.title;
  }

  getCurrentDate() {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  }
}
