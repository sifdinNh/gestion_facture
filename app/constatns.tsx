import { User, Facture } from "./types"

export const users : User[] = [
    {
        "id" : 1,
        "email" : "samir@main.com",
        "name" : "samir",
        "role" : "financier"
    },
    {
        "id" : 2,
        "email" : "abir@main.com",
        "name" : "abir",
        "role" : "comptable"
    },
]

export const factures : Facture[] = [
    {
        "id" : 1,
        "No" : "D230",
        "statut" : "A",
        "totalTTC" : "33.3",
        "dateEmission" : "07/10/2022", 
        "dateEcheance" : "07/12/2022",   

    },
    {
        "id" : 2,
        "No" : "D231",
        "statut" : "B",
        "totalTTC" : "33.3",
        "dateEmission" : "07/10/2022", 
        "dateEcheance" : "07/12/2022",   

    },
    {
        "id" : 3,
        "No" : "D232",
        "statut" : "C",
        "totalTTC" : "33.3",
        "dateEmission" : "07/10/2022", 
        "dateEcheance" : "07/12/2022",   

    },
]
