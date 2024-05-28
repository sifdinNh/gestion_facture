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
        "No" : "samir@main.com",
        "Fournisseur" : "samir",
        "pdf" : "financier",
        "totalTTC" : "33.3",
        "date" : "ss",
    },
]
