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

export default function ConsultantAccountView() {

  const dispatch = useDispatch();
  const { consultants, total = 0, successConsultant } = useSelector((state) => state.consultantReducer);
  const { consultantLevels } = useSelector((state) => state.levelReducer);

  let userId = localStorage.getItem('userId');

  const [page, setPage] = useState(0);
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    doB: '',
    description: '',
    consultantLevelId: '',
    universityId: userId,
  });

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [options, setOptions] = useState([]); // Danh sách tỉnh thành
  const [value, setValue] = useState(null); // Giá trị đã chọn
  const [inputValue, setInputValue] = useState(''); // Giá trị input

  const onPanelChange = (value1, mode) => {
    setformData({ ...formData, doB: value1.format('YYYY-MM-DD') });
  };

  const [errors, setErrors] = useState({});

  // handlechange
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Tên là bắt buộc';
    }
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    }
    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    }
    // Kiểm tra định dạng số điện thoại (đơn giản)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!formData.doB) {
      newErrors.doB = 'Ngày sinh là bắt buộc';
    }
    if (!formData.description) {
      newErrors.description = 'Mô tả là bắt buộc';
    }
    if (!formData.consultantLevelId) {
      newErrors.consultantLevelId = 'Level là bắt buộc';
    }
    if (formData.gender === undefined) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    dispatch(getConsultants({ page: 1, pageSize: rowsPerPage, search: filterName }));
    dispatch(actLevelGetAsync({}));
    // dispatch(actLevelGetAsync)
  }, [page, rowsPerPage]);

  const handleAddConsultant = () => {
    if (!validateForm()) return;
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


  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(getConsultants({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(getConsultants({ page: 1, pageSize: rowsPerPage }));
    }
  };
  const handleFilterByLevel = async (Selectedlevel) => {
    setFilterLevel(Selectedlevel);  // Cập nhật tạm thời giá trị tìm kiếm cho input
    setFilterLevelName(`Level ${Selectedlevel}`);

    dispatch(getConsultants({ page: 1, pageSize: rowsPerPage, search: filterName, level: Selectedlevel }));
  };

  const [filterLevel, setFilterLevel] = useState('');
  const [filterLevelName, setFilterLevelName] = useState('Level');



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
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
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
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      id='Email'
                      name='email'
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
                      name='password'
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      name='phone'
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
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
                    {errors.description && <Typography variant='caption' color="error">{errors.description}</Typography>} {/* Hiển thị lỗi nếu có */}
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
                      error={!!errors.consultantLevelId}
                      helperText={errors.consultantLevelId}
                    />
                    {errors.consultantLevelId && <Typography variant='caption' color="error">{errors.consultantLevelId}</Typography>} {/* Hiển thị lỗi nếu có */}
                  </Grid>


                  <Grid item xs={12}>
                    <Typography variant="h6">Ngày sinh</Typography>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={onPanelChange} />
                    {errors.doB && <Typography variant='caption' color="error">{errors.doB}</Typography>} {/* Hiển thị lỗi nếu có */}
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
                    {errors.gender && <Typography color="error">{errors.gender}</Typography>} {/* Hiển thị lỗi nếu có */}
                  </Grid>

                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={handleAddConsultant} autoFocus>
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
          filterLevel={filterLevel}
          filterLevelName={filterLevelName}
          consultantLevels={consultantLevels}
          handleFilterByLevel={handleFilterByLevel}
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
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
                {consultants.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    id={row?.id || ''}
                    rowKey={index + 1}
                    name={row.name || ''}
                    email={row?.email || ''}
                    phone={row?.phone || ''}
                    avatarUrl={row.avatarUrl || ''}
                    description={row.description || ''}
                    consultantLevelId={row?.consultantLevel?.id || ''}
                    gender={row?.gender || ''}
                    dateOfBirth={row.dateOfBirth ? new Date(row.dateOfBirth).toISOString().split('T')[0] : ''}
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
  )
  // );
}  