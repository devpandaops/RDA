import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit {
  toggledSideBar = false;
  quantUsers: number;
  lengthUsers;
  allUsers: number;

  lengthAdministrators: number
  lengthMissionaries: number
  lengthVolunteers: number

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.numberAllUsers("All");
  
  }

 public numberAllUsers(type: string) {

    this.dashboardService.getLengthUsers(type).subscribe({
      next: (quantUsers: number) => {
         this.lengthUsers =  quantUsers
        this.lengthAdministrators = this.lengthUsers.administradores
        this.lengthMissionaries = this.lengthUsers.missionarios
        this.lengthVolunteers = this.lengthUsers.voluntarios
        } ,
      error: (error) =>
        console.log(
          `Não foi possível receber a quantidade de usuários devido ao seguinte erro ${error}`
        ),
    });
   console.log(JSON.stringify(this.lengthUsers))
  }

  public openSideBar(event?: Event): void {
    event.preventDefault();
    this.toggledSideBar = !this.toggledSideBar;
  }

  
}
