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
    this.loadRealData();
  }

  loadDashboardData() {
    // Datos mock para las cards
    this.cards = this.dashboardService.getCards();

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

  loadRealData() {
    // Conectar con el backend real
    this.dashboardService.getMetricas().subscribe({
      next: (metricas) => {
        console.log('✅ Métricas del backend:', metricas);
        // Actualizar las cards con datos reales
        this.cards = [
          {
            title: 'Total Colaboradores',
            description: metricas.totalColaboradores,
            footer: 'Actualizado hace 1 hora'
          },
          {
            title: 'Asistencias Hoy',
            description: metricas.asistenciasHoy,
            footer: 'Incremento del 5% este mes'
          },
          {
            title: 'Total Áreas',
            description: metricas.totalAreas,
            footer: 'En los últimos 7 días'
          },
          {
            title: 'Total Sedes',
            description: metricas.totalSedes,
            footer: 'Actualizadas'
          }
        ];
      },
      error: (error) => {
        console.error('❌ Error al cargar métricas:', error);
        console.log('ℹ️ Asegúrate de hacer login primero');
      }
    });

    // Cargar distribución por áreas
    this.dashboardService.getDistribucionAreas().subscribe({
      next: (distribucion) => {
        console.log('✅ Distribución por áreas:', distribucion);
        // Convertir el objeto a array de IAreaMetric
        this.areas = Object.entries(distribucion).map(([area, count]) => ({
          area,
          count: count as number,
          percentage: 0 // Calcular si es necesario
        }));
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Cargar distribución por sedes
    this.dashboardService.getDistribucionSedes().subscribe({
      next: (distribucion) => {
        console.log('✅ Distribución por sedes:', distribucion);
        // Convertir el objeto a array de ISedeMetric
        this.sedes = Object.entries(distribucion).map(([location, data]: [string, any]) => ({
          location,
          count: data.total || 0,
          percentage: 0 // Calcular si es necesario
        }));
      },
      error: (error) => console.error('❌ Error:', error)
    });
  }
}

