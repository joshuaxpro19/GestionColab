import { Component, OnInit } from '@angular/core';
import { HistorialService, HistorialLaboral } from '../../core/service/historial.service';
import { ColaboradorService, Colaborador } from '../../core/service/colaborador.service';

@Component({
    selector: 'app-historial',
    standalone: false,
    templateUrl: './historial.component.html',
    styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
    historial: HistorialLaboral[] = [];
    historialFiltrado: HistorialLaboral[] = [];
    colaboradores: Colaborador[] = [];

    // Filtros
    colaboradorSeleccionado: number = 0;
    estadoSeleccionado: string = 'todos';
    busqueda: string = '';

    isLoading: boolean = false;
    errorMessage: string = '';

    constructor(
        private historialService: HistorialService,
        private colaboradorService: ColaboradorService
    ) { }

    ngOnInit(): void {
        this.cargarHistorial();
        this.cargarColaboradores();
    }

    cargarHistorial(): void {
        this.isLoading = true;
        this.errorMessage = '';
        console.log('🔍 Cargando historial...');
        this.historialService.listarTodos().subscribe({
            next: (data) => {
                console.log('✅ Datos recibidos:', data);
                console.log('📊 Total de registros:', data.length);
                this.historial = data;
                this.historialFiltrado = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('❌ Error completo:', error);
                console.error('Status:', error.status);
                console.error('Message:', error.message);
                this.errorMessage = 'Error al cargar el historial: ' + (error.message || 'Error desconocido');
                this.isLoading = false;
            }
        });
    }

    cargarColaboradores(): void {
        this.colaboradorService.listarTodos().subscribe({
            next: (data) => {
                this.colaboradores = data;
            },
            error: (error) => {
                console.error('Error al cargar colaboradores:', error);
            }
        });
    }

    aplicarFiltros(): void {
        let resultado = [...this.historial];

        // Filtrar por colaborador
        if (this.colaboradorSeleccionado > 0) {
            resultado = resultado.filter(h => h.colaborador?.id === this.colaboradorSeleccionado);
        }

        // Filtrar por estado
        if (this.estadoSeleccionado !== 'todos') {
            resultado = resultado.filter(h => h.estadoPuesto === this.estadoSeleccionado);
        }

        // Filtrar por búsqueda (nombre, puesto, área)
        if (this.busqueda.trim()) {
            const busquedaLower = this.busqueda.toLowerCase();
            resultado = resultado.filter(h =>
                h.colaborador?.nombre.toLowerCase().includes(busquedaLower) ||
                h.colaborador?.apellido.toLowerCase().includes(busquedaLower) ||
                h.puesto?.nombre.toLowerCase().includes(busquedaLower) ||
                h.area?.nombre.toLowerCase().includes(busquedaLower)
            );
        }

        this.historialFiltrado = resultado;
    }

    limpiarFiltros(): void {
        this.colaboradorSeleccionado = 0;
        this.estadoSeleccionado = 'todos';
        this.busqueda = '';
        this.historialFiltrado = [...this.historial];
    }

    getEstadoBadgeClass(estado: string): string {
        return estado === 'Activo' ? 'bg-success' : 'bg-secondary';
    }

    formatearFecha(fecha: string | undefined): string {
        if (!fecha) return 'Actualidad';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    formatearSalario(salario: number): string {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(salario);
    }

    calcularDuracion(fechaInicio: string, fechaFin?: string): string {
        const inicio = new Date(fechaInicio);
        const fin = fechaFin ? new Date(fechaFin) : new Date();

        const diffTime = Math.abs(fin.getTime() - inicio.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffMonths / 12);

        if (diffYears > 0) {
            const meses = diffMonths % 12;
            return `${diffYears} año${diffYears > 1 ? 's' : ''}${meses > 0 ? ` y ${meses} mes${meses > 1 ? 'es' : ''}` : ''}`;
        } else if (diffMonths > 0) {
            return `${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
        } else {
            return `${diffDays} día${diffDays > 1 ? 's' : ''}`;
        }
    }
}
