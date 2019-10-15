import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatNativeDateModule
} from '@angular/material';
import { CountryFilterComponent } from './components/country-filter/country-filter.component';
import { AuthenticationGuard } from './authentication.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserDataComponent } from './components/edit-user-data/edit-user-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ListPageComponent,
    NavbarComponent,
    CountryFilterComponent,
    EditUserDataComponent,
  ],
  entryComponents: [
    EditUserDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
  ],
  providers: [
    AuthenticationGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
