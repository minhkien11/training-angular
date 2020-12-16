import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {

    }

    private apiRoute = "https://localhost:8036/api/";

    //Hàm gọi api login
    login<T>(loginId: string, password: string) {

        //Set param
        let loginParams = new HttpParams()
            .set('userId', loginId)
            .set('password', password);

        //Gọi api
        return this.http.post<T>(this.apiRoute + 'Users/Login', loginParams)
    }

    //Hàm gọi api lấy danh sách
    getList<T>(page: number, keyword: string) {
        //Set param
        let listParams = new HttpParams()
            .set('page', page.toString())
            .set('keyword', keyword);

        //Gọi api
        return this.http.post<T>(this.apiRoute + 'Users/List/', listParams)
    }

    //Hàm gọi api lấy chi tiết
    getDetail<T>(userId: string) {

        return this.http.get<T>(this.apiRoute + 'Users/' + userId)
    }

    //Hàm gọi api tạo mới
    createNew<T>(user: Object) {

        return this.http.post<T>(this.apiRoute + 'Users/Create',
            JSON.stringify(user),
            {
                headers: new HttpHeaders(
                    {
                        'Content-Type': 'application/json'
                    })
            })
    }

    //Hàm gọi api edit
    editExist<T>(user: Object) {

        return this.http.post<T>(this.apiRoute + 'Users/Edit',
            JSON.stringify(user),
            {
                headers: new HttpHeaders(
                    {
                        'Content-Type': 'application/json'
                    })
            })
    }

    //Hàm gọi api delete
    deleteExist<T>(userId: string) {

        //Set param
        let deleteParams = new HttpParams()
            .set('userId', userId);

        //Gọi api
        return this.http.post<T>(this.apiRoute + 'Users/Delete', deleteParams)
    }
}