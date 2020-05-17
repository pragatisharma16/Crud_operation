import { Component, OnInit } from '@angular/core';
import {FormBuilder ,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public datass = '';
  public pwd = '';


    get firstname(){
      return this.form.get('FirstName');
    }
    get lastname(){
      return this.form.get('LastName');
    }
    get mobile(){
      return this.form.get('Mobile');
    }
    get email(){
      return this.form.get('Email');
    }


    public name = [];
    phoneNumber = "^[0-9]{10}$";

    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public emp_id = "";
    constructor( private router: Router,private fb:FormBuilder ) { }
    form = this.fb.group({
      FirstName : ['',Validators.required],
      LastName :['',Validators.required],
      Mobile :['', [Validators.required,Validators.pattern(this.phoneNumber)]],
      Email : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      Password :['']
    })

    ngOnInit() {

    }
    onSubmit(){
console.log(this.form.value);

  }
}
