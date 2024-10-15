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

import { actUniversityAddAsync, actUniversityGetAsync, resetUniversitySuccess } from 'src/store/university/action';
import { actGetRegionAsync } from 'src/store/region/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';


// ----------------------------------------------------------------------

export default function UniversityView() {
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
    address: '',
    description: '',
  });

  const [status, setStatus] = useState('false');
  console.log('formData', formData);


  // write code here

  const dispatch = useDispatch();

  const { universities = [], successUniversity, total } = useSelector((state) => state.reducerUniversity);
  console.log('universities', universities);
  console.log('successUniversity', successUniversity)

  // Đảm bảo regions được fetch một lần và cập nhật options khi regions thay đổi
  useEffect(() => {
    dispatch(actUniversityGetAsync({ page: page + 1, pageSize: rowsPerPage }));
    // Fetch regions chỉ một lần khi component mount

  }, [dispatch, page, rowsPerPage, successUniversity]);



  const handleAddUniversity = () => {

    dispatch(actUniversityAddAsync(formData));
    if (successUniversity) {
      dispatch((resetUniversitySuccess()));
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        description: '',
      });
      message.success('Thêm trường đại học thành công');
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
      const newSelecteds = universities.map((n) => n.name);
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
    dispatch(actUniversityGetAsync({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actUniversityGetAsync({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
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

  // const handleFilterByName = async (event) => {
  //   const filterValue = event.target.value;
  //   setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

  //   if (filterValue.trim()) {
  //     dispatch(actHighSchoolGetAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
  //   } else {
  //     // Gọi lại API khi không có từ khóa tìm kiếm
  //     dispatch(actHighSchoolGetAsync({ page: 1, pageSize: rowsPerPage }));
  //   }
  // };







  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Trường đại học</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
            Tạo trường đại học
          </Button>


          <Dialog
            open={open === 'Create'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1 }}>
              {"Create HighSchool"}
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='name'
                      label="Tên"
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
                      label="Mật khẩu"
                      onChange={handlechange}

                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='address'
                      label="Địa chỉ"
                      onChange={handlechange}

                    />
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Mô tả</Typography>
                    <textarea name='description' onChange={handlechange} placeholder="Hãy viết Mô tả....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                  </Grid>


                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={handleAddUniversity} autoFocus>
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
        // onFilterName={handleFilterByName}
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
                  { id: 'description', label: 'Mô tả', align: 'center' },
                  { id: 'status', label: 'Tình trạng', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {universities.map((row) => (
                  <UserTableRow
                    key={row.id}
                    name={row?.name}
                    email={row?.account?.email}
                    phone={row?.account?.phone}
                    address={row?.address}
                    description={row?.description}
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
