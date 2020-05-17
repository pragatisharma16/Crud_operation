import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TestService } from './test.service';
import {Router} from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class TestGuard implements CanActivate {
  constructor(private _router:Router,private _test:TestService
 ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if (this._test.isAdminUser())  {
        alert('You are not allowed to view this page due to active guard enable.KIndly refresh and login again.');
        //redirect to login/home page etc
        //return false to cancel the navigation
        return false;
    }
    return true;
  }

}
