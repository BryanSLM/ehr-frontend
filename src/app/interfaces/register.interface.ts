export interface Register {
  username: string;
  password: string;
  role: string;
  especialidad?: string;
  empresa: string;
  email: string;
  identification: string;
  identificationType: any; // Added to match the form control
  patient: RegisterDetails;
}

export interface RegisterDetails {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  phone: string;
}
