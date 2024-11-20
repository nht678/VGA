import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// import { users } from 'src/_mock/user';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/system/Grid';
import { message } from 'antd';



import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';

import { actUniversityAddAsync, actUniversityGetAsync, resetUniversitySuccess } from 'src/store/university/action';
import { actGetRegionAsync } from 'src/store/region/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';


// ----------------------------------------------------------------------

const options = ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

export default function UniversityView() {
  const [page, setPage] = useState(0);



  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [errors, setErrors] = useState({});

  const [open, setOpen] = useState(false);
  console.log('open', open)

  const [openDialog, setOpenDialog] = useState('');

  console.log('option', options)
  const [value, setValue] = useState(null); // Giá trị đã chọn
  console.log('value', value);
  const [inputValue, setInputValue] = useState(''); // Giá trị input\
  console.log('inputValue', inputValue);

  const dispatch = useDispatch();

  const { universities = [], successUniversity, total } = useSelector((state) => state.reducerUniversity);
  console.log('universities', universities);
  console.log('successUniversity', successUniversity)



  const [formData, setFormData] = useState({
    code: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    description: '',
    establishedYear: '',
    type: '',
  });




  // write code here





  const handleAddUniversity = () => {
    if (!validateForm()) return;
    dispatch(actUniversityAddAsync(formData));
    if (successUniversity) {
      dispatch((resetUniversitySuccess()));
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        description: '',
        establishedYear: '',
        type: '',
      });
    }

    handleCloseDialog();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.code) {
      newErrors.code = 'Mã trường không được để trống';
    }
    if (!formData.establishedYear) {
      newErrors.establishedYear = 'Năm thành lập không được để trống';
    }
    if (!formData.name) {
      newErrors.name = 'Tên không được để trống';
    }
    if (!formData.email) {
      newErrors.email = 'Email không được để trống';
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
      newErrors.phone = 'Số điện thoại không được để trống';
    }
    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    }
    if (!formData.type) {
      newErrors.type = 'Trường không được để trống';
    }
    if (!formData.description) {
      newErrors.description = 'Mô tả không được để trống';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleYearChange = (event, newValue) => {
    setValue(newValue);
    setFormData({ ...formData, establishedYear: newValue });
  };

  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlechangeType = (e) => {
    setFormData({
      ...formData,
      type: e.target.value,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actUniversityGetAsync({ page: newPage + 1, pageSize: rowsPerPage, search: filterName })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actUniversityGetAsync({ page: 1, pageSize: newRowsPerPage, search: filterName })); // Gọi API với `pageSize` mới
  };

  const handleClickOpen = (Typedialog) => {
    setOpenDialog(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog('');
  };

  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(actUniversityGetAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actUniversityGetAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    }
  };

  useEffect(() => {
    dispatch(actUniversityGetAsync({ page: page + 1, pageSize: rowsPerPage }));
    // Fetch regions chỉ một lần khi component mount

  }, [successUniversity]);


  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Trường đại học</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
            Tạo trường đại học
          </Button>
          <Dialog
            open={openDialog === 'Create'}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              Tạo trường đại học
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
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
                    <textarea name='description' onChange={handlechange} placeholder="Hãy viết Mô tả....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                    {errors.description && <Typography variant='caption' color="error">{errors.description}</Typography>}
                  </Grid>


                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Hủy bỏ</Button>
              <Button onClick={handleAddUniversity} autoFocus>
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
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead

                numSelected={0}
                headLabel={[
                  { id: 'name', label: 'Tên' },
                  { id: 'email', label: 'Email', align: 'center' },
                  { id: 'phone', label: 'Số điện thoại', align: 'center' },
                  { id: 'Type', label: 'Trường', align: 'center' },
                  { id: 'description', label: 'Mô tả', align: 'center' },
                  { id: 'establishedYear', label: 'Năm thành lập', align: 'center' },
                  { id: 'goldBalance', label: 'Số điểm', align: 'center' },
                  { id: 'status', label: 'Tình trạng', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {universities.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    rowKey={index + 1}
                    name={row?.account?.name}
                    email={row?.account?.email}
                    phone={row?.account?.phone}
                    typeUniversity={row?.type}
                    description={row?.description}
                    id={row?.id}
                    status={row?.account?.status}
                    avatarUrl={row?.image_Url}
                    goldBalance={row?.account?.wallet?.goldBalance}
                    code={row?.code}
                    establishedYear={row?.establishedYear}
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
          rowsPerPageOptions={[10, 25]}
        />


      </Card>
    </>
  );
}
