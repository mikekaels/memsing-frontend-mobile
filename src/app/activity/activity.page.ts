import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { AddSensorComponent } from './add-sensor/add-sensor.component';
import { EditSensorComponent } from './edit-sensor/edit-sensor.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  navigateTo(event) {
    this.router.navigate([event]);
  }

  async presentModal(component) {
    if (component === 'add-sensor') {
      const modal = await this.modalController.create({
        component: AddSensorComponent,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }
    if (component === 'edit-sensor') {
      const modal = await this.modalController.create({
        component: EditSensorComponent,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }
    if (component === 'profile') {
      const modal = await this.modalController.create({
        component: ProfilePage,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }
  }

}