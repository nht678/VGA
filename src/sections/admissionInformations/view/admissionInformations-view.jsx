import { useState, useEffect, useRef } from 'react';

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

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setError] = useState({});



  const [formData, setFormData] = useState([{
    majorId: '',
    admissionMethodId: '',
    tuitionFee: 0,
    year: '',
    quantityTarget: 0,
  }]);

  const handleAddRow = () => {
    // Thêm hàng mới vào formData
    setFormData([
      ...formData,
      {
        majorId: '',
        admissionMethodId: '',
        tuitionFee: 0,
        year: defaultYear, // Sử dụng năm của hàng đầu tiên
        quantityTarget: 0,
      },
    ]);
  };
  console.log('formData', formData)


  // Lấy năm từ hàng đầu tiên (hoặc mặc định là rỗng nếu không có hàng nào)
  const defaultYear = formData[0]?.year || '';

  const handleRemoveRow = (index) => {
    // Xóa hàng dựa trên index
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleChangeField = (index, field, value) => {
    // Cập nhật giá trị cho từng hàng
    const parsedValue = field === 'tuitionFee' || field === 'quantityTarget' ? parseInt(value, 10) || 0 : value;
    // const updatedFormData = [...formData];
    // updatedFormData[index][field] = value;
    // setFormData(updatedFormData);
    const newFormData = [...formData];
    newFormData[index] = {
      ...newFormData[index],
      [field]: parsedValue,
    };

    setFormData(newFormData);
  };

  const dispatch = useDispatch();

  const { admissionInformation, total = 0, success } = useSelector((state) => state.admissionInformationReducer);
  console.log('admissionInformation', admissionInformation)

  let userId = localStorage.getItem('userId');

  // useSelector: Lấy state từ store thông qua key
  const majors = useSelector((state) => state.majorReducer.majors);
  console.log('majors', majors);
  const admissionMethods = useSelector((state) => state.admissionMethodReducer.admissionMethods);
  console.log('admissionMethods', admissionMethods);


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
    // if (!validateForm()) return;
    dispatch(actAddAdmissionInformationAsync({ formData, universityId: userId }));
    if (success) {
      dispatch(actResetAdmissionInformation());
      setFormData([{
        majorId: '',
        admissionMethodId: '',
        tuitionFee: '',
        year: '',
        quantityTarget: '',
      }]);
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

  useEffect(() => {
    dispatch(actGetAdmissionInformationAsync({ page: 1, pageSize: rowsPerPage, universityid: userId, search: filterName }));
  }, [success]);

  useEffect(() => {
    dispatch(actGetMajorsAsync({}));
    dispatch(actGetAdmissionMethodsAsync({}));
  }, []);

  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  const dialogRef = useRef();

  const handleClose = () => {
    // setFormData([{ majorId: '', admissionMethodId: '', tuitionFee: 0, year: '', quantityTarget: 0 }]);
    // setOpen(false);
    // if (dialogRef.current && dialogRef.current.contains(event.target)) {
    //   return;
    // }
    setOpen(false);  // Đóng Dialog nếu không phải click ngoài
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


  useEffect(() => {
    dispatch(actGetAdmissionInformationAsync({ page: 1, pageSize: rowsPerPage, universityid: userId, search: filterName }));
  }, [success]);

  useEffect(() => {
    dispatch(actGetMajorsAsync({}));
    dispatch(actGetAdmissionMethodsAsync({}));
  }, []);




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
            maxWidth="lg"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              {"Tạo thông tin tuyển sinh"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {/* Chọn năm một lần */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 3 }}>
                    <Autocomplete
                      fullWidth
                      value={options.find(option => option?.value === formData[0]?.year) || null}
                      onChange={(e, newValue) => {
                        // Cập nhật "năm" cho tất cả các hàng
                        setFormData(
                          formData.map(row => ({
                            ...row,
                            year: newValue?.value || '',
                          }))
                        );
                      }}
                      options={options || []}
                      getOptionLabel={(option) => option?.name || ''}
                      renderInput={(params) => <TextField {...params} label="Chọn năm" />}
                    />
                  </Grid>
                </Grid>

                {formData?.map((row, index) => (
                  <Grid container spacing={2} sx={{ mt: 1 }} key={index}>
                    <Grid size={{ md: 3 }}> {/* Đây là cách bạn sử dụng 'size' từ @mui/system */}
                      <Autocomplete
                        value={majors.find(major => major.id === formData[index].majorId) || null}
                        fullWidth
                        onChange={(e, newValue) =>
                          handleChangeField(index, 'majorId', newValue?.id)
                        }
                        options={majors || []}
                        getOptionLabel={(option) => option?.name || ''}
                        renderInput={(params) => <TextField {...params} label="Chọn ngành" />}
                      />
                    </Grid>
                    <Grid size={{ md: 3 }}>
                      <Autocomplete
                        fullWidth
                        value={admissionMethods.find(admissionMethod => admissionMethod.id === formData[index].admissionMethodId) || null}
                        onChange={(e, newValue) =>
                          handleChangeField(index, 'admissionMethodId', newValue?.id)
                        }
                        options={admissionMethods || []}
                        getOptionLabel={(option) => option?.name || ''}
                        renderInput={(params) => <TextField {...params} label="Chọn phương thức tuyển sinh" />}
                      />
                    </Grid>
                    <Grid size={{ md: 2 }}>
                      <TextField
                        fullWidth
                        label="Học phí tuyển sinh"
                        value={
                          row.tuitionFee !== undefined && row.tuitionFee !== null
                            ? new Intl.NumberFormat('vi-VN').format(row.tuitionFee) // Định dạng số
                            : ''
                        }
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\./g, ''); // Loại bỏ dấu chấm
                          const numericValue = Number(rawValue); // Chuyển sang số
                          handleChangeField(index, 'tuitionFee', numericValue); // Lưu giá trị không định dạng
                        }}
                        type="text" // Đổi thành text để hiển thị định dạng
                      />
                    </Grid>

                    <Grid size={{ md: 2 }}>
                      <TextField
                        fullWidth
                        label="Số lượng mục tiêu"
                        value={row.quantityTarget || ''}
                        onChange={(e) => handleChangeField(index, 'quantityTarget', e.target.value)}
                        type="number"  // Giới hạn nhập chỉ số
                      />
                    </Grid>
                    <Grid size={{ md: 1 }}>
                      <Button
                        color="error"
                        onClick={() => handleRemoveRow(index)}
                      >
                        Xóa
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddRow}
                  sx={{ mt: 2 }}
                >
                  Thêm hàng mới
                </Button>

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
          numSelected={0}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
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
                {admissionInformation.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    id={row?.id}
                    rowKey={index + 1}
                    admissionMethodName={row?.admissionMethodName}
                    majorName={row?.majorName}
                    majorId={row?.majorId}
                    admissionMethodId={row?.admissionMethodId}
                    quantityTarget={row?.quantityTarget}
                    status={row?.status}
                    tuitionFee={row?.tuitionFee}
                    year={row?.year}
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
