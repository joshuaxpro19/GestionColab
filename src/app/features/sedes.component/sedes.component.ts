import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SedeService, Sede } from '../../core/service/sede.service';

declare var bootstrap: any;

@Component({
  selector: 'app-sedes',
  standalone: false,
  templateUrl: './sedes.component.html',
  styles: ``
})
export class SedesComponent implements OnInit {
  sedesList: Sede[] = [];
  filteredSedes: Sede[] = [];
  sedeForm: FormGroup;
  
  searchText: string = '';
  isEditMode: boolean = false;
  isSaving: boolean = false;
  selectedSede: Sede | null = null;
  editingId: number | null = null;

  private modalInstance: any;
  private viewModalInstance: any;

  constructor(
    private sedeService: SedeService,
    private fb: FormBuilder
  ) {
    this.sedeForm = this.fb.group({
      nombreSede: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSedes();
    this.initializeModals();
  }

  initializeModals(): void {
    setTimeout(() => {
      const modalElement = document.getElementById('sedeModal');
      const viewModalElement = document.getElementById('viewSedeModal');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
      if (viewModalElement) {
        this.viewModalInstance = new bootstrap.Modal(viewModalElement);
      }
    }, 100);
  }

  loadSedes(): void {
    this.sedeService.listarTodas().subscribe({
      next: (sedes) => {
        this.sedesList = sedes;
        this.filteredSedes = [...sedes];
      },
      error: (error) => {}
    });
  }

  filterSedes(): void {
    if (!this.searchText.trim()) {
      this.filteredSedes = [...this.sedesList];
      return;
    }
    
    const search = this.searchText.toLowerCase();
    this.filteredSedes = this.sedesList.filter(sede =>
      sede.nombreSede.toLowerCase().includes(search) ||
      sede.ciudad.toLowerCase().includes(search) ||
      sede.pais.toLowerCase().includes(search)
    );
  }

  openNewModal(): void {
    this.isEditMode = false;
    this.editingId = null;
    this.sedeForm.reset();
    this.modalInstance?.show();
  }

  viewSede(sede: Sede): void {
    this.selectedSede = sede;
    this.viewModalInstance?.show();
  }

  editSede(sede: Sede): void {
    this.isEditMode = true;
    this.editingId = sede.id!;
    
    this.sedeForm.patchValue({
      nombreSede: sede.nombreSede,
      ciudad: sede.ciudad,
      pais: sede.pais,
      direccion: sede.direccion
    });
    
    this.modalInstance?.show();
  }

  deleteSede(sede: Sede): void {
    if (confirm(`¿Estás seguro de eliminar la sede ${sede.nombreSede}?`)) {
      this.sedeService.eliminar(sede.id!).subscribe({
        next: () => {
          alert('Sede eliminada exitosamente');
          this.loadSedes();
        },
        error: (error) => {
          alert('Error al eliminar la sede');
        }
      });
    }
  }

  saveSede(): void {
    if (this.sedeForm.invalid) {
      Object.keys(this.sedeForm.controls).forEach(key => {
        this.sedeForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSaving = true;
    const sedeData: Sede = this.sedeForm.value;

    const request = this.isEditMode && this.editingId
      ? this.sedeService.actualizar(this.editingId, sedeData)
      : this.sedeService.crear(sedeData);

    request.subscribe({
      next: (resultado) => {
        alert(`Sede ${this.isEditMode ? 'actualizada' : 'guardada'} exitosamente`);
        this.modalInstance?.hide();
        this.sedeForm.reset();
        this.loadSedes();
        this.isSaving = false;
      },
      error: (error) => {
        alert('Error al guardar la sede');
        this.isSaving = false;
      }
    });
  }
}
