import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter, map} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import jsPDF from 'jspdf';

// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// @ts-ignore
import htmlToPdfmake from 'html-to-pdfmake';
import {LocalService} from "../../local.service";

@Component({
  selector: 'app-exam',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  courseName: string | undefined
  formGroup!: FormGroup
  visible = true
  result = 0
  id = 0
  name: string = ''
  pdf = ''

  constructor(private localStorage: LocalService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
  }

  count() {
    return Array.from(Array(4).keys())
  }

  passed(){
    return this.result >= 66
  }

  generateCertificate(){
    this.pdf = htmlToPdfmake('<h1 style="text-align: center">CERTIFICATE</h1>'+
      `Program name: ${this.courseName} `+
      `<h5>This certificate is proudly awarded to ${this.name} </h5>`);
    if(this.result >= 66){
      let cp = this.localStorage.getData('coursesPassed')
      if(cp != null){
        let parsed: {
          name: string,
          pdf: string
        }[] = JSON.parse(cp)
        if(parsed.find(t => t.name == this.courseName) == null){
          parsed.push({name: this.courseName!, pdf: this.pdf})
        }
        this.localStorage.saveData('coursesPassed', JSON.stringify(parsed))
      }else{
        let passed = {
          name: this.courseName,
          pdf: this.pdf
        }
        this.localStorage.saveData('coursesPassed', JSON.stringify([passed]))
      }
    }
    const documentDefinition = { content: this.pdf };
    pdfMake.createPdf(documentDefinition).open();
  }

  onSubmit() {
    let correctAnswers = 0
    for (const [k, v] of Object.entries(this.formGroup.value)) {
      if (v != null && v == 1) {
        correctAnswers++
      }
    }
    this.result = Math.round(correctAnswers * 100 / 3)
    this.visible = false
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      question1: null,
      question2: null,
      question3: null
    });
    this.activatedRoute.paramMap.pipe(
      filter(t => t.has('testId')),
      map(t => +t.get('testId')!)
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
