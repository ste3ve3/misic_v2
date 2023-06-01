import { filter } from 'lodash';
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Button,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Scrollbar from 'components/scrollbar';
// sections
import {
  UserListHead,
  UserListTilePayments,
  UserListToolbar,
} from 'sections/user';
import { API, useFetcher } from 'api';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  getUsers,
} from 'store/actions/auth';
import DataWidget from 'components/Global/DataWidget';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'district', label: 'District', alignRight: false },
  { id: 'cnt', label: 'Count', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'supervisorName', label: 'Supervisor Name', alignRight: false },
  { id: 'supervisorNumber', label: 'Supervisor Number', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      _user =>
        _user.district.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.supervisorName.toLowerCase().includes(query.toLowerCase()) ||
        _user.supervisorNumber.toLowerCase().includes(query.toLowerCase())
    );
  }
  return stabilizedThis.map(el => el[0]);
}

const initState = { loading: false, error: null };

const PaymentsPage = ({
  payments,
  getUsers,
}) => {

  const { data, isError, isLoading } = useFetcher('/payments?requestUserId=51&page=1&size=63&searchBy=&startDate=2002-05-31&endDate=2023-06-01');

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [state, setState] = useState(initState);

  console.log(data);
   
  useEffect(() => {
      if (data?.data?.length) {
          getUsers({ payments: data?.data });
      }
  }, [data?.data?.length]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = payments?.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = event => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - payments?.length)
      : 0;

  const filteredUsers = applySortFilter(
    payments,
    getComparator(order, orderBy),
    filterName,
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const exportPDF = () => {
    const unit = 'mm';
    const size = 'A4';
    const orientation = 'portrait';

    const marginLeft = 10;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);

    const data = payments.map(
      (
        {
          date,
          district,
          cnt,
          amount,
          supervisorName,
          supervisorNumber,
        },
        index,
      ) => {
        return [
          date,
          district,
          cnt,
          amount,
          supervisorName,
          supervisorNumber,
        ];
      },
    );

    let content = {
      startY: 20,
      headStyles: {
        fillColor: 'blue',
      },
      head: [
        [
          'Date',
          'District',
          'Count',
          'Amount',
          'Supervisor Name',
          'Supervisor Number',
        ],
      ],
      body: data,
      willDrawCell: function (data) {
        var doc = data.doc;
        var rows = data.table.body;
        if (rows.length === 1) {
        } else if (data.row.index === rows.length - 1) {
          // doc.setFontStyle('bold');
          doc.setFontSize('10');
          doc.setFillColor(255, 255, 255);
        }
      },
    };

    doc.text(
      `PAYMENTS REPORT FOR MILLENNIUM SAVINGS AND INVESTMENT COOPERATIVE`,
      marginLeft + 4,
      15,
    );

    doc.autoTable(content);

    const pageCount = doc.internal.getNumberOfPages();
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        'Page ' + String(i) + ' of ' + String(pageCount),
        210 - 20,
        297 - 10,
        null,
        null,
        'right',
      );
    }
    doc.save(
      `Payments Report.pdf`,
    );
  };


  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Typography variant="h3" gutterBottom>
            Payments
          </Typography>
        </Stack>

        <Card
        style={{
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
        >
          <DataWidget
            title={'Payments'}
            isLoading={isLoading && !payments?.length && !isError}
            isError={
              !isLoading && isError && !payments?.length ? isError : null
            }
            isEmpty={!isError && !isLoading && !payments?.length}
          >
            <Typography variant="h3" gutterBottom sx={{ pt: 3, pl: 3 }}>
            Total Payments made : { data?.recordsTotal}
          </Typography>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, overflowX: 'hidden' }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={payments?.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(row => {
                        const selectedUser =
                          selected.indexOf(row.name) !== -1;

                        return (
                          <UserListTilePayments
                            user={row}
                            selectedUser={selectedUser}
                            key={row._id}
                            onCheckBoxClicked={event =>
                              handleClick(event, row.name)
                            }
                          />
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={6}
                          sx={{ py: 3 }}
                        >
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>
                                &quot;{filterName}&quot;
                              </strong>
                              .
                              <br /> Try checking for typos or using
                              complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={payments?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
           <Button variant="contained" onClick={exportPDF} sx={{ marginBottom : 5, marginLeft : 5 }}>
              Export as PDF
           </Button>
          </DataWidget>
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  payments: state.auth.payments,
});

const mapDispatchToProps = dispatch => {
  return {
    getUsers: (data) => dispatch(getUsers(data)), 
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentsPage);