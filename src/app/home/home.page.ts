import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  navigateTo(path) {
    this.router.navigate([path]);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ProfilePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
