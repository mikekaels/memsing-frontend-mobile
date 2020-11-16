import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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

  tryRegister() {
    console.log(this.email, this.password);

    this.authService.doRegister(this.email, this.password)
      .then(res => {
        console.log('@RES: ', res);
        this.errorMessage = "";
        this.presentToast("Your account has been created");
        this.navigateTo('tabs/home');
      }, err => {
        console.log('@ERR: ', err);
        this.presentToast(err.message);
      });
  }

  async onLogin() {

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
