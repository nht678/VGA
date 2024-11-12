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
import { actUpdateAdmissionInformationAsync, actDeleteAdmissionInformationAsync, actResetAdmissionInformation } from 'src/store/admissionInformation/action';
import { propTypes } from 'react-bootstrap/esm/Image';
import { message } from 'antd';

// Hàm lấy nhãn trạng thái
const getStatusLabel = (status) => {
  switch (status) {
    case true:
      return 'Active';
    case false:
      return 'Blocked';
    default:
      return 'Unknown';
  }
};

// Hàm lấy màu cho Chip dựa trên trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case true:
      return 'success'; // Xanh lá
    case false:
      return 'error';   // Đỏ
    default:
      return 'default';
  }
};

export default function UserTableRow({
  selected,
  avatarUrl,
  handleClick,
  id,
  admissionMethodName,
  majorName,
  quantityTarget,
  status,
  tuitionFee,
  year,

}) {
  console.log('id', id)
  console.log('status', status)


  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();


  const { admissionInformation, total = 0, success } = useSelector((state) => state.admissionInformationReducer);
  console.log('admissionInformation', admissionInformation)

  let userId = localStorage.getItem('userId');

  // useSelector: Lấy state từ store thông qua key
  const majors = useSelector((state) => state.majorReducer.majors);
  console.log('majors', majors);
  const admissionMethods = useSelector((state) => state.admissionMethodReducer.admissionMethods);
  console.log('admissionMethods', admissionMethods);


  const handleDelete = () => {
    // console.log("id",id);
    dispatch(actDeleteAdmissionInformationAsync(id));
    if (success) {
      dispatch(actResetAdmissionInformation());
    }
    handleCloseDialog();
  }


  const validateForm = () => {
    let newError = {};
    if (!formData.majorId) {
      newError.majorId = 'Vui lòng chọn ngành';
    }
    if (!formData.admissionMethodId) {
      newError.admissionMethodId = 'Vui lòng chọn phương thức tuyển sinh';
    }
    if (!formData.tuitionFee) {
      newError.tuitionFee = 'Vui lòng nhập học phí';
    }
    if (!formData.year) {
      newError.year = 'Vui lòng nhập năm';
    }
    if (!formData.quantityTarget) {
      newError.quantityTarget = 'Vui lòng nhập số lượng mục tiêu';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };


  const [majorInputValue, setMajorInputValue] = useState(''); // Input của trường ngành học
  const [majorValue, setMajorValue] = useState(null); // Giá trị đã chọn cho ngành học

  const [admissionMethodInputValue, setAdmissionMethodInputValue] = useState(''); // Input của trường phương thức tuyển sinh
  const [admissionMethodValue, setAdmissionMethodValue] = useState(null); // Giá trị đã chọn cho phương thức tuyển sinh

  const [yearInputValue, setYearInputValue] = useState(''); // Input của trường năm
  const [yearValue, setYearValue] = useState(null); // Giá trị đã chọn cho năm

  const [error, setError] = useState({});

  const handleMajorChange = (event, newValue) => {
    setMajorValue(newValue?.id);
    setFormData({
      ...formData,
      majorId: newValue?.id
    });
  };

  const handleAdmissionMethodChange = (event, newValue) => {
    setAdmissionMethodValue(newValue?.id);
    setFormData({
      ...formData,
      admissionMethodId: newValue?.id
    });
  };


  const handleYearChange = (event, newValue) => {
    setYearValue(newValue?.value);
    setFormData({
      ...formData,
      year: newValue?.value
    });
  };


  const options = [
    { name: '2017', value: 2017 },
    { name: '2018', value: 2018 },
    { name: '2019', value: 2019 },
    { name: '2020', value: 2020 },
    { name: '2021', value: 2021 },
    { name: '2022', value: 2022 },
    { name: '2023', value: 2023 },
    { name: '2024', value: 2024 },
  ];





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
    majorId: '',
    admissionMethodId: '',
    quantityTarget: quantityTarget,
    tuitionFee: tuitionFee,
    year: year,
  });

  const handlechange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,

    });
  }
  const handleUpdate = () => {
    if (validateForm()) {
      dispatch(actUpdateAdmissionInformationAsync({ formData, id }));
      if (success) {
        dispatch(actResetAdmissionInformation());
      }
      handleClose();
    }
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
            <Avatar alt={majorName} src={avatarUrl} />
            <Typography variant="subtitle2" component='div' noWrap>
              {majorName}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell sx={{ textAlign: 'center' }}>{admissionMethodName}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{quantityTarget}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{tuitionFee}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{year}</TableCell>


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
          Cập nhật thông tin tuyển sinh
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 6 }}>
                <Autocomplete
                  defaultValue={majorName}
                  fullWidth
                  onChange={handleMajorChange}
                  inputValue={majorInputValue}
                  onInputChange={(event, newInputValue) => {
                    setMajorInputValue(newInputValue);
                  }}
                  id="controllable-states-demo-major"
                  options={majors || []}
                  getOptionLabel={(option) => option?.name || ''}
                  renderInput={(params) => <TextField {...params} label="Chọn ngành" />}
                />
                {error.majorId && <Typography variant='caption' color="error">{error.majorId}</Typography>}
              </Grid>

              <Grid size={{ md: 6 }}>
                <Autocomplete
                  defaultValue={admissionMethodName}
                  onChange={handleAdmissionMethodChange}
                  inputValue={admissionMethodInputValue}
                  onInputChange={(event, newInputValue) => {
                    setAdmissionMethodInputValue(newInputValue);
                  }}
                  id="controllable-states-demo-admission"
                  options={admissionMethods || []}
                  getOptionLabel={(option) => option?.name || ''}
                  renderInput={(params) => <TextField {...params} label="Chọn phương thức tuyển sinh" />}
                />
                {error.admissionMethodId && <Typography variant='caption' color="error">{error.admissionMethodId}</Typography>}
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  defaultValue={tuitionFee}
                  fullWidth
                  label="Học phí"
                  name="tuitionFee"
                  // value={formData.tuitionFee}
                  onChange={handlechange}
                />
                {error.tuitionFee && <Typography variant='caption' color="error">{error.tuitionFee}</Typography>}
              </Grid>
              <Grid size={{ md: 6 }}>
                <Autocomplete
                  defaultValue={year}
                  fullWidth
                  onChange={handleYearChange}
                  inputValue={yearInputValue}
                  onInputChange={(event, newInputValue) => {
                    setYearInputValue(newInputValue);
                  }}
                  id="controllable-states-demo-year"
                  options={options || []}
                  getOptionLabel={(option) => option?.name || ''}
                  renderInput={(params) => <TextField {...params} label="Chọn năm" />}
                />
                {error.year && <Typography variant='caption' color="error">{error.year}</Typography>}
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  defaultValue={quantityTarget}
                  fullWidth
                  label="Số lượng mục tiêu"
                  name="quantityTarget"
                  // value={formData.quantityTarget}
                  onChange={handlechange}
                />
                {error.quantityTarget && <Typography variant='caption' color="error">{error.quantityTarget}</Typography>}
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
  selected: PropTypes.bool,
  id: PropTypes.number,
  admissionMethodName: PropTypes.string,
  majorName: PropTypes.string,
  quantityTarget: PropTypes.number,
  status: PropTypes.bool,
  tuitionFee: PropTypes.number,
  year: PropTypes.number,

};
