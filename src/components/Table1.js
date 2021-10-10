import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'type', label: 'Event Type', minWidth: 100 },
  { id: 'name', label: 'Event Name', minWidth: 100 },

  {
    id: 'venue',
    label: 'Venue',
    minWidth:100,
    align: 'right',

  },
  {
    id: 'time',
    label: 'Time',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },

];

function createData(name,type,venue,time) {

  return { type,name,  venue, time};
}

const rows = [
  createData('Weekend Event','Environment Protection','Mumbai','4:00pm'),
  createData('Webinars for NGO','Helping the orphans','Chennai','6:30pm'),
  createData('Weekend Event','Protecing Earth','Thane','7:00pm'),
  createData('Food For Thought','Food Campaign','Mumbai','6:30pm'),
  createData('Fund Raising','Raise for Poor','Pune','10:00am'),

];

const useStyles = makeStyles({
  root: {
    width: '550px',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root} variant="outlined">
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth ,backgroundColor:"#73C6B6"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} style={{ backgroundColor:"#FFFFFF"}}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    {/*<TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />*/}
    </Paper>
  );
}