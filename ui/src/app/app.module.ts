import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { HomeComponent } from './home/home.component';
import { DataSetsComponent } from './data-sets/data-sets.component';
import { CreateCompComponent } from './create-comp/create-comp.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [			
    AppComponent,
      HomeComponent,
      DataSetsComponent,
      CreateCompComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialExampleModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
