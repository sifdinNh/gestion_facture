import { Pen } from "lucide-react"
import { User, Facture, Payment } from "./types"

export const users : User[] = [
    {
        "id" : 1,
        "email" : "a,samir@imacid.com",
        "first_name" : "amine",
        "last_name" : "samir",
        "role" : "financier"
    },
    {
        "id" : 2,
        "email" : "r.cherrad@imacid.com",
        "first_name" : "rabii",
        "last_name" : "cherrad",
        "role" : "comptable"
    },
]

export const factures : Facture[] = [
    {
        "id" : 1,
        "No" : "D230",
        "statut" : "Phase 3",
        "totalTTC" : "57000",
        "dateEmission" : "05/12/2023", 
        "dateEcheance" : "05/02/2024",   

    },
    {
        "id" : 2,
        "No" : "D231",
        "statut" : "Phase 2",
        "totalTTC" : "350000",
        "dateEmission" : "06/02/2024", 
        "dateEcheance" : "06/04/2024",   

    },
    {
        "id" : 3,
        "No" : "D232",
        "statut" : "Phase 1",
        "totalTTC" : "800000",
        "dateEmission" : "06/06/2024", 
        "dateEcheance" : "05/08/2024",   

    },
]

export const payments : Payment[] = [
    {
        "id" : 1,
        "number" : "D230",
        "facture" : factures[0],
        "penalty" : "pénalités",
        "pen" : "2500",
        "ttc" : "57000",
        "tt" : "59500", 
        "date" : "10/02/2024",   

    },
    {
        "id" : 2,
        "number" : "D231",
        "facture" : factures[1],
        "penalty" : "Aucune",
        "pen" : "0",
        "ttc" : "35000",
        "tt" : "35000", 
        "date" : "04/03/2024",   

    },
]
