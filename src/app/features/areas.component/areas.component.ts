import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaService, Area } from '../../core/service/area.service';

declare const bootstrap: any;

@Component({
  selector: 'app-areas',
  standalone: false,
  templateUrl: './areas.component.html',
  styles: ``,
})
export class AreasComponent implements OnInit {
  areas: Area[] = [];
  filteredAreas: Area[] = [];
  areaForm: FormGroup;
  selectedArea: Area | null = null;
  searchTerm: string = '';
  loading: boolean = false;
  saving: boolean = false;
  isEditMode: boolean = false;
  private areaModal: any;
  private viewAreaModal: any;

  constructor(
    private areaService: AreaService,
    private fb: FormBuilder
  ) {
    this.areaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      icono: [''],
      color: ['#6366F1']
    });
  }

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas(): void {
    this.loading = true;
    this.areaService.listarTodas().subscribe({
      next: (data) => {
        this.areas = data;
        this.filteredAreas = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        alert('Error al cargar las áreas');
      }
    });
  }

  filterAreas(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredAreas = this.areas;
    } else {
      this.filteredAreas = this.areas.filter(area =>
        area.nombre.toLowerCase().includes(term) ||
        (area.descripcion && area.descripcion.toLowerCase().includes(term))
      );
    }
  }

  openNewModal(): void {
    this.isEditMode = false;
    this.selectedArea = null;
    this.areaForm.reset({ color: '#6366F1' });
    this.areaModal = new bootstrap.Modal(document.getElementById('areaModal'));
    this.areaModal.show();
  }

  viewArea(area: Area): void {
    this.selectedArea = area;
    this.viewAreaModal = new bootstrap.Modal(document.getElementById('viewAreaModal'));
    this.viewAreaModal.show();
  }

  editArea(area: Area): void {
    this.isEditMode = true;
    this.selectedArea = area;
    this.areaForm.patchValue({
      nombre: area.nombre,
      descripcion: area.descripcion || '',
      icono: area.icono || '',
      color: area.color || '#6366F1'
    });
    this.areaModal = new bootstrap.Modal(document.getElementById('areaModal'));
    this.areaModal.show();
  }

  deleteArea(area: Area): void {
    if (confirm(`¿Estás seguro de eliminar el área "${area.nombre}"?`)) {
      this.areaService.eliminar(area.id!).subscribe({
        next: () => {
          this.loadAreas();
          alert('Área eliminada exitosamente');
        },
        error: (error) => {
          alert('Error al eliminar el área');
        }
      });
    }
  }

  saveArea(): void {
    if (this.areaForm.invalid) {
      this.areaForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    const areaData: Area = this.areaForm.value;

    const request = this.isEditMode
      ? this.areaService.actualizar(this.selectedArea!.id!, areaData)
      : this.areaService.crear(areaData);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.areaModal.hide();
        this.loadAreas();
        alert(`Área ${this.isEditMode ? 'actualizada' : 'creada'} exitosamente`);
      },
      error: (error) => {
        this.saving = false;
        alert('Error al guardar el área');
      }
    });
  }
}
