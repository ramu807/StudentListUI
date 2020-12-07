import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { Student } from '../Model/students';
import { StudentServiceService } from './services/student-service.service';
import { Students } from '../Model/StudentsList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  csvRecords: any[] = [];
  header: boolean = true;
  students: Students;
  response: Students;
  lenth: number;

  constructor(private ngxCsvParser: NgxCsvParser, 
    private stuService: StudentServiceService) {
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: any) => {
        console.log('Result', result);
        this.csvRecords = result;
        this.lenth = this.csvRecords.length;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });                
  }

  Save(csvRecords: Array<Student>)
  {
    var studentss = new Students();
    studentss.Students = [];
    csvRecords.forEach(item => {
      var students = new Student();
      students.Name = item.Name;
      students.age = item.age;
      students.city = item.city;   
      

      studentss.Students.push(students);
      this.students = studentss;
    })
     this.stuService.saveStudents(this.students).subscribe(data => {
      this.response = data});
  }

}