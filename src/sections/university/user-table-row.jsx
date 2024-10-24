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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập tên trường đại học';
    }
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Kiểm tra định dạng số điện thoại (đơn giản)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!formData.phone) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    }
    if (!formData.address) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }
    if (!formData.description) {
      newErrors.description = 'Vui lòng nhập mô tả';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

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
    if (!validateForm()) return;
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
      message.success('Cập nhật trường đại học thành công');
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
            <Typography variant="subtitle2" component='div' noWrap>
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
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
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
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={email}
                  name='email'
                  label="Email"
                  onChange={handlechange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={phone}
                  name='phone'
                  label="Số điện thoại"
                  onChange={handlechange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  name='password'
                  label="Mật khẩu"
                  onChange={handlechange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={address}
                  name='address'
                  label="Địa chỉ"
                  onChange={handlechange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <textarea name='description' onChange={handlechange} placeholder="Hãy viết mô tả..." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                  defaultValue={description}
                />
                {errors.description && <Typography variant='caption' color="error">{errors.description}</Typography>}

              </Grid>


            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateUniversity} autoFocus>
            Cập nhật
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
          Cập nhật
        </MenuItem>
        <MenuItem onClick={() => handleClickOpenDialog('Delete')} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xóa
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
