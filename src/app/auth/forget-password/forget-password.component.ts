import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {

  authForm: FormGroup;
  emailSent = false;
  errorMessage = '';
  verifyEmail: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    // private userService: UserService,
    public toastController: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ''
    });
  }

  navigateTo(path) {
    this.router.navigate([path]);
  }

  tryResetPassword() {
    console.log(this.email);

    this.authService.doResetPassword(this.email)
      .then(res => {
        console.log('@RES: ', res);
        this.errorMessage = "";
        this.presentToast('Link has been sent, please check your email');
      }, err => {
        console.log('@ERR: ', err);
        this.errorMessage = err.message;
        this.presentToast(err.message);
      });
  }

  async onLogin() {
    // const body = {
    //   email: this.email.value,
    //   password: this.password.value
    // };

    // const result: any = await this.userService.login(body);
    // console.log('RESULT: ', result);
    // if (result.success == false) {
    //   this.presentToast(result.error);
    // }

    // if (result.success == true) {
    //   await this.presentToast('Berhasil Login');
    //   localStorage.setItem('user', JSON.stringify(result.data));
    this.router.navigate(["/tabs/home"]);
    // }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  get email() {
    return this.authForm.get('email').value;
  }
}
