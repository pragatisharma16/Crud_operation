import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Test } from './test';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  private url: string = "http://localhost/recipe-book/test/test_api/index.php";
public response:any;
  constructor(private http:HttpClient) { }

  onLogin(logindata):Observable<Test>{
    this.response = logindata;
  return this.http.post(this.url,logindata).pipe(map((res: any) => res));
}
persnalInfo(persnalInfo):Observable<Test>{
return this.http.post<Test>(this.url,persnalInfo).pipe(map((res: any) => res));
}

public uploadImage(fileToUpload,form) :Observable<any>{
       var formData: FormData = new FormData();

formData.append('file', fileToUpload, form.Email);
formData.append('files', fileToUpload);


       return this.http.post(this.url, formData);
  }
  savePassword(password):Observable<Test>{
  return this.http.post<Test>(this.url,password).pipe(map((res: any) => res));
}
isAdminUser():boolean {
  if ( this.response == undefined) {
          return true;
      }
    else{
      return false;
    }
   }
}
