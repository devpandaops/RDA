import { ImagekitioAngularModule } from 'imagekitio-angular';
import { CarouselComponent } from './carousel/carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ListUsersComponent } from './list-users/list-users.component';
import { MyPageAllUsersComponent } from './myPageAllUsers/myPageAllUsers.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from './pipes/pipes.module';
import { HeaderComponent } from './header/header.component';



@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    ImagekitioAngularModule.forRoot({
      publicKey: environment.PUBLICKEY,
      urlEndpoint: environment.URL_ENDPOINT,
    }),
  ],
  declarations: [CarouselComponent, ListUsersComponent, MyPageAllUsersComponent, HeaderComponent],
  exports: [CarouselComponent, RouterModule, ListUsersComponent, MyPageAllUsersComponent, HeaderComponent],
})
export class SharedModule { }
