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

// import { users } from 'src/_mock/user';

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
import Grid from '@mui/system/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Calendar, theme, Button as AntButton, message, Upload } from 'antd';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';
import { actUserGetAsync, actAddUserAsync, resetUserSuccess } from 'src/store/users/action';

import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { uploadFileAsync } from 'src/store/uploadfile/action';
import LoadingPage from 'src/pages/loading';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';




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

  console.log('usersSuccess', usersSuccess);
  console.log('students', students);

  const { loading, error, uploadSuccess } = useSelector((state) => state.uploadReducer);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [year, setYear] = useState('');
  console.log('year', year);

  const [formData, setformData] = useState({
    highSchoolId: userInfo ? userInfo.highSchoolId : '', // Đảm bảo userInfo đã được xác định
  });

  const [value, setValue] = useState('');

  const onPanelChange = (value1, mode) => {
    setformData({ ...formData, dateOfBirth: value1.format('YYYY-MM-DD') });

  };

  // handlechange
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = () => {
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
          highSchoolId: userInfo ? userInfo.highSchoolId : '',
        });
      }
    } catch (e) {
      message.error('Add user failed');
    }


    setOpen(true);
  };


  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const dataFiltered = applyFilter({
    inputData: students,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  // write code here
  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Year = [
    { label: '2017', year: 2017 },
    { label: '2018', year: 2018 },
    { label: '2019', year: 2019 },
    { label: '2020', year: 2020 },
    { label: '2021', year: 2021 },
  ];

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

      // Tách header và rows
      const [headers, ...rows] = jsonData;

      // Lọc bỏ các hàng trống
      const filteredRows = rows.filter(row =>
        row.some(cell => cell !== undefined && cell !== null && cell !== '')
      );

      // Chuyển đổi các hàng còn lại thành các object dựa trên headers
      const formattedData = filteredRows.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });

      // Lấy ngày gửi hiện tại
      const currentDate = new Date().toISOString();  // ISO format (yyyy-mm-ddThh:mm:ss)

      // Chuẩn bị dữ liệu gửi đi kèm tên file và ngày gửi
      const payload = {
        data: formattedData,
        fileName: selectedFile.name,
        uploadDate: currentDate,
      };
      const payloadString = JSON.stringify(payload);
      const formUpload = new FormData();
      formUpload.append('stringJson', payloadString);
      formUpload.append('highschoolId', userInfo.highSchoolId);
      formUpload.append('schoolYear', year);
      // Log FormData entries to console
      // formUpload.forEach((value1, key) => {
      //   console.log(`${key}:`, value1);
      // });

      dispatch(uploadFileAsync(formUpload));
      // if (uploadSuccess) {
      //   message.success(`${selectedFile.name} file uploaded and converted successfully`);
      //   setOpen(false);
      // } else {
      //   message.error(`${selectedFile.name} file upload failed.`);
      // }
      setOpen(false);
    };

    reader.readAsArrayBuffer(selectedFile);

  };


  useEffect(() => {
    dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage, search: filterName, schoolYears: filterYear }));
  }, [page, rowsPerPage, usersSuccess]);


  const [search, setSearch] = useState('');
  const getCurrentYear = () => new Date().getFullYear();

  // Gọi hàm
  console.log(getCurrentYear()); // Sẽ in ra năm hiện tại, ví dụ: 2024
  const [filterYear, setFilterYear] = useState(getCurrentYear);

  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(actUserGetAsync({ page: 1, pageSize: rowsPerPage, search: filterValue, schoolYears: filterYear }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actUserGetAsync({ page: 1, pageSize: rowsPerPage }));
    }
  };

  const handleFilter = (selectedYear) => {
    console.log('schoolYearsoption', selectedYear);
    setFilterYear(selectedYear);
    // Gọi API với giá trị filter
    dispatch(actUserGetAsync({ page: 1, pageSize: rowsPerPage, schoolYears: selectedYear, search: filterName }));
    handleClose(); // Đóng menu sau khi chọn
  };

  // const [inputValue, setInputValue] = useState('');
  const handleYearChange = (event, newValue) => {
    setValue(newValue);
    setformData({ ...formData, schoolYears: newValue?.value });
  };



  console.log('form', formData);
  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Học sinh</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateStudent')}>
            Tạo học sinh
          </Button>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateUpload')}>
            Tạo học sinh từ file
          </Button>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateGold')}>
            Phân phối vàng
          </Button>

          <Dialog
            open={open === 'CreateGold'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1 }}>
              {"Distribute Gold"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2}>
                  <Grid size={{ md: 12 }}>
                    <TextField
                      fullWidth
                      label="Gold"
                      name='Gold'
                      // onchange setformdata
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleAddUser} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={open === 'CreateStudent'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1 }}>
              Tạo học sinh
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='name'
                      label="Tên"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
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
                      label="Số điện thoại"
                      name='phone'
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Autocomplete
                      onChange={handleYearChange}
                      id="controllable-states-demo"
                      options={options} // Truyền đúng mảng options
                      getOptionLabel={(option) => option?.name || ''} // Hiển thị tên tỉnh thành
                      renderInput={(params) => <TextField {...params} label="Chọn năm học" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Ngày Sinh</Typography>
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
                </Grid>

              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpload} autoFocus>
                Upload
              </Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleFilter={handleFilter}
          filterYear={filterYear}
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                // rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Tên' },
                  { id: 'email', label: 'Email', align: 'center' },
                  { id: 'phone', label: 'Số điện thoại', align: 'center' },
                  { id: 'gender', label: 'Giới tính' },
                  { id: 'gold', label: 'Vàng' },
                  { id: 'dateOfBirth', label: 'Ngày sinh' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((row) => (
                  <UserTableRow
                    key={row.id}
                    name={row.name || ''} // Kiểm tra row.name
                    id={row.id || ''} // Kiểm tra row.id
                    gender={row.gender || ''} // Kiểm tra row.gender
                    gold={row["gold-balance"] || 0} // Kiểm tra row["gold-balance"]
                    email={row.account?.email || ''} // Kiểm tra row.account?.email
                    phone={row.account?.phone || ''} // Kiểm tra row.account?.phone
                    avatarUrl={row.avatarUrl || ''} // Kiểm tra row.avatarUrl
                    dateOfBirth={row.dateOfBirth ? new Date(row.dateOfBirth).toISOString().split('T')[0] : ''} // Kiểm tra row.dateOfBirth
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
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