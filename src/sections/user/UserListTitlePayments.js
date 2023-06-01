import {
    Checkbox,
    Link,
    Stack,
    TableCell,
    TableRow,
    Typography,
  } from '@mui/material';
  import React, { useMemo, useState } from 'react';
  
  const UserListTilePayments = ({
    user,
    selectedUser,
    onCheckBoxClicked,
  }) => {
    const {
      date,
      district,
      cnt,
      amount,
      supervisorName,
      supervisorNumber,
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
            <Checkbox
              checked={selectedUser}
              onChange={onCheckBoxClicked}
            />
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
  
          <TableCell align="left">
            {cnt}
          </TableCell>
  
          <TableCell align="center">
            {amount}
          </TableCell>
  
          <TableCell align="center">
            {supervisorName}
          </TableCell>
  
          <TableCell align="center">
            {supervisorNumber}
          </TableCell>

        </TableRow>
  
      </>
    );
  };
  
  export default UserListTilePayments;
  