import * as React from 'react';
import PropTypes from 'prop-types';


import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import Iconify from 'src/components/iconify';

// const options = [
//   'Level 1',
//   'Level 2',
//   'Level 3',
//   'Level 4',
// ];

const ITEM_HEIGHT = 48;


// ----------------------------------------------------------------------

export default function UserTableToolbar({ numSelected, filterName, onFilterName, filterLevel, filterLevelName, handleFilterByLevel, consultantLevels }) {
  console.log('consultantLevels1', consultantLevels)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
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
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Tìm kiếm tư vấn viên..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Box>
          <Typography component="div" variant="h6">
            {filterLevelName}
          </Typography>
          <Tooltip title="Filter list">
            <span>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Iconify icon="ic:round-filter-list" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                  },
                }}
              >
                {/* {consultantLevels?.map((option) => (
                  <MenuItem key={option?.id} selected={option === 'Pyxis'} onClick={() => handleFilterByLevel(option?.id)}>
                    {option?.name}
                  </MenuItem>
                ))} */}
                <MenuItem
                  key="all"
                  selected={filterLevel === ""}
                  onClick={() => handleFilterByLevel("")} // Gửi chuỗi rỗng khi chọn "All"
                >
                  All
                </MenuItem>
                {consultantLevels?.map((option) => (
                  <MenuItem
                    key={option?.id}
                    selected={filterLevel === option?.id}
                    onClick={() => handleFilterByLevel(option?.id)}
                  >
                    {option?.name}
                  </MenuItem>
                ))}

              </Menu>
            </span>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filterLevel: PropTypes.string,
  handleFilterByLevel: PropTypes.func,
  consultantLevels: PropTypes.array,
  filterLevelName: PropTypes.string,
};
