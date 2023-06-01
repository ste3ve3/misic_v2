import { filter } from 'lodash';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Scrollbar from 'components/scrollbar';
// sections
import {
  UserListHead,
  UserListTile,
  UserListToolbar,
} from 'sections/user';
import { API, useFetcher } from 'api';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  getUsers,
  deleteUser,
  editRole,
} from 'store/actions/auth';
import DataWidget from 'components/Global/DataWidget';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'district', label: 'District', alignRight: false },
  { id: 'todayTotalCollected', label: 'Today Total Collected', alignRight: false },
  { id: 'todayTicketCashCnt', label: 'Today Ticket Cash Count', alignRight: false },
  { id: 'todayTicketCashValue', label: 'Today Ticket Cash Value', alignRight: false },
  { id: 'todayTicketMobCnt', label: 'Today Ticket MobCount', alignRight: false },
  { id: 'todayTicketMobValue', label: 'Today Ticket MobValue', alignRight: false },
  { id: 'todayTicketUnpaidCnt', label: 'Today Ticket Unpaid Count', alignRight: false },
  { id: 'todayTicketUnpaidValue', label: 'Today Ticket Unpaid Value', alignRight: false },
  { id: 'pastTicketsByCashCnt', label: 'Past Tickets By Cash Count', alignRight: false },
  { id: 'pastTicketsByCashValue', label: 'Past Tickets By Cash Value', alignRight: false },
  { id: 'pastTicketsByMobCnt', label: 'Past Tickets By MobCount', alignRight: false },
  { id: 'pastTicketsByMobValue', label: 'Past Tickets By Mob Value', alignRight: false },
  { id: 'pastTicketsByUnpaidCnt', label: 'Past Tickets By Unpaid Count', alignRight: false },
  { id: 'pastTicketsByUnpaidValue', label: 'Past Tickets By Unpaid Value', alignRight: false },
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
        _user.district.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    );
  }
  return stabilizedThis.map(el => el[0]);
}

const initState = { loading: false, error: null };

const UsersPage = ({
  // users,
  getUsers,
  deleteUser,
  editRole,
  currentUser,
}) => {

  const { data, isError, isLoading } = useFetcher('/auth/getAllUsers');

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [state, setState] = useState(initState);
   
  useEffect(() => {
      if (data?.registeredUsers?.length) {
          getUsers({ users: data?.registeredUsers });
      }
  }, [data?.registeredUsers?.length]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = users?.map(n => n.district);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const users = [
    {
      date: '2025-12-22',
      district: 'Ngoma',
      todayTotalCollected: '0',
      todayTicketCashCnt: '0',
      todayTicketCashValue: '0',
      todayTicketMobCnt: '0',
      todayTicketMobValue: '0',
      todayTicketUnpaidCnt: '0',
      todayTicketUnpaidValue: '0',
      pastTicketsByCashCnt: '0',
      pastTicketsByCashValue: '0',
      pastTicketsByMobCnt: '0',
      pastTicketsByMobValue: '0',
      pastTicketsByUnpaidCnt: '2965',
      pastTicketsByUnpaidValue: '1541900',
    },
    {
      date: '2025-12-22',
      district: 'Kayonza',
      todayTotalCollected: '0',
      todayTicketCashCnt: '0',
      todayTicketCashValue: '0',
      todayTicketMobCnt: '0',
      todayTicketMobValue: '0',
      todayTicketUnpaidCnt: '0',
      todayTicketUnpaidValue: '0',
      pastTicketsByCashCnt: '0',
      pastTicketsByCashValue: '0',
      pastTicketsByMobCnt: '0',
      pastTicketsByMobValue: '0',
      pastTicketsByUnpaidCnt: '2965',
      pastTicketsByUnpaidValue: '1541900',
    },
    {
      date: '2025-12-22',
      district: 'Kirehe',
      todayTotalCollected: '0',
      todayTicketCashCnt: '0',
      todayTicketCashValue: '0',
      todayTicketMobCnt: '0',
      todayTicketMobValue: '0',
      todayTicketUnpaidCnt: '0',
      todayTicketUnpaidValue: '0',
      pastTicketsByCashCnt: '0',
      pastTicketsByCashValue: '0',
      pastTicketsByMobCnt: '0',
      pastTicketsByMobValue: '0',
      pastTicketsByUnpaidCnt: '2965',
      pastTicketsByUnpaidValue: '1541900',
    },
    {
      date: '2025-12-22',
      district: 'Rwamagana',
      todayTotalCollected: '0',
      todayTicketCashCnt: '0',
      todayTicketCashValue: '0',
      todayTicketMobCnt: '0',
      todayTicketMobValue: '0',
      todayTicketUnpaidCnt: '0',
      todayTicketUnpaidValue: '0',
      pastTicketsByCashCnt: '0',
      pastTicketsByCashValue: '0',
      pastTicketsByMobCnt: '0',
      pastTicketsByMobValue: '0',
      pastTicketsByUnpaidCnt: '2965',
      pastTicketsByUnpaidValue: '1541900',
    },
    {
      date: '2025-12-22',
      district: 'Gicumbi',
      todayTotalCollected: '0',
      todayTicketCashCnt: '0',
      todayTicketCashValue: '0',
      todayTicketMobCnt: '0',
      todayTicketMobValue: '0',
      todayTicketUnpaidCnt: '0',
      todayTicketUnpaidValue: '0',
      pastTicketsByCashCnt: '0',
      pastTicketsByCashValue: '0',
      pastTicketsByMobCnt: '0',
      pastTicketsByMobValue: '0',
      pastTicketsByUnpaidCnt: '2965',
      pastTicketsByUnpaidValue: '1541900',
    },
    {
      date: '2025-12-22',
      district: 'Musanze',
      todayTotalCollected: '0',
      todayTicketCashCnt: '0',
      todayTicketCashValue: '0',
      todayTicketMobCnt: '0',
      todayTicketMobValue: '0',
      todayTicketUnpaidCnt: '0',
      todayTicketUnpaidValue: '0',
      pastTicketsByCashCnt: '0',
      pastTicketsByCashValue: '0',
      pastTicketsByMobCnt: '0',
      pastTicketsByMobValue: '0',
      pastTicketsByUnpaidCnt: '2965',
      pastTicketsByUnpaidValue: '1541900',
    },
    {
      date: '2025-12-22',
      district: 'Rusizi',
      todayTotalCollected: '0',
      todayTicketCashCnt: '0',
      todayTicketCashValue: '0',
      todayTicketMobCnt: '0',
      todayTicketMobValue: '0',
      todayTicketUnpaidCnt: '0',
      todayTicketUnpaidValue: '0',
      pastTicketsByCashCnt: '0',
      pastTicketsByCashValue: '0',
      pastTicketsByMobCnt: '0',
      pastTicketsByMobValue: '0',
      pastTicketsByUnpaidCnt: '2965',
      pastTicketsByUnpaidValue: '1541900',
    },
    {
      date: '2025-12-22',
      district: 'Rubavu',
      todayTotalCollected: '0',
      todayTicketCashCnt: '0',
      todayTicketCashValue: '0',
      todayTicketMobCnt: '0',
      todayTicketMobValue: '0',
      todayTicketUnpaidCnt: '0',
      todayTicketUnpaidValue: '0',
      pastTicketsByCashCnt: '0',
      pastTicketsByCashValue: '0',
      pastTicketsByMobCnt: '0',
      pastTicketsByMobValue: '0',
      pastTicketsByUnpaidCnt: '2965',
      pastTicketsByUnpaidValue: '1541900',
    },
    {
      date: '2025-12-22',
      district: 'Muhanga',
      todayTotalCollected: '0',
      todayTicketCashCnt: '0',
      todayTicketCashValue: '0',
      todayTicketMobCnt: '0',
      todayTicketMobValue: '0',
      todayTicketUnpaidCnt: '0',
      todayTicketUnpaidValue: '0',
      pastTicketsByCashCnt: '0',
      pastTicketsByCashValue: '0',
      pastTicketsByMobCnt: '0',
      pastTicketsByMobValue: '0',
      pastTicketsByUnpaidCnt: '2965',
      pastTicketsByUnpaidValue: '1541900',
    },
    {
      date: '2025-12-22',
      district: 'Ruhango',
      todayTotalCollected: '0',
      todayTicketCashCnt: '0',
      todayTicketCashValue: '0',
      todayTicketMobCnt: '0',
      todayTicketMobValue: '0',
      todayTicketUnpaidCnt: '0',
      todayTicketUnpaidValue: '0',
      pastTicketsByCashCnt: '0',
      pastTicketsByCashValue: '0',
      pastTicketsByMobCnt: '0',
      pastTicketsByMobValue: '0',
      pastTicketsByUnpaidCnt: '2965',
      pastTicketsByUnpaidValue: '1541900',
    },
  ]

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

  const editUserRole = async (id, role) => {
    setState(initState);
    try {
        setState((prev) => ({ ...prev, loading: true }));
            const result = await toast.promise(
                API.patch(`/auth/assignUserRole?userId=${id}`, role),
                {
                    loading: `Updating user, please wait...`,
                    success: `Role updated successfully!`,
                    error: `Something went wrong while updating the user role, please try again!`
                },
                { position: 'top-center' }
            );
            editRole(result.data.updatedUser);
    } catch (error) {
        setState((prev) => ({
            ...prev,
            error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
        }));
    } finally {
        setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteUser = async (id) => {
      setState(initState);
      try {
          setState((prev) => ({ ...prev, loading: true }));
          await toast.promise(API.delete(`/auth/deleteUser?userId=${id}`), {
              loading: `Hold on, we are deleting this user from our system.`,
              success: `User deleted successfully`,
              error: (error) => {
                  if (error.response) {
                      return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                  } else {
                      return 'Something went wrong while deleting project, please try again';
                  }
              }
          });
          deleteUser(id);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
      }));
      } finally {
          setState((prev) => ({ ...prev, loading: false }));
      }
  }

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
      ? Math.max(0, (1 + page) * rowsPerPage - users?.length)
      : 0;

  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName,
  );

  const isNotFound = !filteredUsers.length && !!filterName;


  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
          mt={8}
        >
        </Stack>

        <Card
        style={{
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
        >
          <DataWidget
            title={'Data'}
            isLoading={isLoading && !users?.length && !isError}
            isError={
              !isLoading && isError && !users?.length ? isError : null
            }
            isEmpty={!isError && !isLoading && !users?.length}
          >
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ width: '3000px' }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={users?.length}
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
                      .map((row , index) => {
                        const selectedUser =
                          selected.indexOf(row.name) !== -1;

                        return (
                          <UserListTile
                            user={row}
                            selectedUser={selectedUser}
                            key={index}
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
              count={users?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </DataWidget>
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  users: state.auth.users,
  currentUser: state.auth.loggedInUser,
});

const mapDispatchToProps = dispatch => {
  return {
    getUsers: (data) => dispatch(getUsers(data)), 
    deleteUser: id => dispatch(deleteUser(id)),
    editRole: (id, body) => dispatch(editRole(id, body)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPage);