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

import { actAddMajorAsync, actGetMajorsAsync, resetMajor } from 'src/store/major/action';
import { actGetMajorCategoriesAsync } from 'src/store/majorCategory/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';


// ----------------------------------------------------------------------

export default function MajorView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setError] = useState({});

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    majorCategoryId: '',
  });

  console.log('formData', formData);

  const validateForm = () => {
    let newError = {};
    if (!formData.code) {
      newError.code = 'Mã ngành không được để trống';
    }
    if (!formData.name) {
      newError.name = 'Tên ngành không được để trống';
    }
    if (!formData.description) {
      newError.description = 'Mô tả ngành không được để trống';
    }
    if (!formData.majorCategoryId) {
      newError.majorCategoryId = 'Thể loại ngành không được để trống';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };


  // write code here

  const dispatch = useDispatch();

  const { majors, total = 0, success } = useSelector((state) => state.majorReducer);
  console.log('majors', majors)
  const { majorCategories } = useSelector((state) => state.majorCategoryReducer);
  console.log('majorCategories', majorCategories);
  // console.log('levels', levels);

  const [majorCategoriesValue, setMajorCategoriesValue] = useState(null); // Giá trị đã chọn
  const [majorCategoriesInputValue, setMajorCategoriesInputValue] = useState(''); // Giá trị input

  const handleMajorCategoriesChange = (event, newValue) => {
    setMajorCategoriesValue(newValue);
    setFormData((prevData) => ({
      ...prevData,
      majorCategoryId: newValue?.id || '', // Cập nhật regionId khi giá trị thay đổi
    }));
  };

  // Đảm bảo regions được fetch một lần và cập nhật options khi regions thay đổi
  useEffect(() => {
    dispatch(actGetMajorsAsync({ page: page + 1, pageSize: rowsPerPage }));
    dispatch(actGetMajorCategoriesAsync({ page: 1, pageSize: 1000, search: '' }));
    // Fetch regions chỉ một lần khi component mount

  }, [dispatch, page, rowsPerPage, success]);



  const handleAddMajor = async () => {
    if (validateForm()) {
      dispatch(actAddMajorAsync(formData));
      setFormData({
        code: '',
        name: '',
        description: '',
        majorCategoryId: '',
      });
      setMajorCategoriesValue(null);
      dispatch(resetMajor());
      handleClose();
    }
  };



  console.log('formData', formData)



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

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = majors.map((n) => n.name);
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
    dispatch(actGetMajorsAsync({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actGetMajorsAsync({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
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
      dispatch(actGetMajorsAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actGetMajorsAsync({ page: 1, pageSize: rowsPerPage }));
    }
  };







  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Ngành học</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
            Tạo ngành học
          </Button>


          <Dialog
            open={open === 'Create'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              Tạo ngành học
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='code'
                      label="Mã ngành"
                      onChange={handlechange}
                      error={!!error.code}
                      helperText={error.code}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='name'
                      label="Tên"
                      onChange={handlechange}
                      error={!!error.name}
                      helperText={error.name}
                    />
                  </Grid>

                  <Grid size={{ md: 6 }}>
                    <Autocomplete
                      fullWidth
                      value={majorCategoriesValue}
                      onChange={handleMajorCategoriesChange}
                      inputValue={majorCategoriesInputValue}
                      onInputChange={(event, newInputValue) => {
                        setMajorCategoriesInputValue(newInputValue);
                      }}
                      id="majorCategories"
                      options={majorCategories}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} label="Thể loại ngành" />}
                    />
                    {error.majorCategoryId && <Typography variant='caption' color="error" >{error.majorCategoryId}</Typography>}
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Mô tả</Typography>
                    <textarea name='description' onChange={handlechange} placeholder="Hãy viết Mô tả....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                    {error.description && <Typography variant='caption' color="error" >{error.description}</Typography>}
                  </Grid>


                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={handleAddMajor} autoFocus>
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
                  { id: 'code', label: 'Mã ngành' },
                  { id: 'name', label: 'Tên', align: 'center' },
                  { id: 'majorCategoryName', label: 'Thể loại ngành', align: 'center' },
                  { id: 'description', label: 'Mô tả', align: 'center' },
                  { id: 'status', label: 'Tình trạng', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {majors.map((row) => (
                  <UserTableRow
                    key={row?.id}
                    id={row?.id}
                    code={row?.code}
                    name={row?.name}
                    majorCategoryName={row?.majorCategoryName}
                    majorCategoryId={row?.majorCategoryId}
                    description={row?.description}
                    status={row?.status}
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
