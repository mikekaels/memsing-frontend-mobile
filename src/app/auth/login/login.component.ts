import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  emailSent = false;
  errorMessage;
  verifyEmail: any;
  successMessage;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    // private userService: UserService,
    public toastController: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: ['', [Validators.required]],
    });
  }

  navigateTo(path) {
    this.router.navigate([path]);
  }

  tryLogin() {
    console.log(this.email, this.password);

    this.authService.doLogin(this.email, this.password)
      .then(res => {
        console.log('@RES: ', res);
        this.errorMessage = "";
        this.presentToast('Login success');
        this.navigateTo('tabs/home');
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
    // this.router.navigate(['/tabs']);
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

  get password() {
    return this.authForm.get('password').value;
  }

}
