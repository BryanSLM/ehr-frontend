export interface LabsReportI {
  id: string;
  nombre_examen: string;
  paciente_id: number;
  fecha_reporte: string;
  medico_solicitante_id: number;
  estado: string;
  fecha_agendamiento: string;
  medico: any;
}

export interface LabsReportDetailsI {
  id: string;
  labs_report_id: string;
  tipo_examen_id: string;
  valor_resultado: string;
  unidad_medida: string;
  valor_referencia: string;
  interpretacion: string;
  observaciones: string;
  tipoExamen: any;
  labsReport: LabsReportI;
}
