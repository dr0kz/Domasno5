import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CoursesComponent} from "./components/courses/courses.component";
import {CourseDetailsComponent} from "./components/course-details/course-details.component";
import {TestComponent} from "./components/test/test.component";
import {CertificatesComponent} from "./components/certificates/certificates.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'courses/:courseId',
    component: CourseDetailsComponent
  },
  {
    path: 'test/:testId',
    component: TestComponent
  },
  {
    path: 'certificates',
    component: CertificatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
