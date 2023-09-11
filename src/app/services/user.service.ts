import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  post_url:string="http://localhost:3000/users"
  users:User[]=[]

  registerUser(user:User){
    const headers=new HttpHeaders().set("content-type","application/json")
    return this.http.post<User>(this.post_url,user,{headers:headers})
  }

  getUsers(){  
    return this.http.get<User[]>(this.post_url)
  }

}
