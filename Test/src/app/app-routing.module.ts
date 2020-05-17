import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TestGuard } from './test.guard';


const routes: Routes = [
  {path :'',component:LoginComponent },

  {path : 'profile',component:ProfileComponent, canActivate: [TestGuard] }

];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

  export const routingComponents = [RegisterComponent,LoginComponent,ProfileComponent]
