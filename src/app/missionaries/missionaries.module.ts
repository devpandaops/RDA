import { MissionariesRoutingModule } from './missionaries.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageMissionariesComponent } from '../adminUsers/missionaries/myPageMissionaries/myPageMissionaries.component';
import { HomePageMissionaryComponent } from './home-page-missionary/home-page-missionary.component';
import { MissionariesService } from '../services/missionaries.service';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderResolverGuard } from '../shared/guards/header-resolver.guard';

@NgModule({
  imports: [CommonModule, MissionariesRoutingModule, SharedModule, AppRoutingModule ],
  declarations: [MyPageMissionariesComponent, HomePageMissionaryComponent],
  providers: [MissionariesService,HeaderResolverGuard],
  exports:[]
})
export class MissionariesModule {}
