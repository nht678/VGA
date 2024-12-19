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
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/system/Grid';
import { Calendar, theme, Button as AntButton, message, Upload } from 'antd';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';
import { actGetTestLessonsAsync, actResetSuccess, actGetTypesTestLessonAsync, actUploadFileTestAsync, actChangePointTypeTestAsync } from 'src/store/testLesson/action';

import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';


import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { validateFormData, isRequired } from '../../formValidation';






// ----------------------------------------------------------------------

export default function TestLessonView() {

  const dispatch = useDispatch();
  const { testLessons = [], total, success, typestest = [] } = useSelector((state) => state.testLessonReducer);
  const getCurrentYear = () => new Date().getFullYear();

  const [filterYear, setFilterYear] = useState(getCurrentYear);

  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [errors, setErrors] = useState({});


  const [formData, setformData] = useState({
    Name: '',
    Description: '',
    TestTypeId: '',
  });

  const [formDataTestTypePoint, setformDataTestTypePoint] = useState({
    id: '',
    point: '',
  });

  const handleChangePoint = (e) => {
    dispatch(actChangePointTypeTestAsync(formDataTestTypePoint));
    setformDataTestTypePoint({
      id: '',
      point: '',
    });
    if (success) {
      dispatch(actResetSuccess());
    }
    handleClose();
  };

  // Hàm validate form

  const rules = {
    Name: [isRequired('Tên')],
    Description: [isRequired('Mô tả')],
    TestTypeId: [isRequired('Thể loại kiểm tra')],
  };

  const validateForm = () => {
    const newErrors = validateFormData(formData, rules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actGetTestLessonsAsync({ page: newPage + 1, pageSize: rowsPerPage, search: filterName })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actGetTestLessonsAsync({ page: 1, pageSize: newRowsPerPage, search: filterName })); // Gọi API với `pageSize` mới
  };


  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTestType, setSelectedTestType] = useState(''); // Loại bài test
  console.log('selectedTestType', selectedTestType);

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
    if (!validateForm()) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Xác định worksheet dựa trên loại bài test
      const worksheet =
        selectedTestType === 'MBTI Test'
          ? workbook.Sheets[workbook.SheetNames[0]] // MBTI: Worksheet 0
          : workbook.Sheets[workbook.SheetNames[1]]; // Holland: Worksheet 1

      // Chuyển đổi sheet thành JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Tách header và rows
      const [headers, ...rows] = jsonData;

      // Lọc bỏ các hàng trống
      const filteredRows = rows.filter((row) =>
        row.some((cell) => cell !== undefined && cell !== null && cell !== '')
      );

      // Xử lý dữ liệu dựa trên loại bài test
      let formattedData;
      if (selectedTestType === 'MBTI Test') {
        // MBTI Test: Content, Answer1, Answer2, Key1 -> Value1, Key2 -> Value2
        formattedData = filteredRows.map((row) => {
          const obj = {};
          headers.forEach((header, index) => {
            if (header === 'Content') obj.Content = row[index];
            else if (header === 'Answer1') obj.Answer1 = row[index];
            else if (header === 'Answer2') obj.Answer2 = row[index];
            else if (header === 'Key1') obj.Value1 = row[index];
            else if (header === 'Key2') obj.Value2 = row[index];
          });
          return obj;
        });
      } else if (selectedTestType === 'Holland Test') {
        // Holland Test: Content, Group (key trong Excel)
        formattedData = filteredRows.map((row) => {
          const obj = {};
          headers.forEach((header, index) => {
            if (header === 'Content') obj.Content = row[index];
            else if (header === 'Key') obj.Group = row[index]; // Đổi key thành Group
          });
          return obj;
        });
      }

      // Lọc bỏ các đối tượng trống
      const nonEmptyData = formattedData.filter((item) =>
        Object.keys(item).some((key) => item[key] !== undefined && item[key] !== null && item[key] !== '')
      );

      // Chuẩn bị dữ liệu gửi đi
      const payloadString = JSON.stringify(nonEmptyData);
      const formUpload = new FormData();
      formUpload.append('JsonData', payloadString);
      formUpload.append('Name', formData.Name);
      formUpload.append('TestTypeId', formData.TestTypeId);
      formUpload.append('Description', formData.Description);

      // Dispatch upload
      dispatch(actUploadFileTestAsync(formUpload));
      if (success) {
        dispatch(actResetSuccess());
        setformData({
          Name: '',
          Description: '',
          TestTypeId: '',
        });
        setSelectedFile(null);
      }
      setOpen(false);
    };

    reader.readAsArrayBuffer(selectedFile);
  };



  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(actGetTestLessonsAsync({ page: page + 1, pageSize: rowsPerPage, search: filterValue }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actGetTestLessonsAsync({ page: page + 1, pageSize: rowsPerPage, search: filterValue, }));
    }
  };

  const handleFilter = (selectedYear) => {
    setFilterYear(selectedYear);
    // Gọi API với giá trị filter
    dispatch(actGetTestLessonsAsync({ page: page + 1, pageSize: rowsPerPage, search: filterName }));
    handleClose(); // Đóng menu sau khi chọn
  };


  const handleChangeField = (field, value1) => {
    let newFormData = {
      ...formData,
      [field]: value1,
    };

    setformData(newFormData);
  };




  useEffect(() => {
    dispatch(actGetTestLessonsAsync({ page: page + 1, pageSize: rowsPerPage, search: filterName }));
    dispatch(actGetTypesTestLessonAsync());
  }, [success]);


  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} >
        <Typography sx={{ mt: 5, mb: 5, }} variant="h4">Danh sách bài kiểm tra</Typography>
        <Box>
          <a
            href="https://drive.google.com/drive/folders/1P4HPFkbpw0vXuYznHgA4ZtraYqkuNmJR?hl=vi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              sx={{ marginRight: 2 }}
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Mẫu danh sách câu hỏi
            </Button>
          </a>

          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('TestTypePoint')} >
            Điểm loại bài kiểm tra
          </Button>

          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateUpload')}>
            Tạo bài kiểm tra từ file
          </Button>

          <Dialog
            open={open === 'CreateUpload'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }} id="alert-dialog-title">
              Tạo bài kiểm tra từ file
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ md: 6 }}>
                  <Autocomplete
                    id="controllable-states-demo"
                    options={typestest}
                    onChange={(e, newValue) => {
                      handleChangeField('TestTypeId', newValue?.id);
                      setSelectedTestType(newValue?.name);
                    }}
                    getOptionLabel={(option) => option?.name || ''}
                    renderInput={(params) => <TextField {...params} label="Chọn loại kiểm tra" />}
                  />
                  {errors.TestTypeId && <Typography variant='caption' color="error">{errors.TestTypeId}</Typography>}
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    id="outlined-basic"
                    label="Tên bài kiểm tra"
                    variant="outlined"
                    onChange={(e) => handleChangeField('Name', e.target.value)}
                    error={errors.Name}
                    helperText={errors.Name}
                  />
                </Grid>
                <Grid size={{ md: 12 }}>
                  <Typography variant="h6">Description</Typography>
                  <textarea
                    style={{ width: '100%', height: '100px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
                    label="Mô tả"
                    name='description'
                    placeholder='Hãy viết mô tả...'
                    onChange={(e) => handleChangeField('Description', e.target.value)}
                  />
                  {errors.Description && <Typography variant='caption' color="error">{errors.Description}</Typography>}
                </Grid>
                <Grid size={{ md: 12 }}>
                  <DialogContentText sx={{ display: 'flex', justifyContent: 'center' }} id="alert-dialog-description">
                    <Upload  {...props} >
                      <AntButton icon={<UploadOutlined />}>Chọn để Upload file</AntButton>
                    </Upload>
                  </DialogContentText>
                </Grid>

              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={handleUpload} autoFocus>
                Tạo mới
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open === 'TestTypePoint'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }} id="alert-dialog-title">
              Đổi điểm loại bài kiểm tra
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ md: 12 }}>
                  <Autocomplete
                    id="controllable-states-demo"
                    options={typestest}
                    onChange={(e, newValue) => {
                      setformDataTestTypePoint((prev) => ({ ...prev, id: newValue?.id }));
                    }}
                    getOptionLabel={(option) => option?.name || ''}
                    renderInput={(params) => <TextField {...params} label="Chọn loại kiểm tra" />}
                  />
                  {/* {errors.TestTypeId && <Typography variant='caption' color="error">{errors.TestTypeId}</Typography>} */}
                </Grid>
                <Grid size={{ md: 12 }}>
                  <TextField
                    id="outlined-basic"
                    label="Điểm"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setformDataTestTypePoint((prev) => ({ ...prev, point: e.target.value }))}
                  // error={errors.Name}
                  // helperText={errors.Name}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={handleChangePoint} autoFocus>
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
          handleFilter={handleFilter}
          filterYear={filterYear}
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
                headLabel={[
                  { id: 'name', label: 'Tên' },
                  { id: 'testTypeId', label: 'Loại bài kiểm tra', align: 'center' },
                  { id: 'description', label: 'Mô tả', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {testLessons?.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    name={row?.name || ''} // Kiểm tra row.name
                    rowKey={index + 1}
                    id={row?.id || ''} // Kiểm tra row.id
                    description={row?.description || ''} // Kiểm tra row.description
                    testTypeId={row?.testTypeId || ''} // Kiểm tra row.testTypeId
                    point={row?.point || ''} // Kiểm tra row.point
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
          labelRowsPerPage="Số hàng mỗi trang:"
        />


      </Card>
    </>
  )
  // );
}  