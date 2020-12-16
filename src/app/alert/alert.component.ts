import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
    selector: "alert",
    templateUrl: './alert.component.html'
})

export class AlertComponent implements OnInit {
    constructor(private aService: ApiService, private activeRoute: ActivatedRoute, private route: Router) {

    }

    message = "";
    user ={};
    ngOnInit() {
        this.message = history.state.message;
    }

    //Logout
    logOut() {
        //Xóa token

        //Về màn login
        this.route.navigateByUrl('')
    }
}