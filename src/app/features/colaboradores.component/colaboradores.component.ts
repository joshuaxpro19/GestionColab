import { Component } from '@angular/core';
import { ICollaborador } from '../dashboard.component/interface/Icolaborador';
import { CardDashboardService } from '../../core/service/card-dashboard.service';

@Component({
  selector: 'app-colaboradores.component',
  standalone: false,
  templateUrl: './colaboradores.component.html',
  styles: ``,
})
export class ColaboradoresComponent {

collaboratorsList: ICollaborador[] = [];

  constructor(private dashboardService: CardDashboardService) { }

  ngOnInit(): void {
    this.loadCollaborators();
  }

  loadCollaborators(): void {
    // Consumimos el método específico para esta vista que creamos en el paso anterior
    this.dashboardService.getAllCollaborators().subscribe(data => {
      this.collaboratorsList = data;
    });
  }
}


