export interface ICollaborador {
  id: string | number;
  name: string;
  dni: string;
  position: string;
  location: string; 
  status: 'Activo' | 'Inactivo';
}