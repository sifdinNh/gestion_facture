export interface User {
    id: number;
    first_name : string;
    last_name : string;
    email: string;
    role : string;
  }
  
export interface Facture {
    id: number;
    No: string;
    statut : string;
    totalTTC: string;
    dateEmission : string;
    dateEcheance : string;
}

export interface Payment {
  id: number;
  facture: Facture;
  penalities : string;
  ttc : string;
  date : string;
}