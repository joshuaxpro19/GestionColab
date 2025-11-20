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
    this.dashboardService.getMetricas().subscribe({
      next: (metricas) => {
        // Actualizar las cards con datos reales
        this.cards = [
          {
            title: 'Total Colaboradores',
            description: metricas.totalColaboradores,
            footer: 'Actualizado hace 1 hora'
          },
          {
            title: 'Colaboradores Activos',
            description: metricas.asistenciasHoy,
            footer: 'Incremento del 5% este mes'
          },
          {
            title: 'Total Áreas',
            description: metricas.totalAreas,
            footer: 'Departamentos activos'
          },
          {
            title: 'Total Sedes',
            description: metricas.totalSedes,
            footer: 'Sedes operativas'
          }
        ];
      },
      error: (error) => {
      }
    });

    this.dashboardService.getDistribucionAreas().subscribe({
      next: (distribucion) => {
        const total = Object.values(distribucion).reduce((sum: number, val) => sum + (val as number), 0);
        this.areas = Object.entries(distribucion).map(([area, count]) => ({
          area,
          count: count as number,
          percentage: total > 0 ? Math.round((count as number / total) * 100) : 0
        }));
      },
      error: (error) => {}
    });

    this.dashboardService.getDistribucionSedes().subscribe({
      next: (distribucion) => {
        const sedesArray = Object.entries(distribucion).map(([location, data]: [string, any]) => ({
          location,
          count: data.total || 0
        }));
        const totalSedes = sedesArray.reduce((sum, s) => sum + s.count, 0);
        this.sedes = sedesArray.map(s => ({
          ...s,
          percentage: totalSedes > 0 ? Math.round((s.count / totalSedes) * 100) : 0
        }));
      },
      error: (error) => {}
    });
  }

  // Funciones para el diseño
  getCardIconClass(index: number): string {
    const classes = [
      'bg-primary bg-opacity-10 text-primary',
      'bg-success bg-opacity-10 text-success',
      'bg-warning bg-opacity-10 text-warning',
      'bg-danger bg-opacity-10 text-danger'
    ];
    return classes[index] || classes[0];
  }

  getCardIcon(index: number): string {
    const icons = [
      'bi bi-people-fill',
      'bi bi-person-check-fill',
      'bi bi-grid-fill',
      'bi bi-building-fill'
    ];
    return icons[index] || icons[0];
  }

  getAreaColor(index: number): string {
    const colors = ['#6366f1', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'];
    return colors[index % colors.length];
  }

  getSedeBackground(index: number): string {
    const backgrounds = ['#e0e7ff', '#fef3c7', '#fee2e2'];
    return backgrounds[index % backgrounds.length];
  }
}

