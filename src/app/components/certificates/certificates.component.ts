import {Component, OnInit} from '@angular/core';
import {LocalService} from "../../local.service";
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  certificates: {name: string, pdf: string}[] = []

  constructor(private localStorage :LocalService) { }

  openPdf(pdf: string){
    const documentDefinition = { content: pdf };
    pdfMake.createPdf(documentDefinition).open();
  }

  ngOnInit(): void {
    let s = this.localStorage.getData('coursesPassed')
    if(s != null){
      this.certificates = JSON.parse(s)
    }
  }

}
