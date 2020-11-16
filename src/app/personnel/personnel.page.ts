import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.page.html',
  styleUrls: ['./personnel.page.scss'],
})
export class PersonnelPage implements OnInit {

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  navigateTo(path) {
    this.router.navigate([path]);
  }

  async presentModal(component) {

    if (component === 'profile') {
      const modal = await this.modalController.create({
        component: ProfilePage,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }
  }
}
