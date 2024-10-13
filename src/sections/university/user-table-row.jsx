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
import { actHighSchoolDeleteAsync, actHighSchoolUpdateAsync, resetHighSchoolSuccess } from 'src/store/highschool/action';
import { actGetRegionAsync } from 'src/store/region/action';

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
  locationDetail,
  status,
}) {


  console.log('status', status)
  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');

  const dispatch = useDispatch();
  const { successHighSchool } = useSelector((state) => state.highschoolReducer);
  const { regions } = useSelector((state) => state.regionReducer);

  const handleDelete = () => {
    // console.log("id",id);
    dispatch(actHighSchoolDeleteAsync(id));
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
    locationDetail: locationDetail,
    regionId: id,
  });

  const handlechange = (event) => {
    debugger
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      regionId: value?.id,

    });
  }

  const handleUpdateHighSchool = () => {
    dispatch(actHighSchoolUpdateAsync(formData, id));
    if (successHighSchool) {
      dispatch(resetHighSchoolSuccess());
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        locationDetail: '',
        regionId: '',
      });
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

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // useEffect(() => {
  //   dispatch(actGetRegionAsync());
  //   setOptions(regions);
  // }, []);

  console.log('formdata:', formData);
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

        <TableCell sx={{ textAlign: 'center' }}>
          {locationDetail}
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
          {"Update HighSchool"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={name}
                  name='name'
                  label="Name"
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
                  label="Phone"
                  onChange={handlechange}

                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  name='password'
                  label="Password"
                  onChange={handlechange}

                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={locationDetail}
                  name='locationDetail'
                  label="Address"
                  onChange={handlechange}

                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <Autocomplete
                  // value={value}
                  // onChange={(event, newValue) => {
                  //   setValue(newValue);
                  // }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  onChange={handleRegionChange}
                  id="controllable-states-demo"
                  options={regions.regions || []} // Đảm bảo options luôn là một mảng
                  getOptionLabel={(option) => option?.name || ''} // Hiển thị chuỗi rỗng nếu option.name không có
                  renderInput={(params) => <TextField {...params} label="Chọn tỉnh thành" />}
                />
              </Grid>

            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateHighSchool} autoFocus>
            Create
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
  locationDetail: PropTypes.string,
  status: PropTypes.string,
};
