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

import Grid from '@mui/system/Grid';
import { message } from 'antd';



import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';

import { actGetAdmissionMethodsAsync, actAddAdmissionMethodAsync, resetAdmissionMethod } from 'src/store/admissionMethod/action';


import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';


// ----------------------------------------------------------------------

export default function AdmissionMethodView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setError] = useState({});

  const [options, setOptions] = useState([]); // Danh sách tỉnh thành
  console.log('option', options)
  const [value, setValue] = useState(null); // Giá trị đã chọn
  console.log('value', value);
  const [inputValue, setInputValue] = useState(''); // Giá trị input\
  console.log('inputValue', inputValue);

  const dispatch = useDispatch();

  const { admissionMethods, total = 0, success } = useSelector((state) => state.admissionMethodReducer);
  console.log('admissionMethods', admissionMethods)


  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true,
  });

  const validateForm = () => {
    let newError = {};
    if (!formData.name) {
      newError.name = 'Vui lòng nhập tên';
    }
    if (!formData.description) {
      newError.description = 'Vui lòng nhập mô tả';
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };


  // write code here


  const handleAddAdmissionMethod = async () => {
    if (validateForm()) {
      dispatch(actAddAdmissionMethodAsync(formData));
      dispatch(resetAdmissionMethod());
      setFormData({
        name: '',
        description: '',
        status: true,
      });
      handleClose();
    }
  };

  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actGetAdmissionMethodsAsync({ page: newPage + 1, pageSize: rowsPerPage, search: filterName })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actGetAdmissionMethodsAsync({ page: 1, pageSize: newRowsPerPage, search: filterName })); // Gọi API với `pageSize` mới
  };

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
      dispatch(actGetAdmissionMethodsAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actGetAdmissionMethodsAsync({ page: 1, pageSize: rowsPerPage }));
    }
  };

  useEffect(() => {
    dispatch(actGetAdmissionMethodsAsync({ page: page + 1, pageSize: rowsPerPage, search: filterName }));
    // Fetch regions chỉ một lần khi component mount

  }, [success]);



  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Phương thức tuyển sinh</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
            Tạo phương thức tuyển sinh
          </Button>


          <Dialog
            open={open === 'Create'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              Tạo mới phương thức tuyển sinh
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 12 }}>
                    <TextField
                      fullWidth
                      name='name'
                      label="Tên"
                      onChange={handlechange}
                      error={!!error.name}
                      helperText={error.name}
                    />
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
              <Button onClick={handleAddAdmissionMethod} autoFocus>
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
                headLabel={[
                  { id: 'name', label: 'Tên' },
                  { id: 'description', label: 'Mô tả', align: 'center' },
                  { id: 'status', label: 'Tình trạng', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {admissionMethods.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    id={row?.id}
                    rowKey={index + 1}
                    name={row?.name}
                    description={row?.description}
                    status={row?.status}
                    avatarUrl={row?.avatarUrl}
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