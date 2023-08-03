import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
  type,
  reference,
  dimension,
  box_quantity,
  unit_per_box,
  unit_quantity = box_quantity * unit_per_box,
) {
  return {
    type,
    reference,
    dimension,
    box_quantity,
    unit_per_box,
    unit_quantity,
    history: [
      {
        date: '2020-01-05',
        commandId: '11091700',
        amount: -2,
      },
      {
        date: '2020-01-02',
        commandId: '32445325',
        amount: 5,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.type}
        </TableCell>
        <TableCell align="right">{row.reference}</TableCell>
        <TableCell align="right">{row.dimension}</TableCell>
        <TableCell align="right">{row.box_quantity}</TableCell>
        <TableCell align="right">{row.unit_quantity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Historique
              </Typography>
              <Table size="small" aria-label="coffrage">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Bon de commande</TableCell>
                    <TableCell align="right">Quantité Panier</TableCell>
                    <TableCell align="right">Quantité Unité</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.commandId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(row.unit_per_box* historyRow.amount )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Etais', 'ST2', '225-350cm', 2, 50),
  createData('Poutrelle', 'Primaire-110', '110cm', 3, 70),
  createData('Poutrelle', 'Secondaire-180', '180cm', 2, 60),
  createData('Banche', 'Panneau double', '250cm', 4, 1),
  createData('Banche', 'Panneau simple angle', '110cm', 1, 1),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper} sx={{width: '100%'}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Matériel Coffrage</TableCell>
            <TableCell align="right">Référence</TableCell>
            <TableCell align="right">Dimensions</TableCell>
            <TableCell align="right">Quantité&nbsp;(panier)</TableCell>
            <TableCell align="right">Quantité&nbsp;(unité)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}