import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PuestoService, Puesto } from '../../core/service/puesto.service';
import { AreaService, Area } from '../../core/service/area.service';

declare const bootstrap: any;

@Component({
  selector: 'app-puestos',
  standalone: false,
  templateUrl: './puestos.component.html',
  styles: ``,
})
export class PuestosComponent implements OnInit {
  puestos: Puesto[] = [];
  filteredPuestos: Puesto[] = [];
  areas: Area[] = [];
  puestoForm: FormGroup;
  selectedPuesto: Puesto | null = null;
  searchTerm: string = '';
  selectedAreaFilter: string = '';
  loading: boolean = false;
  saving: boolean = false;
  isEditMode: boolean = false;
  private puestoModal: any;
  private viewPuestoModal: any;

  constructor(
    private puestoService: PuestoService,
    private areaService: AreaService,
    private fb: FormBuilder
  ) {
    this.puestoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      areaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAreas();
    this.loadPuestos();
  }

  loadAreas(): void {
    this.areaService.listarTodas().subscribe({
      next: (data) => {
        this.areas = data;
      },
      error: (error) => {}
    });
  }

  loadPuestos(): void {
    this.loading = true;
    this.puestoService.listarTodos().subscribe({
      next: (data) => {
        this.puestos = data;
        this.filteredPuestos = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        alert('Error al cargar los puestos');
      }
    });
  }

  filterPuestos(): void {
    let filtered = this.puestos;

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(puesto =>
        puesto.nombre.toLowerCase().includes(term) ||
        (puesto.descripcion && puesto.descripcion.toLowerCase().includes(term))
      );
    }

    if (this.selectedAreaFilter) {
      filtered = filtered.filter(puesto => 
        puesto.area?.id?.toString() === this.selectedAreaFilter
      );
    }

    this.filteredPuestos = filtered;
  }

  openNewModal(): void {
    this.isEditMode = false;
    this.selectedPuesto = null;
    this.puestoForm.reset();
    this.puestoModal = new bootstrap.Modal(document.getElementById('puestoModal'));
    this.puestoModal.show();
  }

  viewPuesto(puesto: Puesto): void {
    this.selectedPuesto = puesto;
    this.viewPuestoModal = new bootstrap.Modal(document.getElementById('viewPuestoModal'));
    this.viewPuestoModal.show();
  }

  editPuesto(puesto: Puesto): void {
    this.isEditMode = true;
    this.selectedPuesto = puesto;
    this.puestoForm.patchValue({
      nombre: puesto.nombre,
      descripcion: puesto.descripcion || '',
      areaId: puesto.area?.id || ''
    });
    this.puestoModal = new bootstrap.Modal(document.getElementById('puestoModal'));
    this.puestoModal.show();
  }

  deletePuesto(puesto: Puesto): void {
    if (confirm(`¿Estás seguro de eliminar el puesto "${puesto.nombre}"?`)) {
      this.puestoService.eliminar(puesto.id!).subscribe({
        next: () => {
          this.loadPuestos();
          alert('Puesto eliminado exitosamente');
        },
        error: (error) => {
          alert('Error al eliminar el puesto');
        }
      });
    }
  }

  savePuesto(): void {
    if (this.puestoForm.invalid) {
      this.puestoForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    const formValue = this.puestoForm.value;
    const puestoData: Puesto = {
      nombre: formValue.nombre,
      descripcion: formValue.descripcion,
      area: { id: parseInt(formValue.areaId) }
    };

    const request = this.isEditMode
      ? this.puestoService.actualizar(this.selectedPuesto!.id!, puestoData)
      : this.puestoService.crear(puestoData);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.puestoModal.hide();
        this.loadPuestos();
        alert(`Puesto ${this.isEditMode ? 'actualizado' : 'creado'} exitosamente`);
      },
      error: (error) => {
        this.saving = false;
        alert('Error al guardar el puesto');
      }
    });
  }
}
