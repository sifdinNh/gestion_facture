import { User, Facture, Payment } from "./types"

export const users : User[] = [
    {
        "id" : 1,
        "email" : "samir@main.com",
        "first_name" : "samir",
        "last_name" : "samir",
        "role" : "financier"
    },
    {
        "id" : 2,
        "email" : "samir@main.com",
        "first_name" : "samir",
        "last_name" : "samir",
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

export const payments : Payment[] = [
    {
        "id" : 1,
        "number" : "D230",
        "facture" : factures[0],
        "penalty" : "penality 1",
        "ttc" : "33.23", 
        "date" : "07/12/2022",   

    },
    {
        "id" : 2,
        "number" : "D231",
        "facture" : factures[1],
        "penalty" : "penality 2",
        "ttc" : "44.22", 
        "date" : "07/12/2022",   

    },
]
