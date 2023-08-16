import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const CommandTable = () => {
    const commandes = [
        { id: 1, numero: "CMD123", statut: "En cours" },
        { id: 2, numero: "CMD456", statut: "En attente" },
        // Ajoute d'autres commandes ici
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Numéro de commande</TableCell>
                        <TableCell>Statut</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {commandes.map((commande) => (
                        <TableRow key={commande.id}>
                            <TableCell>{commande.numero}</TableCell>
                            <TableCell>{commande.statut}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CommandTable;
