import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { Exam } from '../../models/exam/exam';
import 'rxjs/add/operator/map';

/*
  Generated class for the ExamProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ExamProvider {

  resultExam: Exam;
  actualShareName: String;
  connectionString: String;
  newExamSource: Subject<Boolean>;

  newExam$: Observable<Boolean>;

  constructor(public http: Http) {
    this.connectionString = 'http://localhost:63763/api';
    this.newExamSource = new Subject<Boolean>();
    this.newExam$ = this.newExamSource.asObservable();

  }

  getExamList() : Observable<Array<Exam>> {
      return this.http.get(this.connectionString+'/exams')
        .map((res:Response) => res.json());
  }

  getExam() : Observable<Exam> {
    return this.http.get(this.connectionString+'/exams/' + this.getActualShareName())
      .map((res:Response) => res.json())
  }

  submitExam(exam: Exam) : Observable<Response> {
    return this.http.post(this.connectionString+'/exams/', exam);
  }

  setActualShareName (newShareName: String){
    this.actualShareName = newShareName;
  }

  getActualShareName () : String {
    return this.actualShareName;
  }

  toggleNewExamFlag (){
    this.newExamSource.next(!this.newExamSource);
  }

  removeExam (newShareName: String) {
    return this.http.delete(this.connectionString+'/deleteExam/'+newShareName)
  }

}
