import { Component, OnInit } from '@angular/core';
import { CardDashboardService } from '../../core/service/card-dashboard.service';
import { ICollaborador } from './interface/Icolaborador';
import { IAreaMetric, ISedeMetric } from './interface/IArea';

@Component({
  selector: 'app-dashboard.component',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent implements OnInit {

  cards : ICardDashboard[] = [];

  constructor(private dashboardService: CardDashboardService) {}




  areas: IAreaMetric[] = [];
  sedes: ISedeMetric[] = [];
  collaborators: ICollaborador[] = [];


  ngOnInit(): void {
    this.loadDashboardData();
    this.cards = this.dashboardService.getCards();
  }

  loadDashboardData() {

    this.dashboardService.getAreaMetrics().subscribe(data => {
      this.areas = data;
    });

 
    this.dashboardService.getSedeMetrics().subscribe(data => {
      this.sedes = data;
    });

 
    this.dashboardService.getRecentCollaborators().subscribe(data => {
      this.collaborators = data;
    });
  }
}

