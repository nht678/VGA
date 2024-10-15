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

import { useDispatch, useSelector } from 'react-redux';
import { updateConsultant, deleteConsultant } from 'src/store/consultant/action';
import DeleteDialog from '../../pages/delete';

const getColorByLevel = (level) => {
  switch (level) {
    case 1:
      return 'green';
    case 2:
      return 'blue';
    case 3:
      return 'orange';
    case 4:
      return 'red';
    default:
      return 'black'; // Màu mặc định nếu không có level hợp lệ
  }
};

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  email,
  phone,
  handleClick,
  id,  // Đổi tên id props thành userId
  dateOfBirth,
  description,
  consultantLevelId,
  gender
}) {
  console.log('id', id)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [formData, setformData] = useState({
    name: name,
    email: email,
    password: '',
    phone: phone,
    status: true,
    doB: dateOfBirth,
    description: description,
    consultantLevelId: '',
  });
  console.log('formData1', formData)
  const { consultantLevels } = useSelector((state) => state.levelReducer);
  const [inputValue, setInputValue] = useState(''); // Giá trị input
  const [value, setValue] = useState(null); // Giá trị đã chọn
  const handleLevelChange = (event, newValue) => {
    setValue(newValue);
    setformData({ ...formData, consultantLevelId: newValue?.id || '' });
  };


  // handle change
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // if not onchange then onchange will take value default
  // use useEffect not onchange then onchange will take value default



  const dispatch = useDispatch();
  const handleUpdate = () => {

    dispatch(updateConsultant(id, formData));
    handleCloseDialog();
  };
  const handleDelete = () => {
    dispatch(deleteConsultant(id));
    handleCloseDialog();
  }
  const onPanelChange = (value1, mode) => {
    setformData({ ...formData, DateOfBirth: value1.format('YYYY-MM-DD') });
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
          {description}
        </TableCell>
        <TableCell>{gender ? 'Male' : 'Female'}</TableCell>
        <TableCell
          sx={{
            textAlign: 'center',
            color: getColorByLevel(consultantLevelId),
            fontWeight: 'bold'
          }}
        >
          {`Level ${consultantLevelId}`}
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
          Tạo người tư vấn
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  value={name}
                  name='name'
                  label="Tên"
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  value={email}
                  id='Email'
                  name='email'
                  label="Email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  name='password'
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  value={phone}
                  label="Số điện thoại"
                  name='phone'
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ md: 6 }}>
                <Typography variant="h6">Description</Typography>
                <textarea
                  style={{ width: '100%', height: '100px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
                  label="Mô tả"
                  value={description}
                  name='description'
                  placeholder='Hãy viết mô tả...'
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <Typography variant="h6">Level</Typography>
                <Autocomplete
                  onChange={handleLevelChange}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={consultantLevels || []} // Đảm bảo options luôn là một mảng
                  getOptionLabel={(option) => option?.name || ''} // Hiển thị chuỗi rỗng nếu option.name không có
                  renderInput={(params) => <TextField {...params} label="Chọn cấp độ" />}
                />
              </Grid>


              <Grid item xs={12}>
                <Typography variant="h6">Ngày sinh</Typography>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={onPanelChange} />
              </Grid>
              <Grid size={{ md: 6 }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  onChange={(e) => setformData({ ...formData, gender: e.target.value === 'true' })}  // So sánh giá trị trả về và chuyển đổi
                >
                  <FormControlLabel value control={<Radio />} label="Nam" />
                  <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                </RadioGroup>
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
  dateOfBirth: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  description: PropTypes.string,
  gender: PropTypes.bool,
  consultantLevelId: PropTypes.number,
};
