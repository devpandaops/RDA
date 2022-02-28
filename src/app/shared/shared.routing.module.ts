import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideBarComponent } from '../adminUsers/sideBar/sideBar.component';
import { DashboardComponent } from '../adminUsers/dashboard/dashboard.component';
import { ListAdminUsersComponent } from '../adminUsers/listAdminUsers/listAdminUsers.component';
import { ListMissionariesComponent } from '../adminUsers/missionaries/listMissionaries/listMissionaries.component';
import { MyPageAdminUsersComponent } from '../adminUsers/myPageAdminUsers/myPageAdminUsers.component';
import { ListVolunteersComponent } from '../adminUsers/volunteers/listVolunteers/listVolunteers.component';
import { FormCadAdminUsersComponent } from '../app-forms/adminUsersForm/formCadAdminUsers/formCadAdminUsers.component';
import { FormCadMissionariesComponent } from '../app-forms/missionariesForm/formCadMissionaries/formCadMissionaries.component';
import { FiltrosComponent } from '../app-forms/volunteersForm/filtros/filtros.component';
import { FormCadComponent } from '../app-forms/volunteersForm/form-cad/form-cad.component';
import { FormCadVolunteersResolverGuard } from './guards/form-cad-volunteers-resolver.guard';
import { MyPageAllUsersComponent } from './myPageAllUsers/myPageAllUsers.component';
import { AllUsersResolverGuard } from './guards/all-users-resolver.guard';
import { MyPageAllUsersResolverGuard } from './guards/my-page-all-users-resolver.guard';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'LoginUser', pathMatch: 'full' },
      {
        path: 'sideBar',
        component: SideBarComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'myPageAllUsers/:id/:userTypeInList',
            component: MyPageAllUsersComponent,
            resolve: {
              loggeInUserType: AllUsersResolverGuard,
              user: AllUsersResolverGuard,
              userTypeInList: MyPageAllUsersResolverGuard,
            },
            canActivate: [AuthGuard],
          },
          //ADMINISTRADORES
          {
            path: 'Dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'listAdminUsers',
            component: ListAdminUsersComponent,
            canActivate: [AuthGuard],
          },

          //VOLUNTÁRIOS
          {
            path: 'listVolunteers',
            component: ListVolunteersComponent,
            canActivate: [AuthGuard],
          },

          //MISISONÁRIOS
          {
            path: 'listMissionaries',
            component: ListMissionariesComponent,
            canActivate: [AuthGuard],
          },

          //FORMULÁRIOS

          {
            path: 'formCadAdminUsers',
            component: FormCadAdminUsersComponent,
            resolve: {
              //  voluntary: FormCadAdminUsersResolverGuard,
            },
          },
          {
            path: 'formCadAdminUsers/:id',
            component: FormCadAdminUsersComponent,
            canActivate: [AuthGuard],
            resolve: {
              // voluntary: FormCadAdminUsersResolverGuard,
            },
          },

          {
            path: 'formCadMissionaries',
            component: FormCadMissionariesComponent,
            resolve: {
              //  voluntary: FormCadAdminUsersResolverGuard,
            },
          },
          {
            path: 'formCadMissionaries/:id',
            component: FormCadMissionariesComponent,
            canActivate: [AuthGuard],
            resolve: {
              // voluntary: FormCadAdminUsersResolverGuard,
            },
          },

          {
            path: 'formCadVoluntary',
            component: FormCadComponent,
            resolve: {
              voluntary: FormCadVolunteersResolverGuard,
            },
          },
          {
            path: 'formCadVoluntary/:id',
            component: FormCadComponent,
            canActivate: [AuthGuard],
            resolve: {
              voluntary: FormCadVolunteersResolverGuard,
            },
          },
          {
            path: 'filtros',
            component: FiltrosComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
