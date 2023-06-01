import PropTypes from 'prop-types';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Toolbar, Avatar, ButtonBase,  Typography, OutlinedInput, InputAdornment } from '@mui/material';
// component
import Iconify from 'components/iconify/Iconify';
import { IconMenu2 } from '@tabler/icons';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName }) {
  const theme = useTheme();
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search by district..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}
            
      <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
              variant="rounded"
              sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  transition: 'all .2s ease-in-out',
                  background: theme.palette.secondary.light,
                  color: theme.palette.secondary.dark,
                  '&:hover': {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light
                  }
              }}
              // onClick={handleLeftDrawerToggle}
              color="inherit"
          >
              <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
      </ButtonBase>
    </StyledRoot>
  );
}
