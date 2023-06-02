import {
  Checkbox,
  Link,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';

const UserListTile = ({
  user,
  selectedUser,
  onCheckBoxClicked,
}) => {
  const {
    date,
    district,
    todayTotalCollected,
    todayTicketCashCnt,
    todayTicketCashValue,
    todayTicketMobCnt,
    todayTicketMobValue,
    todayTicketUnpaidCnt,
    todayTicketUnpaidValue,
    pastTicketsByCashCnt,
    pastTicketsByCashValue,
    pastTicketsByMobCnt,
    pastTicketsByMobValue,
    pastTicketsByUnpaidCnt,
    pastTicketsByUnpaidValue,
  } = user;

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selectedUser}
      >
        <TableCell padding="checkbox">

        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle1" noWrap>
              {date}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <Link color="inherit" underline="hover">
            {district}
          </Link>
        </TableCell>

        <TableCell align="center">
          {todayTotalCollected}
        </TableCell>

        <TableCell align="center">
          {todayTicketCashCnt}
        </TableCell>

        <TableCell align="center">
          {todayTicketCashValue}
        </TableCell>

        <TableCell align="center">
          {todayTicketMobCnt}
        </TableCell>

        <TableCell align="center">
          {todayTicketMobValue}
        </TableCell>

        <TableCell align="center">
          {todayTicketUnpaidCnt}
        </TableCell>

        <TableCell align="center">
          {todayTicketUnpaidValue}
        </TableCell>

        <TableCell align="center">
          {pastTicketsByCashCnt}
        </TableCell>

        <TableCell align="center">
          {pastTicketsByCashValue}
        </TableCell>

        <TableCell align="center">
          {pastTicketsByMobCnt}
        </TableCell>

        <TableCell align="center">
          {pastTicketsByMobValue}
        </TableCell>

        <TableCell align="center">
          {pastTicketsByUnpaidCnt}
        </TableCell>

        <TableCell align="center">
          {pastTicketsByUnpaidValue}
        </TableCell>

      </TableRow>

    </>
  );
};

export default UserListTile;
