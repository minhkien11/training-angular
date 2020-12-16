import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

interface responseData {
    message: string,
    data: {}
}

@Component({
    selector: "confirm",
    templateUrl: './confirm.component.html'
})

export class ConfirmComponent implements OnInit {

    constructor(private aService: ApiService, private activeRoute: ActivatedRoute, private route: Router) {

    }

    action = "";
    user: any = {};
    mess = "";

    ngOnInit() {
        //Lấy thông tin user và tên chức năng từ param
        this.user = history.state.user;
        this.activeRoute.paramMap.subscribe(param => {
            this.action = param.get('action')!;
        })
        switch(this.action) {
            case "Create": {
                this.mess = "Tạo mới user: " + this.user.Name;
                break;
            }
            case "Edit": {
                this.mess = "Cập nhật thông tin user: " + this.user.Name;
                break;
            }
            case "Delete": {
                this.mess = "Xóa thông tin user: " + this.user.Name;
                break;
            }
        }
    }

    onAccept() {
        switch (this.action) {
            case "Create": {
                //Tạo mới
                this.aService.createNew<responseData>(this.user)
                    .subscribe(data => {
                        this.route.navigateByUrl('/alert', { state: { message: data.message } })
                    })
                break;
            }
            case "Edit": {
                //Cập nhật
                this.aService.editExist<responseData>(this.user)
                    .subscribe(data => {
                        this.route.navigateByUrl('/alert', { state: { message: data.message } })
                    })
                break;
            }
            case "Delete": {
                //Xóa
                this.aService.deleteExist<responseData>(this.user.ID)
                    .subscribe(data => {
                        this.route.navigateByUrl('/alert', { state: { message: data.message } })
                    })
                break;
            }
        }
    }

    //Logout
    logOut() {
        //Xóa token

        //Về màn login
        this.route.navigateByUrl('')
    }
}