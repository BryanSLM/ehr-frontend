export interface MedicamentoI {
  id: number;
  nombre_generico: string;
  nombre_comercial: string;
  forma_farmaceutica: string;
  concentracion: string;
  via_administracion: string;
  categoria: string;
  estado: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface TreatmentDetailI {
  id: string;
  treatment_id: string;
  medication_id: number;
  dosis: string;
  frecuencia: string;
  duracion: string;
  medicamento: MedicamentoI;
}

export interface TreatmentI {
  id: string;
  name?: string;
  paciente_id: number;
  medico_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  observaciones: string;
  medico: any;
}

export interface TreatmentWithDetailsI extends TreatmentI {
  detallesTratamiento: TreatmentDetailI[];
}
