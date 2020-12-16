import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../user.model';

interface responseData {
    message: string,
    data: {}
}

@Component({
    selector: "detail",
    templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit {
    constructor(private aService: ApiService, private activeRoute: ActivatedRoute, private route: Router) {

    }

    user: User = {
        ID: 0,
        Name: "",
        Email: "",
        Tel: ""
    };

    errorMess = "";

    ngOnInit() {

        //Lấy thông tin từ param
        this.activeRoute.paramMap
            .subscribe(param => {
                let id = param.get('id');
                this.aService.getDetail<responseData>(id!)
                    .subscribe(data => {
                        this.user = new User(data.data);
                    })
            });
    }

    //Edit
    onEditClick() {

        this.errorMess = "";
        let isError = false;

        if (!this.validateEmail(this.user.Email) || !this.user.Email) {
            isError = true;
            this.errorMess += " Email";
        }

        if (!this.validateTel(this.user.Tel) || !this.user.Tel) {
            isError = true;
            this.errorMess += " Tel";
        }
        if (!this.user.Name) {
            isError = true;
            this.errorMess += " Name";
        }

        if (!isError) {
            this.user.Name = this.stripHtml(this.user.Name);
            this.route.navigateByUrl('/confirm/Edit', { state: { user: this.user } })
        }
        else
            this.errorMess = "Lỗi các trường dữ liệu:" + this.errorMess;

    }

    //Các hàm kiểm tra dữ liệu
    validateEmail(email: string) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    validateTel(tel: string) {
        var re = /^([\d]{1,4})\-([\d]{1,4})\-([\d]{1,4})$/;
        return re.test(tel);
    }

    stripHtml(text: string) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = text;
        return tmp.textContent || tmp.innerText || "";
    }

    //Logout
    logOut() {
        //Xóa token

        //Về màn login
        this.route.navigateByUrl('')
    }
}