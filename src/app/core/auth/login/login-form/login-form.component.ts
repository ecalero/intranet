import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@data/servicios/api/auth.service';

@Component({
    selector: 'app-login-form, [app-login-form]',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
    public loginForm : FormGroup;
    public loginSubmitted = false;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private location: Location,
        private router: Router
    ) {
        this.loginForm = this.formBuilder.group({
            correo: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        // tslint:disable-next-line: max-line-length
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    ),
                ],
            ],
            clave: ['', [Validators.required, Validators.maxLength(10)]],
        });
    }

    get fm() {
        return this.loginForm.controls;
    }

    authenticate() {
      console.log("estoy aqui");
        this.loginSubmitted = true;
        if (!this.loginForm.valid) {
          console.log("estoy aqui validado");
            return;
        }
        // console.log('authenticated', this.loginForm.value);
        this.authService.login(this.loginForm.value).subscribe(r => {
            // Show error
            console.log("estoy en el servicio ---> despues de enviar la data");
            console.log(r);
            if (r.success) {
                this.location.replaceState('/'); // clears browser history so they can't navigate with back button
                this.router.navigate(['intranet']);
            }else{

            }
        });
    }
}
