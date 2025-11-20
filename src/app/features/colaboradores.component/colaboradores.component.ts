import { Component, OnInit } from '@angular/core';
import { ICollaborador } from '../dashboard.component/interface/Icolaborador';
import { CardDashboardService } from '../../core/service/card-dashboard.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-colaboradores.component',
  standalone: false,
  templateUrl: './colaboradores.component.html',
  styles: ``,
})
export class ColaboradoresComponent implements OnInit {

collaboratorsList: ICollaborador[] = [];
collaboratorForm: FormGroup;

  constructor(private dashboardService: CardDashboardService,
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
  }


  
  loadCollaborators(): void {
    // Consumimos el método específico para esta vista que creamos en el paso anterior
    this.dashboardService.getAllCollaborators().subscribe(data => {
      this.collaboratorsList = data;
    });
  }

  saveCollaborator(): void {
    if (this.collaboratorForm.valid) {
      const formData = this.collaboratorForm.value;
      console.log('Datos a enviar al backend:', formData);
      
      // AQUI: Llamarías a tu servicio para guardar (POST)
      // this.dashboardService.createCollaborator(formData)...
      
      // Cerrar modal (lógica manual o simplemente recargar lista)
      alert('Colaborador guardado (Simulación)');
      this.collaboratorForm.reset(); // Limpiar formulario
    } else {
      alert('Por favor completa los campos requeridos');
    }
  }
}


