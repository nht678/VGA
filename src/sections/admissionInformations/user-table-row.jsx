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
import { Image } from 'antd';
import InfoIcon from '@mui/icons-material/Info';

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
  avatarUrl,
  id,
  admissionMethodName,
  majorName,
  quantityTarget,
  status,
  tuitionFee,
  year,
  admissionMethodId,
  majorId,
  rowKey,
}) {

  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();


  const { admissionInformation, total = 0, success } = useSelector((state) => state.admissionInformationReducer);

  let userId = localStorage.getItem('userId');

  // useSelector: Lấy state từ store thông qua key
  const majors = useSelector((state) => state.majorReducer.majors);
  const admissionMethods = useSelector((state) => state.admissionMethodReducer.admissionMethods);


  const handleDelete = () => {
    dispatch(actDeleteAdmissionInformationAsync(id));
    if (success) {
      dispatch(actResetAdmissionInformation());
    }
    handleCloseDialog();
  }

  useEffect(() => {
    // Khi majorId, admissionMethodId hoặc các giá trị khác thay đổi, cập nhật lại formData
    setFormData([{
      majorId: majorId,
      id: id,
      admissionMethodId: admissionMethodId,
      tuitionFee: tuitionFee,
      year: year,
      quantityTarget: quantityTarget,
    }]);
  }, [id, majorId, admissionMethodId, tuitionFee, year, quantityTarget]);


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
  const [formData, setFormData] = useState([{
    id: id,
    majorId: majorId,
    admissionMethodId: admissionMethodId,
    tuitionFee: tuitionFee,
    year: year,
    quantityTarget: quantityTarget,
  }]);


  const handleAddRow = () => {
    // Thêm hàng mới vào formData
    setFormData([
      ...formData,
      {
        majorId: '',
        admissionMethodId: '',
        tuitionFee: 0,
        year: '',
        quantityTarget: 0,
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    // Xóa hàng dựa trên index
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleChangeField = (index, field, value) => {
    // Cập nhật giá trị cho từng hàng
    const parsedValue = field === 'tuitionFee' || field === 'quantityTarget' ? parseInt(value, 10) || 0 : value;
    // const updatedFormData = [...formData];
    // updatedFormData[index][field] = value;
    // setFormData(updatedFormData);
    const newFormData = [...formData];
    newFormData[index] = {
      ...newFormData[index],
      [field]: parsedValue,
    };

    setFormData(newFormData);
  };

  const handleUpdateAdmissionInfo = () => {
    dispatch(actUpdateAdmissionInformationAsync({ formData }));
    if (success) {
      dispatch(actResetAdmissionInformation());
    }
    handleClose();
  }


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
      <TableRow hover>
        <TableCell >
          {rowKey}
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
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
          {"Cập nhât thông tin tuyển sinh"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {formData?.map((row, index) => (
              <Grid container spacing={2} sx={{ mt: 1 }} key={index}>
                <Grid size={{ md: 3 }}> {/* Đây là cách bạn sử dụng 'size' từ @mui/system */}
                  <Autocomplete
                    value={majors.find(major => major.id === formData[index].majorId) || null}
                    fullWidth
                    onChange={(e, newValue) =>
                      handleChangeField(index, 'majorId', newValue?.id)
                    }
                    options={majors || []}
                    getOptionLabel={(option) => option?.name || ''}
                    renderInput={(params) => <TextField {...params} label="Chọn ngành" />}
                  />
                </Grid>
                <Grid size={{ md: 3 }}>
                  <Autocomplete
                    fullWidth
                    value={admissionMethods.find(admissionMethod => admissionMethod.id === formData[index].admissionMethodId) || null}
                    onChange={(e, newValue) =>
                      handleChangeField(index, 'admissionMethodId', newValue?.id)
                    }
                    options={admissionMethods || []}
                    getOptionLabel={(option) => option?.name || ''}
                    renderInput={(params) => <TextField {...params} label="Chọn phương thức tuyển sinh" />}
                  />
                </Grid>
                <Grid size={{ md: 3 }}>
                  <Autocomplete
                    fullWidth
                    value={options.find(option => option?.value === formData[index].year) || null}
                    onChange={(e, newValue) =>
                      handleChangeField(index, 'year', newValue?.value)
                    }
                    options={options || []}
                    getOptionLabel={(option) => option?.name || ''}
                    renderInput={(params) => <TextField {...params} label="Chọn năm" />}
                  />
                </Grid>
                <Grid size={{ md: 3 }}>
                  <TextField
                    fullWidth
                    label="Học phí tuyển sinh"
                    value={new Intl.NumberFormat('vi-VN').format(row.tuitionFee || 0)} // Định dạng hiển thị
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\./g, ''); // Loại bỏ dấu chấm
                      const numericValue = Number(rawValue); // Chuyển sang số
                      handleChangeField(index, 'tuitionFee', numericValue); // Lưu giá trị không định dạng
                    }}
                    type="text" // Đặt là text để hiển thị dấu chấm
                  />
                </Grid>
                <Grid size={{ md: 3 }}>
                  <TextField
                    fullWidth
                    defaultValue={row.quantityTarget || ''}
                    label="Số lượng mục tiêu"
                    value={row.quantityTarget || ''}
                    onChange={(e) => handleChangeField(index, 'quantityTarget', e.target.value)}
                    type="number"  // Giới hạn nhập chỉ số
                  />
                </Grid>
              </Grid>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateAdmissionInfo} autoFocus>
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
          Chi tiết thông tin tuyển sinh
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
                  src="https://vietnix.vn/wp-content/uploads/2022/09/Steve-Jobs-2.webp"
                  style={{ zIndex: 2 }}
                />
              </Grid>
              <Grid size={{ md: 8 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }} >
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Ngành
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {majorName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Phương thức tuyển sinh
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {admissionMethodName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Số lượng mục tiêu
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {quantityTarget}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Học phí
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {tuitionFee}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Năm
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {year}
                </Typography>
              </Grid>

            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Trạng thái
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
  id: PropTypes.number,
  admissionMethodName: PropTypes.string,
  majorName: PropTypes.string,
  quantityTarget: PropTypes.number,
  status: PropTypes.bool,
  tuitionFee: PropTypes.number,
  year: PropTypes.number,
  majorId: PropTypes.string,
  admissionMethodId: PropTypes.string,
  rowKey: PropTypes.number,
};
