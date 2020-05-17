import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { routingComponents } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { TestGuard } from './test.guard';


import { AppComponent } from './app.component';
import {HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents


  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    AngularFileUploaderModule,
      MatFormFieldModule,
      MatInputModule,
    AppRoutingModule,
    MatStepperModule,
    FormsModule,
    CdkStepperModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule

  ],
  providers: [TestGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
