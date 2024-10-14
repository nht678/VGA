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
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid2';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Calendar, theme } from 'antd';
import Autocomplete from '@mui/material/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';
import { actUserUpdateAsync, actUserDelete, resetUserSuccess, actUserDeleteAsync } from 'src/store/users/action';
import DeleteDialog from '../../pages/delete';


const options = [
  { name: '2017', value: 2017 },
  { name: '2018', value: 2018 },
  { name: '2019', value: 2019 },
  { name: '2020', value: 2020 },
  { name: '2021', value: 2021 },
];


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
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [formData, setformData] = useState({
    name: name,
    email: email,
    password: '',
    phone: phone,
    dateOfBirth: dateOfBirth,
    gender: gender,
    schoolYears: ''

  });

  // handle change
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const dispatch = useDispatch();
  const { usersSuccess } = useSelector((state) => state.usersReducer);


  const handleUpdate = () => {
    dispatch(actUserUpdateAsync(formData, userId));
    if (usersSuccess) {
      // setformData({
      //   name: '',
      //   email: '',
      //   password: '',
      //   phone: '',
      //   dateOfBirth: '',
      //   schoolYears: '',
      // });
      dispatch(resetUserSuccess());
    }
    handleCloseDialog();
  };
  console.log('formData:', formData);
  const handleDelete = () => {
    dispatch(actUserDeleteAsync(userId));
    if (usersSuccess) {
      dispatch(resetUserSuccess());
    }
    handleCloseDialog();
  }
  const onPanelChange = (value, mode) => {
    setformData({ ...formData, dateOfBirth: value.format('YYYY-MM-DD') });
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
    setDialog(null);
  };
  const [value, setValue] = useState(options[0]);
  const handleYearChange = (event, newValue) => {
    setValue(newValue);
    setformData({ ...formData, schoolYears: newValue?.value });
  };


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
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  name='name'
                  label="name"
                  defaultValue={name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  id='Email'
                  name='email'
                  label="Email"
                  defaultValue={email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  label="Password"
                  name='password'
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  name='phone'
                  defaultValue={phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <Autocomplete
                  onChange={handleYearChange}
                  id="controllable-states-demo"
                  options={options} // Truyền đúng mảng options
                  getOptionLabel={(option) => option?.name || ''} // Hiển thị tên tỉnh thành
                  renderInput={(params) => <TextField {...params} label="Chọn năm học" />}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" component="div">Date Of Birth</Typography>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={onPanelChange} />
              </Grid>
              <Grid size={{ md: 6 }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  defaultValue={gender}
                  onChange={(e) => setformData({ ...formData, gender: e.target.value === 'true' })}  // So sánh giá trị trả về và chuyển đổi
                >
                  <FormControlLabel value control={<Radio />} label="Male" />
                  <FormControlLabel value={false} control={<Radio />} label="Female" />
                </RadioGroup>
              </Grid>
            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteDialog open={dialog} onClose={handleCloseDialog} handleDelete={() => handleDelete()} />
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
        <MenuItem onClick={() => handleClickOpenDialog('Delete')} sx={{ color: 'error.main' }}>
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
  gender: PropTypes.bool,
  selected: PropTypes.bool,
  gold: PropTypes.number,
  id: PropTypes.string,
  dateOfBirth: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
};
