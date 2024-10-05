import { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Calendar, theme } from 'antd';

import { useDispatch } from 'react-redux';
import { actUserUpdateAsync, actUserDelete } from 'src/store/users/action';

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  gender,
  email,
  phone,
  gold,
  handleClick,
  id: userId,  // Đổi tên id props thành userId
  dateOfBirth,
}) {
  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  // const [dialogName, setDialogName] = useState(name);
  // const [dialogGold, setDialogGold] = useState(gold);
  // const [dialogGender, setDialogGender] = useState(gender);
  // console.log("userId", userId);  // Sử dụng userId thay vì id
  // const formdata
  const [formdata, setFormdata] = useState({
    name,
    gold,
    gender,
    phone,
    email,
    dateOfBirth,
  });
  // handle change
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  // update user
  const updateUser = () => {
    const user = {
      name: formdata.name,
      gold: formdata.gold,
      gender: formdata.gender,
      phone: formdata.phone,
      email: formdata.email,
      dateOfBirth: formdata.dateOfBirth,
    };
    // console.log("id",id);
    dispatch(actUserUpdateAsync(user, userId));
    handleCloseDialog();
  };

  const dispatch = useDispatch();
  // const updateUser = () => {
  //   const user = {
  //     name: dialogName,
  //     gold: dialogGold,
  //     gender: dialogGender,
  //   }
  //   // console.log("id",id);
  //   dispatch(actUserUpdateAsync(user, userId));
  //   handleCloseDialog();
  // }
  const handleDelete = () => {
    // console.log("id",id);
    dispatch(actUserDelete(userId));
    handleCloseDialog();
  }
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickOpenDialog = (type) => {
    setDialog(type);
    setOpen(null);
  };

  const handleCloseDialog = () => {
    setDialog(null);
  };


  const handleClose = () => {
    setOpenDialog(false);
  };

  // const Year = [
  //   { label: '2017', year: 2017 },
  //   { label: '2018', year: 2018 },
  //   { label: '2019', year: 2019 },
  //   { label: '2020', year: 2020 },
  //   { label: '2021', year: 2021 },
  // ];

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{email}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{phone}</TableCell>

        <TableCell>{gender ? 'Male' : 'Female'}</TableCell>

        <TableCell>
          {gold}4000$
        </TableCell>
        <TableCell>
          {dateOfBirth}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog
        open={dialog === 'edit'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1 }}>
          {"Update student"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formdata.name}
                    onChange={handleChange}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <TextField
                    fullWidth
                    label="Gold"
                    value={formdata.gold}
                    onChange={handleChange}
                  />
                </Paper>
              </Grid>
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Autocomplete
                    disablePortal
                    options={Year}
                    value={Year.find((item) => item.year === dialogYear)}
                    onChange={(event, newValue) => {
                      setDialogYear(newValue?.year);
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Year" />}
                  />
                </Paper>
              </Grid> */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">Date Of Birth</Typography>
                  <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={formdata.gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button
            onClick={() => {
              // Handle save logic here
              updateUser();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialog === 'delete'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => handleClickOpenDialog('edit')}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleClickOpenDialog('delete')} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.string,
  gender: PropTypes.string,
  selected: PropTypes.bool,
  gold: PropTypes.string,
  id: PropTypes.string,
  dateOfBirth: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
};
