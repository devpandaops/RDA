import { AuthGuard } from './../shared/guards/auth.guard';
import { FormCadMissionariesComponent } from './missionariesForm/formCadMissionaries/formCadMissionaries.component';
import { FormCadAdminUsersComponent } from './adminUsersForm/formCadAdminUsers/formCadAdminUsers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Erro404Component } from './../shared/erro404/erro404.component';
import { FormCadVolunteersResolverGuard } from './../shared/guards/form-cad-volunteers-resolver.guard';
import { FiltrosComponent } from './volunteersForm/filtros/filtros.component';
import { FormCadComponent } from './volunteersForm/form-cad/form-cad.component';
import { FormCadMissionariesResolverGuard } from '../shared/guards/form-cad-missionaries-resolver.guard';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
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

      // {
      //   path: 'formCadMissionaries',
      //   component: FormCadAdminUsersComponent,
      //   resolve: {
      //      missionary: FormCadMissionariesResolverGuard,
      //   },
      // },
      // {
      //   path: 'formCadMissionaries/:id',
      //   component: FormCadMissionariesComponent,
      //   canActivate: [AuthGuard],
      //   resolve: {
      //     missionary: FormCadMissionariesResolverGuard,
      //   },
      // },

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
    ]),
  ],
  exports: [RouterModule],
})
export class AppFormsRoutingModule {}
