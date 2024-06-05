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

export interface Reciever {
  id : number;
  address : string;
  zipcode : string;
  country : string;
}

export interface Payment {
  id: number;
  number: string;
  facture: Facture;
  penalty : string;
  ttc : string;
  date : string;
}