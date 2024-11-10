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
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { useDispatch, useSelector } from 'react-redux';
import DeleteDialog from 'src/pages/delete';
import { actUniversityUpdateAsync, actUniversityDeleteAsync, resetUniversitySuccess } from 'src/store/university/action';
import { propTypes } from 'react-bootstrap/esm/Image';

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
const options = ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];


export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  handleClick,
  id,
  email,
  phone,
  typeUniversity,
  status,
  description,
  goldBalance,
  code,
  establishedYear
}) {


  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  const { successUniversity } = useSelector((state) => state.reducerUniversity);

  const handleDelete = () => {
    dispatch(actUniversityDeleteAsync(id));
    if (successUniversity) {
      dispatch(resetUniversitySuccess());
    }
    handleCloseDialog();
  }

  const validateForm = () => {
    let newErrors = {};
    if (!formData.code) {
      newErrors.code = 'Vui lòng nhập mã trường đại học';
    }
    if (!formData.establishedYear) {
      newErrors.establishedYear = 'Vui lòng chọn năm thành lập';
    }
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }
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
    if (!formData.type) {
      newErrors.type = 'Vui lòng chọn loại trường';
    }
    if (!formData.description) {
      newErrors.description = 'Vui lòng nhập mô tả';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleClickOpenDialog = (type) => {
    setDialog(type);
    setOpenDialog(null);
  };

  const handleCloseDialog = () => {
    setDialog('');
    setOpenMenu(null);
    setOpenDialog(false);
  };

  const [formData, setFormData] = useState({
    code: code,
    name: name,
    email: email,
    phone: phone,
    password: '',
    description: description,
    establishedYear: '',
    type: typeUniversity,
  });


  const handlechange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,

    });
  }

  const handleOpen = () => {
    setOpen(true);
  };


  const handlechangeType = (e) => {
    setFormData({
      ...formData,
      type: e.target.value,
    });
  };


  const handleYearChange = (event, newValue) => {
    setValue(newValue);
    setFormData({ ...formData, establishedYear: newValue });
  };



  const handleUpdateUniversity = () => {
    if (!validateForm()) return;
    dispatch(actUniversityUpdateAsync({ formData, id }));
    if (successUniversity) {
      dispatch(resetUniversitySuccess());
      // setFormData({
      //   name: '',
      //   email: '',
      //   phone: '',
      //   password: '',
      //   address: '',
      //   description: '',
      //   establishedYear: '',
      // });
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
    setOpen(false);
  };

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  console.log('formData', formData)



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
          {typeUniversity === 1 ? 'Trường công lập' : 'Trường tư thục'}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {description}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {establishedYear}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {goldBalance}
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
                  defaultValue={code}
                  name='code'
                  label="Mã trường"
                  onChange={handlechange}
                  error={!!errors.code}
                  helperText={errors.code}
                />
              </Grid>
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
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="demo-controlled-open-select-label">Trường</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    // value={age}
                    label="Trường"
                    onChange={handlechangeType}
                  >
                    <MenuItem value={1}>Trường công lập</MenuItem>
                    <MenuItem value={2}>Trường tư</MenuItem>
                  </Select>
                </FormControl>
                {errors.type && <Typography variant='caption' color="error">{errors.type}</Typography>}
              </Grid>



              <Grid size={{ md: 6 }}>
                <Autocomplete
                  value={value}
                  onChange={handleYearChange}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  options={options}
                  renderInput={(params) => <TextField {...params} label="Năm thành lập" />}
                />
                {errors.establishedYear && <Typography variant='caption' color="error">{errors.establishedYear}</Typography>}
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Mô tả</Typography>
                <textarea name='description' onChange={handlechange} placeholder="Hãy viết mô tả..." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                  defaultValue={description}
                />
                {errors.description && <Typography variant='caption' color="error">{errors.description}</Typography>}

              </Grid>


            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy bỏ</Button>
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
        open={!!openMenu}
        anchorEl={openMenu}
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
  // address: PropTypes.string,
  status: PropTypes.number,
  description: propTypes.string,
  goldBalance: PropTypes.number,
  code: PropTypes.number,
  establishedYear: PropTypes.string,
  typeUniversity: PropTypes.number,
};
