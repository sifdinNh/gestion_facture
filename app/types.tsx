export interface User {
    id: number;
    name: string;
    email: string;
    role : string;
  }
  
export interface Facture {
    id: number;
    No: string;
    Fournisseur : string;
    pdf: string;
    totalTTC: string;
    date : string;
}
