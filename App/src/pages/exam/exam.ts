import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { ExamProvider } from '../../providers/exam/exam';
import { Exam } from '../../models/exam/exam';

/**
 * Generated class for the ExamPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-exam',
  templateUrl: 'exam.html',
})
export class ExamPage {

  exam: Exam;

  constructor(public navCtrl: NavController, public navParams: NavParams, private examProvider: ExamProvider, private imagePicker: ImagePicker, private toastCtrl: ToastController) {

    this.examProvider.getExam().subscribe(
      data => this.exam = data
    );
  }

  removeExam() {
    this.examProvider.removeExam(this.exam.shareName).subscribe(
      response => {
        this.examProvider.toggleNewExamFlag();

        this.toastCtrl.create({
          message: 'El examen se ha eliminado, podrás seguir accediendo hasta que cambies de vista',
          duration: 3000,
          position: 'bottom'
        }).present();
      });
  }

  getPictures() {

    this.imagePicker.hasReadPermission()
      .catch(
      reason => this.imagePicker.requestReadPermission().then(
        result => this.getPicturesFromPicker()
      )
      )
      .then(
      result => this.getPicturesFromPicker()
      )
  }

  getPicturesFromPicker() {
    this.imagePicker.getPictures({
      maximumImagesCount: 10
    }).then(
      results => {
        results.forEach(image => {
          console.log('Image URI: ' + image)
        });
      }
      )
  }

}
