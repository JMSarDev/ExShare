export class Exam {

  name: String;
  date: Date;
  professor: String;
  professorImg: String;
  location: String;
  shareName: String;
  files: Array<String>;

  constructor(name: String = "", date: Date = new Date(Date.now()), professor: String = "", professorImg: String = "",
              location: String = "", shareName: String = "", files: Array<String> = null) {
    this.name = name;
    this.date = date;
    this.professor = professor;
    this.professorImg = professorImg;
    this.location = location;
    this.shareName = shareName;
    this.files = files;
  }
  
}