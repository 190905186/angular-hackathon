import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.minLength(1),Validators.required]]
  })
  message: string=''
  users: User[]=[]

  constructor(private fb: FormBuilder, private userService: UserService,private router:Router,private route:ActivatedRoute) {}

  loginUser(){
    if (this.loginForm.valid) {
      const formValue=this.loginForm.value
      const observer={
      next:(data: User)=>{
        this.users.push(data)
      },
      error:(e: any)=>{
        console.warn(e)
        console.warn("error occured while getting the users")
      },
      complete:()=>{
        console.log("fetching users is completed. the users are")
        this.helper_function(formValue as User)
      }
    }
      this.userService.getUsers().subscribe(observer)
    }
    else{
      window.alert("the details are not valid")
    }
  }
  helper_function(user:User){
    console.log(this.users[0])
    const tempUser=this.users.filter(userObj=>userObj.emailId===user.emailId)
    if (tempUser.length===0){
      
      window.alert("User doesnot exists.Please register")
      this.router.navigate(['../register'],{relativeTo:this.route})
    }
    else if (tempUser[0].password!==user.password){
        window.alert("Incorrect password")
        this.loginForm.controls.password.reset()
      }
    else{
      window.alert("login successful.Redirecting to forex page")
      this.router.navigate(['../forexRates'],{relativeTo:this.route})
    }
  }
}
