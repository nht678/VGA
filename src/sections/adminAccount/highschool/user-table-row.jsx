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
import InfoIcon from '@mui/icons-material/Info';

import { useDispatch, useSelector } from 'react-redux';
// import DeleteDialog from 'src/pages/delete';
import { actHighSchoolDeleteAsync, actHighSchoolUpdateAsync, resetHighSchoolSuccess } from 'src/store/highschool/action';
import { actUserBan } from 'src/store/users/action';
import DeleteDialog from 'src/pages/delete';
import { Image } from 'antd';
import { validateFormData, isRequired, isEmail, isPhone } from '../../formValidation';

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
  name,
  avatarUrl,
  id,
  email,
  phone,
  address,
  status,
  goldBalance,
  rowKey,
  accountId,
  regionId,
  image_Url
}) {

  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { successHighSchool } = useSelector((state) => state.highschoolReducer);
  const { regions } = useSelector((state) => state.regionReducer);
  const handleBan = async () => {
    const changeStatus = status === 1 ? 2 : 1;
    await dispatch(actUserBan({ changeStatus, accountId }));
    if (successHighSchool) {
      dispatch(resetHighSchoolSuccess());
    }
    handleCloseDialog();
    handleCloseMenu();
  };
  const rules = {
    name: [isRequired('Tên')],
    email: [isRequired('Email'), isEmail],
    phone: [isRequired('Số điện thoại'), isPhone],
    address: [isRequired('Địa chỉ')],
    regionId: [isRequired('Tỉnh thành')],
  };

  const validateForm = () => {
    const newErrors = validateFormData(formData, rules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    setDialog('');
  };
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    phone: phone,
    address: address,
    regionId: regionId,
  });
  console.log('regionId', regionId);

  const handlechange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleUpdateHighSchool = () => {
    console.log('formData1', formData);
    if (!validateForm()) {
      return;
    }
    dispatch(actHighSchoolUpdateAsync({ formData, id }));
    if (successHighSchool) {
      dispatch(resetHighSchoolSuccess());
      setFormData((prevData) => ({
        ...prevData,
      }));
    }
    handleCloseDialog();
  }

  // Cập nhật regionId trực tiếp từ sự kiện onChange của Autocomplete
  const handleRegionChange = (event, newValue) => {
    setValue(newValue);
    setFormData((prevData) => ({
      ...prevData,
      regionId: newValue?.id || '', // Cập nhật regionId khi giá trị thay đổi
    }));
  };

  const handleClose = () => {
    setDialog(null);
  };

  const [value, setValue] = useState(null);

  return (
    <>
      <TableRow hover >
        <TableCell>
          {rowKey}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell sx={{ textAlign: 'center' }}>{email}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{phone}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{goldBalance}</TableCell>

        <TableCell sx={{ textAlign: 'center' }}>
          {address}
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
          Cập nhật trường cấp 3
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
                  defaultValue={address}
                  name='address'
                  label="Địa chỉ"
                  onChange={handlechange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <Autocomplete
                  onChange={handleRegionChange}
                  value={regions.find((region) => region.id === formData.regionId) || null}
                  options={regions || []} // Đảm bảo options luôn là một mảng
                  getOptionLabel={(option) => option?.name || ''} // Hiển thị chuỗi rỗng nếu option.name không có
                  renderInput={(params) => <TextField {...params} label="Chọn tỉnh thành" />}
                />
                {errors.regionId && <Typography variant='caption' color="error">{errors.regionId}</Typography>}
              </Grid>

            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateHighSchool} autoFocus>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={dialog === 'Detail'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
        style={{ zIndex: 1 }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            marginLeft: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#1976d2', // Primary color for the title
            paddingBottom: 2,
          }}
        >
          Chi tiết trường cấp 3
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: 3 }}
          >
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 4 }}>
                <Image
                  width={200}
                  src={image_Url || "https://png.pngtree.com/png-vector/20220107/ourmid/pngtree-school-png-image_4235229.png"}
                  style={{ zIndex: 2 }}
                />
              </Grid>
              <Grid size={{ md: 8 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }} >
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Tên trường cấp 3
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {email}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Điểm
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {goldBalance}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Số điện thoại:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {phone}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Tình trạng:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {getStatusLabel(status)}
                </Typography>
              </Grid>

            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Địa chỉ:
                </Typography>
              </Grid>
              <Grid size={{ md: 9 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {address}
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog >
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
          Chỉnh sửa
        </MenuItem>
        <MenuItem onClick={() => handleClickOpenDialog('Detail')}>
          <InfoIcon sx={{ mr: 2 }} />
          Chi tiết
        </MenuItem>
        <MenuItem onClick={handleBan} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          {status === 1 ? 'Chặn' : 'Mở chặn'}
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  status: PropTypes.number,
  goldBalance: PropTypes.number,
  rowKey: PropTypes.number,
  accountId: PropTypes.string,
  regionId: PropTypes.string,
  image_Url: PropTypes.string,
};
