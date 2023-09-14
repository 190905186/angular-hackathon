import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/userModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private userService: UserService,private router:Router,private route:ActivatedRoute){}
  users:User[]=[]
  message:string=''

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
    accountNo: [123456789, [Validators.required]],
    mobileNo: [9867574747, [Validators.pattern("^[0-9]{10}$"),Validators.required]],
    emailId: ['hai@example.com', [Validators.email,Validators.pattern("^.*@.*.com$"), Validators.required]],
    password: ['', [Validators.minLength(1), Validators.required]]
  })

  registerUser() {
    if (this.registerForm.valid) {
      const formValue=this.registerForm.value
      const observer={
      next:(data:User[])=>{
        this.users=data
        console.log(this.users.length)
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
    
    this.message="User is added"
    const tempUser=this.users.filter(userObj=>userObj.emailId===user.emailId)
    if (tempUser.length!==0){
      this.message="User already exists. Please Login"
      window.alert(this.message)
      this.router.navigate(['../login'],{relativeTo:this.route})
    }
    else{
      const observer={
      next:(data:User)=>{
        console.table(data)
      },
      error:(e: any)=>{
        console.warn(e)
        console.warn("error occured while Adding the user in the Database")
      },
      complete:()=>{
        this.users.push(user)
        window.alert("Added the user in the Database. Continue to Login")
        this.router.navigate(['../login'],{relativeTo:this.route})
      }
    }
      this.userService.registerUser(user).subscribe(observer)
    }
  }
}
