import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TestService } from '../test.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public email1:any;
  public old_pass:any;
  public error:any;
  public names = '';

  url:any;
  get custname(){
    return this.form.get('CustName');
  }

  get mobile(){
    return this.form.get('Mobile');
  }

  get email(){
    return this.form.get('Email');
  }
  get Password(){
    return this.form.get('Password');
  }
  get confirmPassword(){
    return this.form.get('confirmPassword');
  }
  get retypePassword(){
    return this.form.get('retypePassword');
  }
  public name = [];
  phoneNumber = "^[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private fb:FormBuilder,private _test:TestService) {}
  form = this.fb.group({
    CustName : ['',Validators.required],
    Mobile :['', [Validators.required,Validators.pattern(this.phoneNumber)]],
    Email :localStorage.getItem('email'),
    Password :['', [Validators.required]],
    confirmPassword :['', [Validators.required]],
    retypePassword :['', [Validators.required]]



  })
  ngOnInit() {
    this.email1 = localStorage.getItem('email');
    this.old_pass = localStorage.getItem('Password');

  }

  onSubmit(form){
    this.names = this.form.value.CustName ;
    if(this.form.value.CustName != '' && this.form.value.Mobile != ''){
      this._test.persnalInfo(this.form.value).subscribe
      (
        response => {
          this.error = "saved";
          setTimeout( () => {
            this.error = '';
          }, 2000);
        },


        error =>
        {    console.log('error',error)}
      );
    }else{
      this.error = "Fill all the fields";
      setTimeout( () => {
        this.error = '';
      }, 2000);

    }
  }

  public fileToUpload: File = null;
  imageUrl: string = "";
  /*file upload*/
  processFile(event){
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload=event.target.files[0];

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // console.log(reader.result);
        this.url = reader.result;
      }
    }else{
      this.error = "Please select an image";
      setTimeout( () => {
        this.error = '';
      }, 2000);
    }

  }
  onUpload(){
    if(this.fileToUpload == null){
      this.error = "Please select an image";
      setTimeout( () => {
        this.error = '';
      }, 2000);
    }else{
      this._test.uploadImage(this.fileToUpload,this.form.value).subscribe(
        data => {
          this.error = "Image uploaded successfully";
          setTimeout( () => {
            this.error = '';
          }, 2000);
        }
      );
    }
  }
  submitPassword(){
    if(this.form.value.Password == '' && this.form.value.retypePassword == '' && this.form.value.confirmPassword== ''){
      this.error = "please enter all the fields";
      setTimeout( () => {
        this.error = '';
      }, 2000);

    }else{

      if(this.form.value.Password == this.old_pass){
        if(this.form.value.retypePassword ==  this.form.value.confirmPassword){
          this._test.savePassword(this.form.value).subscribe(
            data => {
              this.error = "Saved";
              setTimeout( () => {
                this.error = '';
              }, 2000);
            }
          );
        }else{
          this.error = "Password did not match";
          setTimeout( () => {
            this.error = '';
          }, 2000);
        }
      }else{
        this.error = "Password did not match";
        setTimeout( () => {
          this.error = '';
        }, 2000);
      }
    }
  }
}
