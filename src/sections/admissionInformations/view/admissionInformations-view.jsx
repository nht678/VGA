import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
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
import Autocomplete from '@mui/material/Autocomplete';

import Grid from '@mui/system/Grid';
import { message } from 'antd';



import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';

import { actGetAdmissionInformationAsync, actAddAdmissionInformationAsync, actResetAdmissionInformation } from 'src/store/admissionInformation/action';
import { actGetMajorsAsync } from 'src/store/major/action';
import { actGetAdmissionMethodsAsync } from 'src/store/admissionMethod/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';



// ----------------------------------------------------------------------

export default function AdmissionInformationsView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setError] = useState({});


  const [formData, setFormData] = useState({
    majorId: '',
    admissionMethodId: '',
    tuitionFee: 0,
    year: '',
    quantityTarget: 0,
  });

  const dispatch = useDispatch();

  const { admissionInformation, total = 0, success } = useSelector((state) => state.admissionInformationReducer);
  console.log('admissionInformation', admissionInformation)

  let userId = localStorage.getItem('userId');

  // useSelector: Lấy state từ store thông qua key
  const majors = useSelector((state) => state.majorReducer.majors);
  console.log('majors', majors);
  const admissionMethods = useSelector((state) => state.admissionMethodReducer.admissionMethods);
  console.log('admissionMethods', admissionMethods);

  // console.log('levels', levels);

  console.log('formData', formData);

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

  const handleAddAdmissionInfo = () => {
    if (!validateForm()) return;
    dispatch(actAddAdmissionInformationAsync({ formData, universityId: userId }));
    if (success) {
      dispatch(actResetAdmissionInformation());
      setFormData({
        majorId: '',
        admissionMethodId: '',
        tuitionFee: '',
        year: '',
        quantityTarget: '',
      });
      handleClose();
    }
  }

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



  // write code here


  // Đảm bảo regions được fetch một lần và cập nhật options khi regions thay đổi
  useEffect(() => {
    dispatch(actGetAdmissionInformationAsync({ page: 1, pageSize: rowsPerPage, universityid: userId, search: filterName }));
    dispatch(actGetMajorsAsync({ page: 1, pageSize: 1000, search: '' }));
    dispatch(actGetAdmissionMethodsAsync({ page: 1, pageSize: 1000, search: '' }));
    // Fetch regions chỉ một lần khi component mount

  }, [dispatch, page, rowsPerPage, success]);



  // const handleAddConsultant = () => {

  //   if (!validateForm()) return;
  //   dispatch(actLevelAddAsync(formData));
  //   message.success('Tạo cấp độ tư vấn viên thành công');
  //   // dispatch((resetLevelSuccess()));
  //   setFormData({
  //     name: '',
  //     description: '',
  //     priceOnSlot: '',
  //   });
  //   handleClose();
  // }

  console.log('formData', formData)




  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // Cập nhật regionId trực tiếp từ sự kiện onChange của Autocomplete

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = admissionInformation.map((n) => n.name);
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
    dispatch(actGetAdmissionInformationAsync({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actGetAdmissionInformationAsync({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
  };

  // write code here
  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(actGetAdmissionInformationAsync({ page: 1, pageSize: rowsPerPage, search: filterValue, universityid: userId }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actGetAdmissionInformationAsync({ page: 1, pageSize: rowsPerPage, universityid: userId }));
    }
  };






  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Thông tin tuyển sinh</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
            Tạo thông tin tuyển sinh
          </Button>


          <Dialog
            open={open === 'Create'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              {"Tạo thông tin tuyển sinh"}
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 6 }}>
                    <Autocomplete
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
              <Button onClick={handleAddAdmissionInfo} autoFocus>
                Tạo mới
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
                  { id: 'majorName', label: 'Ngành' },
                  { id: 'admissionMethodName', label: 'Phương thức tuyển sinh', align: 'center' },
                  { id: 'quantityTarget', label: 'Số lượng mục tiêu', align: 'center' },
                  { id: 'tuitionFee', label: 'Học phí', align: 'center' },
                  { id: 'year', label: 'Năm', align: 'center' },
                  { id: 'status', label: 'Trạng thái', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {admissionInformation.map((row) => (
                  <UserTableRow
                    key={row?.id}
                    id={row?.id}
                    admissionMethodName={row?.admissionMethodName}
                    majorName={row?.majorName}
                    quantityTarget={row?.quantityTarget}
                    status={row?.status}
                    tuitionFee={row?.tuitionFee}
                    year={row?.year}
                    avatarUrl={row?.avatarUrl}
                    selected={selected.indexOf(row?.name) !== -1}
                    handleClick={(event) => handleClick(event, row?.name)}
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
