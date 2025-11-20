export interface ICollaborador {
  id: string | number;
  name: string;
  dni: string;
  position: string;
  location: string; 
  phone?: string;  // Nuevo campo
  email?: string;
  status: 'Activo' | 'Inactivo';
}