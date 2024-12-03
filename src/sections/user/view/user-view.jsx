import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
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
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/system/Grid';
import { Calendar, theme, Button as AntButton, message, Upload } from 'antd';
import moment from 'moment';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSelector, useDispatch } from 'react-redux';
import { actUserGetAsync, actAddUserAsync, resetUserSuccess } from 'src/store/users/action';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { uploadFileAsync } from 'src/store/uploadfile/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';
import { validateFormData, isRequired, isValidPassword, isPhone, isEmail } from '../../formValidation';




// create option các năm học có value là năm học
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

// ----------------------------------------------------------------------

export default function UserView() {

  const dispatch = useDispatch();
  const { students = [], total, usersSuccess } = useSelector((state) => state.usersReducer);
  const getCurrentYear = () => new Date().getFullYear();
  const [filterYear, setFilterYear] = useState(getCurrentYear);
  const { uploadSuccess } = useSelector((state) => state.uploadReducer);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [year, setYear] = useState('');
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState({});


  const [formData, setformData] = useState({
    highSchoolId: userInfo ? userInfo.userId : '', // Đảm bảo userInfo đã được xác định
    name: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: new Date().toISOString().split('T')[0],
    schoolYears: '',
    gender: ''
  });

  const onPanelChange = (value1, mode) => {
    setformData({ ...formData, dateOfBirth: value1.format('YYYY-MM-DD') });
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

  // handlechange
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = () => {
    if (!validateForm()) {
      // Nếu form không hợp lệ, dừng lại và không gửi request
      return;
    }
    try {
      dispatch(actAddUserAsync(formData));
      if (usersSuccess) {
        dispatch(resetUserSuccess());
        setformData({
          name: '',
          email: '',
          password: '',
          phone: '',
          dateOfBirth: '',
          schoolYears: '',
          highSchoolId: userInfo ? userInfo.userId : '',
        });
        dispatch(resetUserSuccess());
      }
    } catch (e) {
      message.error('Add user failed');
    }
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actUserGetAsync({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actUserGetAsync({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
  };


  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const props = {
    name: 'file',
    beforeUpload(file) {
      // Lưu file đã chọn vào state
      setSelectedFile(file);
      return false;  // Ngăn chặn upload mặc định của antd
    },
  };


  const handleUpload = () => {
    if (!selectedFile) {
      message.error('Please select a file first!');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Lấy sheet đầu tiên
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Chuyển đổi sheet thành JSON với header là hàng đầu tiên
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Tách headers và rows
      const [headers, ...rows] = jsonData;

      // Lọc bỏ các hàng trống
      const filteredRows = rows.filter((row) =>
        row.some((cell) => cell !== undefined && cell !== null && cell !== '')
      );

      // Format dữ liệu
      const formattedData = filteredRows.map((row) => {
        const obj = {};

        headers.forEach((header, index) => {
          if (header === 'DateOfBirth') {
            // Đổi thành excelSerialDate: DateOfBirth
            obj.excelSerialDate = row[index];
          } else if (header === 'Phone') {
            // Đảm bảo số 0 ở đầu số điện thoại
            obj.Phone = row[index]?.toString().padStart(10, '0');
          } else {
            obj[header] = row[index];
          }
        });

        return obj;
      });

      // Lấy ngày upload hiện tại
      const currentDate = new Date().toISOString(); // ISO format (yyyy-mm-ddThh:mm:ss)

      // Chuẩn bị payload gửi đi
      const payload = {
        data: formattedData,
        fileName: selectedFile.name,
        uploadDate: currentDate,
      };

      const payloadString = JSON.stringify(payload);
      const formUpload = new FormData();
      formUpload.append('stringJson', payloadString);
      formUpload.append('highschoolId', userInfo.userId);
      formUpload.append('schoolYear', year);

      // Dispatch hành động tải lên
      dispatch(uploadFileAsync(formUpload));
      if (usersSuccess || uploadSuccess) {
        message.success('Upload file thành công');
        setformData({
          name: '',
          email: '',
          password: '',
          phone: '',
          dateOfBirth: '',
          schoolYears: '',
          highSchoolId: userInfo ? userInfo.userId : '',
        });
        setSelectedFile(null);
        dispatch(resetUserSuccess());
      }
      setOpen(false);
    };

    reader.readAsArrayBuffer(selectedFile);
  };



  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, highSchoolId: userInfo.userId, search: filterValue, schoolYears: filterYear }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, highSchoolId: userInfo.userId, search: filterValue, schoolYears: filterYear }));
    }
  };

  const handleFilter = (selectedYear) => {
    setFilterYear(selectedYear);
    // Gọi API với giá trị filter
    dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, highSchoolId: userInfo.userId, search: filterName, schoolYears: filterYear }));
    handleClose(); // Đóng menu sau khi chọn
  };

  const handleYearChange = (event, newValue) => {
    setformData({ ...formData, schoolYears: newValue?.value });
  };


  useEffect(() => {
    dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, highSchoolId: userInfo.userId, search: filterName, schoolYears: filterYear }));
  }, [usersSuccess, uploadSuccess]);


  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Danh sách học sinh năm:{filterYear}</Typography>
        <Box>
          <a
            href='https://drive.google.com/drive/folders/1P4HPFkbpw0vXuYznHgA4ZtraYqkuNmJR?hl=vi'
            target="_blank"
            rel="noopener noreferrer">
            <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} >
              Mẫu danh sách học sinh
            </Button>
          </a>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateStudent')}>
            Tạo học sinh
          </Button>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateUpload')}>
            Tạo học sinh từ file
          </Button>
          <Dialog
            open={open === 'CreateStudent'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              Tạo học sinh
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Tên"
                      defaultValue={formData?.name}
                      onChange={handleChange}
                      error={!!errors.name} // Nếu có lỗi thì hiển thị lỗi
                      helperText={errors.name} // Hiển thị thông báo lỗi
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      id="Email"
                      name="email"
                      defaultValue={formData?.email}
                      label="Email"
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      label="Mật khẩu"
                      name="password"
                      defaultValue={formData?.password}
                      onChange={handleChange}
                      error={errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      name="phone"
                      defaultValue={formData?.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Autocomplete
                      onChange={handleYearChange}
                      id="controllable-states-demo"
                      options={options} // Truyền đúng mảng options
                      getOptionLabel={(option) => option?.name || ''}
                      renderInput={(params) => <TextField {...params} label="Chọn năm học" />}
                    />
                    {errors.schoolYears && <Typography variant='caption' color="error">{errors.schoolYears}</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Ngày Sinh</Typography>
                    <Calendar
                      fullscreen={false}
                      onPanelChange={onPanelChange}
                      onChange={onPanelChange}
                      disabledDate={(current) => current && current >= moment().endOf('day')} />
                    {errors.dateOfBirth && <Typography variant='caption' color="error">{errors.dateOfBirth}</Typography>}
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="gender"
                      onChange={(e) => setformData({ ...formData, gender: e.target.value === 'true' })}
                    >
                      <FormControlLabel value control={<Radio />} label="Nam" />
                      <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                    </RadioGroup>
                    {errors.gender && <Typography variant='caption' color='error'>{errors.gender}</Typography>} {/* Hiển thị lỗi nếu có */}
                  </Grid>
                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={handleAddUser} autoFocus>
                Tạo mới
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={open === 'CreateUpload'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }} id="alert-dialog-title">
              Tạo học sinh từ file
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid size={{ md: 12 }}>
                  <DialogContentText sx={{ display: 'flex', justifyContent: 'center' }} id="alert-dialog-description">
                    <Upload  {...props} >
                      <AntButton icon={<UploadOutlined />}>Chọn để Upload file</AntButton>
                    </Upload>
                  </DialogContentText>
                </Grid>
                <Grid size={{ md: 12 }}>
                  <Autocomplete
                    onChange={(event, value1) => setYear(value1?.value || '')}
                    id="controllable-states-demo"
                    options={options}
                    getOptionLabel={(option) => option?.name || ''}
                    renderInput={(params) => <TextField {...params} label="Chọn năm học" />}
                  />
                  {errors.schoolYears && <Typography variant='caption' color="error">{errors.schoolYears}</Typography>}
                </Grid>

              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={handleUpload} autoFocus>
                Tạo mới
              </Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleFilter={handleFilter}
          filterYear={filterYear}
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
                headLabel={[
                  { id: 'name', label: 'Tên' },
                  { id: 'email', label: 'Email', align: 'center' },
                  { id: 'phone', label: 'Số điện thoại', align: 'center' },
                  { id: 'gender', label: 'Giới tính' },
                  { id: 'gold', label: 'Điểm' },
                  { id: 'dateOfBirth', label: 'Ngày sinh' },
                  { id: 'Tình trạng', label: 'Tình trạng', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {students?.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    name={row?.account?.name || ''} // Kiểm tra row.name
                    rowKey={index + 1}
                    id={row?.id || ''} // Kiểm tra row.id
                    gender={row?.gender} // Kiểm tra row.gender
                    gold={row?.account?.wallet?.goldBalance || 0} // Kiểm tra row["gold-balance"]
                    email={row.account?.email || ''} // Kiểm tra row.account?.email
                    phone={row.account?.phone || ''} // Kiểm tra row.account?.phone
                    avatarUrl={row.avatarUrl || ''} // Kiểm tra row.avatarUrl
                    dateOfBirth={row.dateOfBirth ? new Date(row.dateOfBirth).toISOString().split('T')[0] : ''} // Kiểm tra row.dateOfBirth
                    schoolYears={row?.schoolYears}
                    image_Url={row?.account?.image_Url}
                    highSchoolName={row?.highSchoolName}
                    status={row?.account?.status || ''} // Kiểm tra row.status

                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />


      </Card>
    </>
  )
  // );
}  