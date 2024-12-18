import { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
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
import Grid from '@mui/system/Grid';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Calendar, theme, Image, Row } from 'antd';
import Autocomplete from '@mui/material/Autocomplete';
import InfoIcon from '@mui/icons-material/Info';
import moment from 'moment';
import dayjs from 'dayjs';
import { Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actUserUpdateAsync, actUserDelete, resetUserSuccess, actUserDeleteAsync } from 'src/store/users/action';
import DeleteDialog from '../../pages/delete';
import { validateFormData, isRequired, isValidPassword, isPhone, isEmail } from '../formValidation';


const currentYear = new Date().getFullYear();
const options = [
  { name: `${currentYear - 1}`, value: currentYear - 1 },
  { name: `${currentYear}`, value: currentYear },
  { name: `${currentYear + 1}`, value: currentYear + 1 },
];

const getStatusLabel = (status) => {
  switch (status) {
    case 1:
      return 'Hoạt động';
    case 2:
      return 'Không hoạt động';
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
      return 'error'; // Xám
    case 3:
      return 'error';   // Đỏ
    default:
      return 'default';
  }
};
export default function UserTableRow({
  name,
  avatarUrl,
  gender,
  email,
  phone,
  gold,
  id: userId,  // Đổi tên id props thành userId
  dateOfBirth,
  rowKey,
  schoolYears,
  image_Url,
  highSchoolName,
  status
}) {
  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [formData, setformData] = useState({
    name: name,
    email: email,
    password: '',
    phone: phone,
    dateOfBirth: dateOfBirth,
    gender: gender,
    schoolYears: schoolYears
  });
  const [errors, setErrors] = useState({});
  // handle change
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const rules = {
    name: [isRequired('Tên')],
    email: [isRequired('Email'), isEmail],
    password: [isValidPassword('Mật khẩu')],
    phone: [isRequired('Số điện thoại'), isPhone],
    dateOfBirth: [isRequired('Ngày sinh')],
    schoolYears: [isRequired('Năm học')],
    gender: [isRequired('Giới tính')]
  };

  const validateForm = () => {
    const newErrors = validateFormData(formData, rules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useDispatch();
  const { usersSuccess } = useSelector((state) => state.usersReducer);


  const handleUpdate = () => {
    if (!validateForm()) {
      // Nếu form không hợp lệ, dừng lại và không gửi request
      return;
    }

    dispatch(actUserUpdateAsync(formData, userId));
    if (usersSuccess) {
      dispatch(resetUserSuccess());
    }
    handleCloseDialog();
  };
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
      <TableRow hover >
        <TableCell >
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

        <TableCell>{gender ? 'Nam' : 'Nữ'}</TableCell>

        <TableCell>
          {gold}
        </TableCell>
        <TableCell>
          {dateOfBirth}
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
          Cập nhật học sinh
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
                  error={!!errors.name} // Nếu có lỗi thì hiển thị lỗi
                  helperText={errors.name} // Hiển thị thông báo lỗi
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
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  label="Password"
                  name='password'
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  name='phone'
                  defaultValue={phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <Autocomplete
                  onChange={handleYearChange}
                  id="controllable-states-demo"
                  value={options.find((option) => option.value === schoolYears) || options[0]}
                  options={options} // Truyền đúng mảng options
                  getOptionLabel={(option) => option?.name || ''}
                  renderInput={(params) => <TextField {...params} label="Chọn năm học" />}
                />
                {errors.schoolYears && <Typography variant='caption' color="error">{errors.schoolYears}</Typography>}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Date Of Birth</Typography>
                <Calendar
                  fullscreen={false}
                  onPanelChange={onPanelChange}
                  onChange={onPanelChange}
                  disabledDate={(current) => current && current >= moment().endOf('day')}
                  defaultValue={formData?.dateOfBirth ? dayjs(formData.dateOfBirth, 'YYYY-MM-DD') : undefined}
                />
                {errors.dateOfBirth && <Typography variant='caption' color="error">{errors.dateOfBirth}</Typography>}
              </Grid>
              <Grid size={{ md: 6 }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  defaultValue={gender}
                  onChange={(e) => setformData({ ...formData, gender: e.target.value === 'true' })}  // So sánh giá trị trả về và chuyển đổi
                >
                  <FormControlLabel value control={<Radio />} label="Nam" />
                  <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                </RadioGroup>
                {errors.gender && <Typography color="error">{errors.gender}</Typography>} {/* Hiển thị lỗi nếu có */}
              </Grid>
            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdate} autoFocus>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteDialog open={dialog} onClose={handleCloseDialog} handleDelete={() => handleDelete()} />


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
          Chi tiết học sinh
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
                  src={image_Url || 'https://gamehow.net/upload/suckhoe_post/images/2024/11/26/2930/anh-hoc-sinh-chibi-3.jpg'}
                  style={{ zIndex: 2 }}
                />
              </Grid>
              <Grid size={{ md: 8 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }} >
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Họ và tên:
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
                      {gold}
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
                  Giới tính:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {gender ? 'Nam' : 'Nữ'}
                </Typography>
              </Grid>

            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Ngày sinh:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {dateOfBirth}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Năm học:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {value?.name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Trường cấp 3:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {highSchoolName}
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
          Cập nhật
        </MenuItem>
        <MenuItem onClick={() => handleClickOpenDialog('Delete')} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
        <MenuItem onClick={() => handleClickOpenDialog('Detail')}>
          <InfoIcon sx={{ mr: 2 }} />
          Chi tiết
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  name: PropTypes.string,
  gender: PropTypes.bool,
  gold: PropTypes.number,
  id: PropTypes.string,
  dateOfBirth: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  rowKey: PropTypes.number,
  schoolYears: PropTypes.number,
  image_Url: PropTypes.string,
  highSchoolName: PropTypes.string,
  status: PropTypes.number
};
