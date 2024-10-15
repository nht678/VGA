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
import Grid from '@mui/system/Grid';
import { Calendar, theme, Button as AntButton, message, Upload } from 'antd';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import Autocomplete from '@mui/material/Autocomplete';

import { useSelector, useDispatch } from 'react-redux';
import { getConsultants, resetConsultantSuccess, addConsultant } from 'src/store/consultant/action';
import { actLevelGetAsync } from 'src/store/level/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';






// ----------------------------------------------------------------------

export default function ConsultantView() {

  const dispatch = useDispatch();
  const { consultants, total, successConsultant } = useSelector((state) => state.consultantReducer);
  const { consultantLevels } = useSelector((state) => state.levelReducer);
  console.log('consultantLevels', consultantLevels)

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    doB: '',
    description: '',
    consultantLevelId: '',
  });

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [options, setOptions] = useState([]); // Danh sách tỉnh thành
  console.log('option', options)
  const [value, setValue] = useState(null); // Giá trị đã chọn
  console.log('value', value);
  const [inputValue, setInputValue] = useState(''); // Giá trị input

  const onPanelChange = (value1, mode) => {
    setformData({ ...formData, doB: value1.format('YYYY-MM-DD') });

  };

  console.log('formData:', formData);
  // handlechange
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getConsultants(page + 1, rowsPerPage));
    // dispatch(actLevelGetAsync)
  }, [page, rowsPerPage]);

  useEffect(() => {
    dispatch(actLevelGetAsync());
  }, []);

  const handleAddConsultant = () => {
    dispatch(addConsultant(formData));
    if (successConsultant) {
      // message.success('Add Consultant Success');
      dispatch(resetConsultantSuccess);
    };
    setformData({
      name: '',
      email: '',
      password: '',
      phone: '',
      doB: '',
      description: '',
      consultantLevelId: '',
    });

    setOpen(false);
  }




  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = consultants.map((n) => n.name);
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
    dispatch(getConsultants({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(getConsultants({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
  };


  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: consultants,
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

  const handleLevelChange = (event, newValue) => {
    setValue(newValue);
    setformData({ ...formData, consultantLevelId: newValue?.id || '' });
  };


  // write code here

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Tư vấn viên</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateConsultant')}>
            Tạo người tư vấn
          </Button>

          <Dialog
            open={open === 'CreateConsultant'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1 }}>
              Tạo người tư vấn
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
                    <Typography variant="h6">Description</Typography>
                    <textarea
                      style={{ width: '100%', height: '100px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
                      label="Mô tả"
                      name='description'
                      placeholder='Hãy viết mô tả...'
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="h6">Level</Typography>
                    <Autocomplete
                      onChange={handleLevelChange}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={consultantLevels || []} // Đảm bảo options luôn là một mảng
                      getOptionLabel={(option) => option?.name || ''} // Hiển thị chuỗi rỗng nếu option.name không có
                      renderInput={(params) => <TextField {...params} label="Chọn cấp độ" />}
                    />
                  </Grid>


                  <Grid item xs={12}>
                    <Typography variant="h6">Ngày sinh</Typography>
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
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleAddConsultant} autoFocus>
                Agree
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
                  { id: 'decription', label: 'Mô tả', align: 'center' },
                  { id: 'gender', label: 'Giới tính' },
                  { id: 'consultantLevelId', label: 'Level', align: 'center' },
                  { id: 'dateOfBirth', label: 'Ngày sinh' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((row) => (
                  <UserTableRow
                    key={row.id}
                    id={row.id || ''}
                    name={row.name || ''}
                    email={row?.email || ''}
                    phone={row?.phone || ''}
                    avatarUrl={row.avatarUrl || ''}
                    description={row.description || ''}
                    consultantLevelId={row.consultantLevelId || ''}
                    gender={row?.gender || ''}
                    dateOfBirth={row.dateOfBirth ? new Date(row.dateOfBirth).toISOString().split('T')[0] : ''}
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