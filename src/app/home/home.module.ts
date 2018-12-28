import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { GamesParameterService } from './games.paramter.service';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    Ng2OrderModule,
    FormsModule
  ],
  declarations: [HomeComponent],
  providers: [HomeService,GamesParameterService],
  exports: [HomeComponent]
})
export class HomeModule { }
