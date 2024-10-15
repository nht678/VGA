import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
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

import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/system/Grid';
import { message } from 'antd';



import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';

import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { actHighSchoolGetAsync, actAddHighSchoolAsync, resetHighSchoolSuccess } from 'src/store/highschool/action';
import { actGetRegionAsync } from 'src/store/region/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';


// ----------------------------------------------------------------------

export default function HighSchoolView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    locationDetail: '',
    regionId: '',
  });

  const [status, setStatus] = useState('false');
  console.log('formData', formData);


  // write code here

  const dispatch = useDispatch();

  const { highschools, total, successHighSchool } = useSelector((state) => state.highschoolReducer);
  console.log('successHighSchool', successHighSchool);
  console.log('highschools', highschools);
  const { regions } = useSelector((state) => state.regionReducer);
  console.log('regions', regions);
  console.log('highschools', highschools);

  // Đảm bảo regions được fetch một lần và cập nhật options khi regions thay đổi
  useEffect(() => {
    dispatch(actHighSchoolGetAsync({ page: page + 1, pageSize: rowsPerPage }));
    // Fetch regions chỉ một lần khi component mount
    if (!regions || regions.length === 0) {
      dispatch(actGetRegionAsync());
    }
    setOptions(regions);
  }, [dispatch, page, rowsPerPage, successHighSchool]);



  // useEffect(() => {
  //   if (Array.isArray(regions) && regions.length > 0) {
  //     setOptions(regions);
  //   }
  // }, [regions]);
  // const ojbformData = new FormData();
  // Object.keys(formData).forEach((key) => {
  //   ojbformData.append(key, formData[key]);
  // });
  const handleAddHighSchool = () => {
    dispatch(actAddHighSchoolAsync(formData));
    if (successHighSchool) {
      message.success('Create HighSchool Success');
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
    handleClose();
  };


  const [options, setOptions] = useState([]); // Danh sách tỉnh thành
  console.log('option', options)
  const [value, setValue] = useState(null); // Giá trị đã chọn
  console.log('value', value);
  const [inputValue, setInputValue] = useState(''); // Giá trị input\
  console.log('inputValue', inputValue);

  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      regionId: value?.id || '', // Đảm bảo regionId nhận id nếu value có giá trị
    });
  };
  // Cập nhật regionId trực tiếp từ sự kiện onChange của Autocomplete
  const handleRegionChange = (event, newValue) => {
    setValue(newValue);
    setFormData((prevData) => ({
      ...prevData,
      regionId: newValue?.id || '', // Cập nhật regionId khi giá trị thay đổi
    }));
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
      const newSelecteds = highschools.map((n) => n.name);
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
    console.log('newPage', newPage);
    dispatch(actHighSchoolGetAsync({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actHighSchoolGetAsync({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
  };


  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  // const dataFiltered = applyFilter({
  //   inputData: highschools,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

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
      dispatch(actHighSchoolGetAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actHighSchoolGetAsync({ page: 1, pageSize: rowsPerPage }));
    }
  };







  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Trường cấp 3</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateStudent')}>
            Tạo trường cấp 3
          </Button>


          <Dialog
            open={open === 'CreateStudent'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1 }}>
              Tạo trường cấp 3
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='name'
                      label="tên"
                      onChange={handlechange}

                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='email'
                      label="Email"
                      onChange={handlechange}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='phone'
                      label="Số điện thoại"
                      onChange={handlechange}

                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='password'
                      label="Mật khẩu"
                      onChange={handlechange}

                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='locationDetail'
                      label="Địa chỉ"
                      onChange={handlechange}

                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Autocomplete
                      onChange={handleRegionChange}
                      // inputValue={inputValue}
                      // onInputChange={(event, newInputValue) => {
                      //   setInputValue(newInputValue);
                      // }}
                      id="controllable-states-demo"
                      options={regions.regions} // Truyền đúng mảng options
                      getOptionLabel={(option) => option?.name || ''} // Hiển thị tên tỉnh thành
                      renderInput={(params) => <TextField {...params} label="Chọn tỉnh thành" />}
                    />
                  </Grid>

                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={handleAddHighSchool} autoFocus>
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
                  { id: 'name', label: 'Tên' },
                  { id: 'email', label: 'Email', align: 'center' },
                  { id: 'phone', label: 'Số điện thoại', align: 'center' },
                  { id: 'address', label: 'Địa chỉ', align: 'center' },
                  { id: 'status', label: 'Tình trạng', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {highschools.map((row) => (
                  <UserTableRow
                    key={row.id}
                    name={row.name}
                    email={row.account?.email}
                    phone={row.account?.phone}
                    locationDetail={row?.locationDetail}
                    id={row?.id}
                    status={row?.account?.status}
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
