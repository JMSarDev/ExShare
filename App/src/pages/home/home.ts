import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Exam } from '../../models/exam/exam';
import { MenuItem } from '../../models/menu-item/menu-item';
import { ExamProvider } from '../../providers/exam/exam';
import { ExamPage } from '../exam/exam';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  exam: Exam;
  hour: string;
  date: Date;
  menuItem: MenuItem;
  imgDir: string;


  constructor(public navCtrl: NavController, private examService: ExamProvider, private imagePicker: ImagePicker, private toastCtrl: ToastController) {
    this.exam = new Exam();
    this.imgDir = "assets/img/avatar_placeholder.png";
  }

setProfessorImg(){
    this.imagePicker.getPictures({
      maximumImagesCount: 11
    })
    .then(
      results => {
        results.forEach(image => {
          console.log('Image URI: ' + image)
          this.imgDir = image;
        });
      })
    .catch(
      result => {
        this.toastCtrl.create({
        message: 'No tengo permisos para acceder a las imágenes',
        duration: 3000,
        position: 'bottom'
      }).present();
      })
  }

  submitExam() {
    this.exam.date = new Date(this.date);
    var time = this.hour.split(/\:|\-/g);
    this.exam.date.setHours(parseInt(time[0]), parseInt(time[1]));

    this.examService.submitExam(this.exam).subscribe(
      response => {
        this.examService.toggleNewExamFlag();
        this.examService.setActualShareName(this.exam.shareName);
        this.navCtrl.setRoot(ExamPage);
      }
    )

    console.log(this.exam);
  }

}
