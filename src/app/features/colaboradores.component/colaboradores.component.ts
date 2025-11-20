import { Component, OnInit } from '@angular/core';
import { ICollaborador } from '../dashboard.component/interface/Icolaborador';
import { CardDashboardService } from '../../core/service/card-dashboard.service';
import { ColaboradorService, Colaborador } from '../../core/service/colaborador.service';
import { SedeService, Sede } from '../../core/service/sede.service';
import { PuestoService, Puesto } from '../../core/service/puesto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-colaboradores.component',
  standalone: false,
  templateUrl: './colaboradores.component.html',
  styles: ``,
})
export class ColaboradoresComponent implements OnInit {

  collaboratorsList: ICollaborador[] = [];
  filteredCollaborators: ICollaborador[] = [];
  colaboradoresBackend: Colaborador[] = [];
  collaboratorForm: FormGroup;
  
  sedesList: Sede[] = [];
  puestosList: Puesto[] = [];
  
  searchText: string = '';
  isEditMode: boolean = false;
  isSaving: boolean = false;
  selectedCollaborator: ICollaborador | null = null;
  editingId: string | number | null = null;

  private modalInstance: any;
  private viewModalInstance: any;

  constructor(
    private dashboardService: CardDashboardService,
    private colaboradorService: ColaboradorService,
    private sedeService: SedeService,
    private puestoService: PuestoService,
    private fb: FormBuilder
  ) { 
    this.collaboratorForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      phone: ['', [Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      startDate: ['', Validators.required],
      position: [''],
      location: [''],
      estado: ['Activo']
    });
  }
  

  ngOnInit(): void {
    this.loadRealCollaborators();
    this.loadSedes();
    this.loadPuestos();
    this.initializeModals();
  }

  initializeModals(): void {
    setTimeout(() => {
      const modalElement = document.getElementById('collaboratorModal');
      const viewModalElement = document.getElementById('viewModal');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
      if (viewModalElement) {
        this.viewModalInstance = new bootstrap.Modal(viewModalElement);
      }
    }, 100);
  }

  loadRealCollaborators(): void {
    this.colaboradorService.listarTodos().subscribe({
      next: (colaboradores) => {
        this.colaboradoresBackend = colaboradores;
        
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
        this.filteredCollaborators = [...this.collaboratorsList];
      },
      error: (error) => {}
    });
  }

  loadSedes(): void {
    this.sedeService.listarTodas().subscribe({
      next: (sedes) => {
        this.sedesList = sedes;
      },
      error: (error) => {}
    });
  }

  loadPuestos(): void {
    this.puestoService.listarTodos().subscribe({
      next: (puestos) => {
        this.puestosList = puestos;
      },
      error: (error) => {}
    });
  }

  filterCollaborators(): void {
    if (!this.searchText.trim()) {
      this.filteredCollaborators = [...this.collaboratorsList];
      return;
    }
    
    const search = this.searchText.toLowerCase();
    this.filteredCollaborators = this.collaboratorsList.filter(col =>
      col.name.toLowerCase().includes(search) ||
      col.dni.includes(search) ||
      (col.email && col.email.toLowerCase().includes(search))
    );
  }

  openNewModal(): void {
    this.isEditMode = false;
    this.editingId = null;
    this.collaboratorForm.reset({
      estado: 'Activo',
      startDate: new Date().toISOString().split('T')[0]
    });
    this.modalInstance?.show();
  }

  viewCollaborator(col: ICollaborador): void {
    this.selectedCollaborator = col;
    this.viewModalInstance?.show();
  }

  editCollaborator(col: ICollaborador): void {
    this.isEditMode = true;
    this.editingId = col.id;
    
    // Buscar el colaborador completo del backend
    const colBackend = this.colaboradoresBackend.find(c => c.id === col.id);
    
    this.collaboratorForm.patchValue({
      name: colBackend?.nombre || col.name.split(' ')[0],
      surname: colBackend?.apellido || col.name.split(' ')[1],
      dni: col.dni,
      phone: col.phone,
      email: col.email,
      startDate: colBackend?.fechaIngreso,
      position: colBackend?.puesto?.id || '',
      location: colBackend?.sede?.id || '',
      estado: col.status
    });
    
    this.modalInstance?.show();
  }

  deleteCollaborator(col: ICollaborador): void {
    if (confirm(`¿Estás seguro de eliminar a ${col.name}?`)) {
      const id = typeof col.id === 'string' ? parseInt(col.id) : col.id;
      this.colaboradorService.eliminar(id).subscribe({
        next: () => {
          alert('Colaborador eliminado exitosamente');
          this.loadRealCollaborators();
        },
        error: (error) => {
          alert('Error al eliminar el colaborador');
        }
      });
    }
  }

  saveCollaborator(): void {
    if (this.collaboratorForm.invalid) {
      Object.keys(this.collaboratorForm.controls).forEach(key => {
        this.collaboratorForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSaving = true;
    const formData = this.collaboratorForm.value;
    
    const colaboradorData: Colaborador = {
      nombre: formData.name,
      apellido: formData.surname,
      dni: formData.dni,
      telefono: formData.phone || '',
      email: formData.email,
      fechaIngreso: formData.startDate,
      estado: formData.estado,
      puesto: formData.position ? { id: formData.position } : undefined,
      sede: formData.location ? { id: formData.location } : undefined
    };

    const request = this.isEditMode && this.editingId
      ? this.colaboradorService.actualizar(
          typeof this.editingId === 'string' ? parseInt(this.editingId) : this.editingId,
          colaboradorData
        )
      : this.colaboradorService.crear(colaboradorData);

    request.subscribe({
      next: (resultado) => {
        alert(`Colaborador ${this.isEditMode ? 'actualizado' : 'guardado'} exitosamente`);
        this.modalInstance?.hide();
        this.collaboratorForm.reset();
        this.loadRealCollaborators();
        this.isSaving = false;
      },
      error: (error) => {
        alert('Error al guardar el colaborador');
        this.isSaving = false;
      }
    });
  }
}


