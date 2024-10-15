import { useEffect, useState } from 'react';
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
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import DeleteDialog from 'src/pages/delete';
import { actUniversityUpdateAsync, actUniversityDeleteAsync, resetUniversitySuccess } from 'src/store/university/action';
import { propTypes } from 'react-bootstrap/esm/Image';
import { message } from 'antd';

// Hàm lấy nhãn trạng thái
const getStatusLabel = (status) => {
  switch (status) {
    case 1:
      return 'Active';
    case 2:
      return 'Inactive';
    case 3:
      return 'Blocked';
    default:
      return 'Unknown';
  }
};

// Hàm lấy màu cho Chip dựa trên trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return 'success'; // Xanh lá
    case 2:
      return 'default'; // Xám
    case 3:
      return 'error';   // Đỏ
    default:
      return 'default';
  }
};

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  handleClick,
  id,
  email,
  phone,
  address,
  status,
  description,
}) {
  console.log('id', id)
  console.log('status', status)


  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');

  const dispatch = useDispatch();

  const { successUniversity } = useSelector((state) => state.reducerUniversity);

  const handleDelete = () => {
    // console.log("id",id);
    dispatch(actUniversityDeleteAsync(id));
    if (successUniversity) {
      dispatch(resetUniversitySuccess());
      message.success('Delete university success');
    }
    handleCloseDialog();
  }
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
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
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    phone: phone,
    password: '',
    address: address,
    description: description,
  });

  const handlechange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,

    });
  }

  const handleUpdateUniversity = () => {
    dispatch(actUniversityUpdateAsync({ formData, id }));
    if (successUniversity) {
      dispatch(resetUniversitySuccess());
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        description: '',
      });
      message.success('Update university success');
    }
    handleCloseDialog();
  }

  // Cập nhật regionId trực tiếp từ sự kiện onChange của Autocomplete
  // const handleRegionChange = (event, newValue) => {
  //   setValue(newValue);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     regionId: newValue?.id || '', // Cập nhật regionId khi giá trị thay đổi
  //   }));
  // };

  const handleClose = () => {
    setDialog(null);
  };

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" component='span' noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell sx={{ textAlign: 'center' }}>{email}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{phone}</TableCell>

        <TableCell sx={{ textAlign: 'center' }}>
          {address}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {description}
        </TableCell>
        <TableCell align="center">
          <Chip
            label={getStatusLabel(status)}
            color={getStatusColor(status)}
            variant="outlined"
          />
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
          {"Cập nhật thông tin trường đại học"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={name}
                  name='name'
                  label="Tên"
                  onChange={handlechange}

                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={email}
                  name='email'
                  label="Email"
                  onChange={handlechange}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={phone}
                  name='phone'
                  label="Số điện thoại"
                  onChange={handlechange}

                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  name='password'
                  label="Mật khẩu"
                  onChange={handlechange}

                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={address}
                  name='address'
                  label="Địa chỉ"
                  onChange={handlechange}

                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <textarea name='description' onChange={handlechange} placeholder="Hãy viết mô tả..." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                  defaultValue={description}
                />

              </Grid>


            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateUniversity} autoFocus>
            Tạo mới
          </Button>
        </DialogActions>
      </Dialog>



      <DeleteDialog
        open={dialog}
        onClose={handleCloseDialog}
        handleDelete={handleDelete}
      />

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
  selected: PropTypes.bool,
  id: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  status: PropTypes.number,
  description: propTypes.string,
};
