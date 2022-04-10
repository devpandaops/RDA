import { AuthGuard } from './../shared/guards/auth.guard';
import { MyPageMissionariesComponent } from '../adminUsers/missionaries/myPageMissionaries/myPageMissionaries.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageMissionaryComponent } from './home-page-missionary/home-page-missionary.component';
import { FormCadVolunteersResolverGuard } from '../shared/guards/form-cad-volunteers-resolver.guard';
import { FormCadMissionariesResolverGuard } from '../shared/guards/form-cad-missionaries-resolver.guard';
import { AllUsersResolverGuard } from '../shared/guards/all-users-resolver.guard';
import { MyPageAllUsersResolverGuard } from '../shared/guards/my-page-all-users-resolver.guard';
import { HeaderComponent } from '../shared/header/header.component';
import { HeaderResolverGuard } from '../shared/guards/header-resolver.guard';
import { MyPageAllUsersComponent } from '../shared/myPageAllUsers/myPageAllUsers.component';
import { TypeUserResolverGuard } from '../shared/guards/type-user-resolver.guard';
import { FormCadMissionariesComponent } from '../app-forms/missionariesForm/formCadMissionaries/formCadMissionaries.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'LoginUser', pathMatch: 'full' },
      {
        path: 'header',
        component: HeaderComponent,
         canActivate: [AuthGuard],
         resolve: {
          user: HeaderResolverGuard,
          loggeInUserType: TypeUserResolverGuard,

        },
        children: [
          {
            path: 'myPageAllUsers/:id/:userTypeInList',
            component: MyPageAllUsersComponent,
            resolve: {
              loggeInUserType: TypeUserResolverGuard,
              loggeInUser: HeaderResolverGuard, 
              userTypeInList: MyPageAllUsersResolverGuard,
            },
            canActivate: [AuthGuard],
          },

          {
            path: 'homeMissionary/:id', 
            component: HomePageMissionaryComponent,
            canActivate: [AuthGuard],
            resolve: {
          
            },
          },
      
          {
            path: 'formCadMissionaries/:id',
            component: FormCadMissionariesComponent,
            canActivate: [AuthGuard],
            resolve: {
              missinary: FormCadMissionariesResolverGuard,
            },
          },
        ],

     
      }]),
  ],
  exports: [RouterModule],
})
export class MissionariesRoutingModule {}
