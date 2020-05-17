import { Component, OnInit } from '@angular/core';
import {FormBuilder ,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { TestService } from '../test.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public UserName:string;
  public error: any;
public response_data:string = '';


  get email(){
    return this.form.get('Email');
  }



    get password(){
      return this.form.get('Password');
    }
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private fb:FormBuilder,private router: Router,private _test:TestService  ) { }
    form = this.fb.group({
      Email : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      Password : ['',Validators.required]

    })



    ngOnInit() {
    }

  onSubmit(){
    localStorage.setItem('email',this.form.value.Email);
    localStorage.setItem('Password',this.form.value.Password);
if(this.form.value.Email != '' && this.form.value.Password != ''){
  this._test.onLogin(this.form.value).subscribe
  (
    response => {
      // this.response_data = response;
      let someValue: any =response;

let strLength: string = (<string>someValue);
      if(strLength !=  'one'){
        this.router.navigate(['/profile']);

      }else{
        data => {
          this.error = "This email already exists.";
          setTimeout( () => {
               this.error = '';
             }, 2000);
        }
      }
  },


  error =>
{    console.log('error',error)}
);
}
else{
  this.error = "Enter all the fields.";
  setTimeout( () => {
       this.error = '';
     }, 2000);
  }
}
}
