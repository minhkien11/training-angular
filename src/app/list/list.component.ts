import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user.model';
import { Router, ActivatedRoute } from '@angular/router';

interface responseData {
    message: string,
    data: {
        page: number,
        totalPage: number,
        items: []
    }
}

@Component({
    selector: "list",
    templateUrl: './list.component.html'
})

export class ListComponent implements OnInit {
    constructor(private aService: ApiService, private activeRoute: ActivatedRoute, private route: Router) {
    }

    errorMess = "";
    keyword = "";
    btnPageSet: number[] = [];
    totalPage = 1;

    listUsers: User[] = [];

    ngOnInit() {

        //Lấy danh sách load lần đầu
        this.aService.getList<responseData>(1, "")
            .subscribe(data => {
                this.errorMess = data.message.substring(0, 100);
                this.listUsers = [];
                data.data.items.forEach(item => {
                    this.listUsers.push(new User(item));
                })

                //Set số nút phân trang
                this.totalPage = data.data.totalPage;
                this.btnPageSet = [1, 2, 3];
                if (this.totalPage < 3)
                    this.btnPageSet = this.btnPageSet.slice(0, this.totalPage);
            })
    }

    //Lấy danh sách user
    getList(page: number) {
        this.aService.getList<responseData>(page, this.keyword)
            .subscribe(data => {
                this.errorMess = data.message.substring(0, 100);
                this.listUsers = [];
                data.data.items.forEach(item => {
                    this.listUsers.push(new User(item));
                })

                //Set số nút phân trang
                this.totalPage = data.data.totalPage;
                if (page == 1) {
                    this.btnPageSet = [1, 2, 3];
                    if (this.totalPage < 3)
                        this.btnPageSet = this.btnPageSet.slice(0, this.totalPage);
                }
            })
    }

    //Set nút phân trang
    setBtnPageUp() {
        let arrBtnNew: number[] = [];
        this.btnPageSet.forEach(btnPage => {
            if (btnPage + 3 <= this.totalPage) {
                btnPage += 3;
                arrBtnNew.push(btnPage);
            }
        })
        if (arrBtnNew.length > 0)
            this.btnPageSet = arrBtnNew;
    }
    setBtnPageDown() {
        let arrBtnNew: number[] = [];
        let firstBtn = this.btnPageSet[0];
        if (firstBtn > 3) {
            arrBtnNew.push(firstBtn - 3, firstBtn - 2, firstBtn - 1)
        }
        if (arrBtnNew.length > 0)
            this.btnPageSet = arrBtnNew;
    }

    //Logout
    logOut() {
        //Xóa token

        //Về màn login
        this.route.navigateByUrl('')
    }
}