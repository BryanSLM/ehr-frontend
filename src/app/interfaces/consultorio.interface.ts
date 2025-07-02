export interface Consultorio {
  id: number;
  numero: string;
  descripcion?: string;
  doctorId: number;
  estado: string;
  doctor?: DoctorConsultorio;
  horarios?: HorarioConsultorio[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DoctorConsultorio {
  id: number;
  username: string;
  especialidad: string;
}

export interface HorarioConsultorio {
  id: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
}
