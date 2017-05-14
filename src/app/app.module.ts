import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { masterFirebaseConfig } from './../api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectService } from './project.service';
import { AuthService } from './auth.service';
import { ProjectAllComponent } from './project-all/project-all.component';
import { AboutComponent } from './about/about.component';
import { routing } from './app.routing';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProgressPipe } from './progress.pipe';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { CategoryFilterPipe } from './category-filter.pipe';
import { ReversePipe } from './reverse.pipe';


export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    ProjectNewComponent,
    ProjectAllComponent,
    AboutComponent,
    ProjectDetailComponent,
    ProgressPipe,
    ProjectEditComponent,
    CategoryFilterPipe,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    MaterializeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ProjectService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
