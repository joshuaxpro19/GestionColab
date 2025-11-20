import { Component, OnInit } from '@angular/core';
import { ICollaborador } from '../dashboard.component/interface/Icolaborador';
import { CardDashboardService } from '../../core/service/card-dashboard.service';
import { ColaboradorService, Colaborador } from '../../core/service/colaborador.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-colaboradores.component',
  standalone: false,
  templateUrl: './colaboradores.component.html',
  styles: ``,
})
export class ColaboradoresComponent implements OnInit {

collaboratorsList: ICollaborador[] = [];
colaboradoresBackend: Colaborador[] = [];
collaboratorForm: FormGroup;

  constructor(
    private dashboardService: CardDashboardService,
    private colaboradorService: ColaboradorService,
    private fb: FormBuilder
  ) { 
    this.collaboratorForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      startDate: [''],
      position: [''],
      location: ['']
    });
  }
  

  ngOnInit(): void {
    this.loadCollaborators();
    this.loadRealCollaborators();
  }

  loadCollaborators(): void {
    // Datos mock para desarrollo
    this.dashboardService.getAllCollaborators().subscribe(data => {
      this.collaboratorsList = data;
    });
  }

  loadRealCollaborators(): void {
    // Cargar datos reales del backend
    this.colaboradorService.listarTodos().subscribe({
      next: (colaboradores) => {
        console.log('✅ Colaboradores del backend:', colaboradores);
        this.colaboradoresBackend = colaboradores;
        
        // Convertir formato backend a formato de la interfaz actual
        this.collaboratorsList = colaboradores.map(c => ({
          id: c.id!,
          name: `${c.nombre} ${c.apellido}`,
          dni: c.dni,
          phone: c.telefono,
          email: c.email,
          position: c.puesto?.nombre || 'Sin puesto',
          location: c.sede?.nombreSede || 'Sin sede',
          status: c.estado as 'Activo' | 'Inactivo' || 'Activo'
        }));
      },
      error: (error) => {
        console.error('❌ Error al cargar colaboradores:', error);
        console.log('ℹ️ Asegúrate de hacer login primero');
      }
    });
  }

  saveCollaborator(): void {
    if (this.collaboratorForm.valid) {
      const formData = this.collaboratorForm.value;
      console.log('Datos a enviar al backend:', formData);
      
      // Crear colaborador en el backend
      const nuevoColaborador: Colaborador = {
        nombre: formData.name,
        apellido: formData.surname,
        dni: formData.dni,
        telefono: formData.phone || '',
        email: formData.email,
        fechaIngreso: formData.startDate || new Date().toISOString().split('T')[0],
        puesto: formData.position ? { id: formData.position } : undefined,
        sede: formData.location ? { id: formData.location } : undefined
      };

      this.colaboradorService.crear(nuevoColaborador).subscribe({
        next: (creado) => {
          console.log('✅ Colaborador creado:', creado);
          alert('Colaborador guardado exitosamente');
          this.collaboratorForm.reset();
          this.loadRealCollaborators(); // Recargar lista
        },
        error: (error) => {
          console.error('❌ Error al guardar:', error);
          alert('Error al guardar colaborador');
        }
      });
    } else {
      alert('Por favor completa los campos requeridos');
    }
  }
}


