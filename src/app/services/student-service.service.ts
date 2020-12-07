  
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Students } from '../../Model/StudentsList';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(private http: HttpClient) { }

  saveStudents(Students: Students): Observable<any>
  {
   return this.http.post('https://localhost:44363/api/StudentsLists',Students,{
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })});
  }
}
