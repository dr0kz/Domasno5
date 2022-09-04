import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter, map} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  courseName: string | undefined
  id = 0
  lessons: string[] = [
    'https://www.youtube.com/embed/Nh7peU1hiT4',
    'https://www.youtube.com/embed/kM0DXP-28DA',
    'https://www.youtube.com/embed/KtRHKm6EA-8',
    'https://www.youtube.com/embed/YkdQJ4dmtyM'
  ]

  safeLessons: SafeResourceUrl[] = []

  selected: SafeResourceUrl | undefined;

  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.safeLessons = this.lessons.map(t => this.sanitizer.bypassSecurityTrustResourceUrl(t))
    this.selected =  this.safeLessons[0]
  }

  count(){
    return Array.from(Array(this.lessons.length).keys())
  }

  lesson(){
    return this.safeLessons.indexOf(this.selected!)
  }

  click(num: number){
    this.selected = this.safeLessons[num]
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      filter(t => t.has('courseId')),
      map(t => +t.get('courseId')!)
    ).subscribe(id => {
      this.id = id
      if (id == 1) {
        this.courseName = 'Master Personal Trainer'
      } else if (id == 2) {
        this.courseName = 'Competition Bodybuilding Trainer'
      }
    })
  }

}
