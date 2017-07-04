import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from 'ng2-translate';
import { MenuItem } from '../models/menu-item/menu-item';

import { HomePage } from '../pages/home/home';
import { ExamPage } from '../pages/exam/exam';
import { ListPage } from '../pages/list/list';

import { ExamProvider } from '../providers/exam/exam';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

   pages: Array<MenuItem>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
              private http:Http, private translate: TranslateService, private examProvider: ExamProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    translate.setDefaultLang('en');
    translate.use('en')
    // used for an example of ngFor and navigation
    this.pages = new Array<MenuItem>();
    this.pages.push(new MenuItem('Añadir Examen', HomePage, ""));

    this.refreshExams();

    examProvider.newExam$.subscribe(
      isNewExam => {
        if (isNewExam == true) {
          this.refreshExams();
          examProvider.toggleNewExamFlag();
        }
      } 
    )

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  refreshExams (){

    this.pages.splice(1);
    this.examProvider.getExamList().subscribe(
      examList => {
        examList.forEach(exam => {
          this.pages.push(new MenuItem(exam.name, ExamPage, exam.shareName));
        });
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.examProvider.setActualShareName(page.shareName);
    this.nav.setRoot(page.component);
  }

  changeLanguage() {
    if (this.translate.currentLang == "en") {
      this.translate.use("es");
    } else {
      this.translate.use("en");
    }
  }
}
