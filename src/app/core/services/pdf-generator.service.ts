import { LabsReportI } from './../../interfaces/labs-report.interface';
import { Injectable } from '@angular/core';
import { LabsReportDetailsI } from '../../interfaces/labs-report.interface';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  private async getLogoBase64(): Promise<string> {
    const response = await fetch('assets/logo.png');
    const blob = await response.blob();
    return await this.getBase64FromFile(
      new File([blob], 'logo.png', { type: blob.type }),
    );
  }

  async generateLabReportPdf(
    labsReportDetails: LabsReportDetailsI,
    medico: any,
    labsReport: LabsReportI,
  ) {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const logoBase64 = await this.getLogoBase64();
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 10, 8, 20, 20);
    }
    doc.setFontSize(22);
    doc.text('Cardiovasc', 35, 20);
    doc.setFontSize(10);
    doc.text('Email: info@clinicacardiovascular.com', 35, 26);
    doc.text('Teléfonos: (555) 123-4567 / (555) 765-4321', 35, 31);
    doc.text('Dirección: Av. Principal #123, Ciudad', 35, 36);
    doc.setFontSize(18);
    doc.text('Reporte de Laboratorio', 10, 45);
    doc.setFontSize(12);
    // Define box position and size
    const boxX = 8;
    const boxY = 55;
    const boxWidth = 190;
    const boxHeight = 55;

    doc.setLineWidth(0.5);
    doc.rect(boxX, boxY, boxWidth, boxHeight);

    let textY = boxY + 10;

    doc.text(
      `Nombre del examen: ${labsReport.nombre_examen || ''}`,
      boxX + 2,
      textY,
    );
    textY += 10;
    doc.text(
      `Tipo de examen: ${labsReportDetails.tipoExamen?.nombre || ''}`,
      boxX + 2,
      textY,
    );
    textY += 10;
    doc.text(
      `Paciente: ${user.paciente[0].primer_nombre || ''} ${user.paciente[0].apellido_paterno || ''}`,
      boxX + 2,
      textY,
    );
    textY += 10;
    doc.text(
      `Fecha de reporte: ${this.formatDate(labsReport.fecha_reporte) || ''}   |   Fecha agendado: ${this.formatDate(labsReport.fecha_agendamiento) || ''}`,
      boxX + 2,
      textY,
    );
    textY += 10;
    doc.text(
      `Médico solicitante: ${medico?.nombres || ''} ${medico?.apellidos || ''}`,
      boxX + 2,
      textY,
    );

    // Tabla de resultados
    const autoTable = (await import('jspdf-autotable')).default;
    const tableResult = autoTable(doc, {
      startY: boxY + boxHeight + 10,
      head: [['Resultado', 'Unidades', 'Valores de referencia']],
      body: [
        [
          labsReportDetails.valor_resultado || '',
          labsReportDetails.unidad_medida || '',
          labsReportDetails.valor_referencia || '',
        ],
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
      },
      styles: { fontSize: 16, lineColor: [0, 0, 0], textColor: [0, 0, 0] },
    });

    // Interpretación y Observaciones como texto debajo de la tabla
    const finalY = (doc as any).lastAutoTable?.finalY
      ? (doc as any).lastAutoTable.finalY + 10
      : boxY + boxHeight + 60;
    doc.setFontSize(14);
    doc.text('Interpretación:', boxX + 2, finalY);
    doc.setFontSize(12);
    doc.text(
      labsReportDetails.interpretacion || 'Sin interpretación',
      boxX + 2,
      finalY + 7,
    );
    doc.setFontSize(14);
    doc.text('Observaciones:', boxX + 2, finalY + 18);
    doc.setFontSize(12);
    doc.text(
      labsReportDetails.observaciones || 'Sin observaciones',
      boxX + 2,
      finalY + 25,
    );

    doc.save(`Reporte ${labsReport.nombre_examen || ''}.pdf`);
  }

  getBase64FromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  formatDate(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }
}
