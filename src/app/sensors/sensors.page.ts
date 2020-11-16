import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { ProfilePage } from '../profile/profile.page';
import { EditSensorSettingsComponent } from './edit-sensor-settings/edit-sensor-settings.component';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
})
export class SensorsPage {


  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  ionViewDidEnter() {
    this.createBarChart();
  }


  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['4.00pm', '4.30pm', '5.00pm', '5.30pm'],
        datasets: [{
          data: [22, 25, 30, 20],
          backgroundColor: '#02405800', // array should have same number of elements as number of dataset
          borderColor: ' #024058',// array should have same number of elements as number of dataset
          borderWidth: 2,


        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              // beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        }
      }
    });
  }

  navigateTo(path) {
    this.router.navigate([path]);
  }


  async presentModal(component) {
    if (component === 'edit-sensor') {
      const modal = await this.modalController.create({
        component: EditSensorSettingsComponent,
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
