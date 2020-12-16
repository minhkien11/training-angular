import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

interface responseData {
    message: string,
    data: {
        token: "",
        userId: ""
    }
}

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    constructor(private aService: ApiService, private route: Router) {
    }

    loginId = "";
    password = "";
    errorMess = "";

    //Login
    onLogin() {
        this.aService.login<responseData>(this.loginId, this.password)
            .subscribe(data => {
                if (data.data.token) {
                    this.route.navigateByUrl('/list')
                }
                this.loginId = "";
                this.password = "";
                this.errorMess = data.message.substring(0, 140);
            })
    }
}