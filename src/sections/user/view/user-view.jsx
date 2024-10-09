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
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/system/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Calendar, theme, Button as AntButton, message, Upload } from 'antd';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';
import { actUserGetAsync, actAddUserAsync, resetUserSuccess } from 'src/store/users/action';

import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { uploadFile } from 'src/store/uploadfile/action';
import LoadingPage from 'src/pages/loading';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';






// ----------------------------------------------------------------------

export default function UserView() {

  const dispatch = useDispatch();
  const { students, total, usersSuccess } = useSelector((state) => state.usersReducer);
  console.log('students', students);
  const { loading, error, uploadSuccess } = useSelector((state) => state.uploadReducer);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [formData, setformData] = useState({
    Status: true, // Khởi tạo Status trong formData
    CreateAt: new Date().toISOString().split('T')[0], // Chuyển đổi thành định dạng YYYY-MM-DD
    highSchoolId: userInfo ? userInfo.highSchoolId : '', // Đảm bảo userInfo đã được xác định
  });

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);



  const onPanelChange = (value, mode) => {
    setformData({ ...formData, DateOfBirth: value.format('YYYY-MM-DD') });

  };

  // handlechange
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };





  const handleAddUser = () => {
    // Tạo formDataObj
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    // Sau khi kiểm tra, gửi formDataObj tới action
    dispatch(actAddUserAsync(formDataObj));
    if (usersSuccess) {
      message.success('Add user success');
      // set reset 

    } else {
      message.error('Add user failed');
    }
    setOpen(false);
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
      const newSelecteds = students.map((n) => n.name);
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
    dispatch(actUserGetAsync({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actUserGetAsync({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
  };


  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: students,
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

  const Year = [
    { label: '2017', year: 2017 },
    { label: '2018', year: 2018 },
    { label: '2019', year: 2019 },
    { label: '2020', year: 2020 },
    { label: '2021', year: 2021 },
  ];

  const [selectedFile, setSelectedFile] = useState(null);

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

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Lấy sheet đầu tiên
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Chuyển đổi sheet thành JSON với header là hàng đầu tiên
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Tách header và rows
      const [headers, ...rows] = jsonData;

      // Lọc bỏ các hàng trống
      const filteredRows = rows.filter(row =>
        row.some(cell => cell !== undefined && cell !== null && cell !== '')
      );

      // Chuyển đổi các hàng còn lại thành các object dựa trên headers
      const formattedData = filteredRows.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });

      // Lấy ngày gửi hiện tại
      const currentDate = new Date().toISOString();  // ISO format (yyyy-mm-ddThh:mm:ss)

      // Chuẩn bị dữ liệu gửi đi kèm tên file và ngày gửi
      const payload = {
        data: formattedData,
        fileName: selectedFile.name,
        uploadDate: currentDate,
      };
      const payloadString = JSON.stringify(payload);
      const formUpload = new FormData();
      formUpload.append('stringJson', payloadString);
      formUpload.append('highschoolId', userInfo.highSchoolId);
      // Log FormData entries to console
      formUpload.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      // Dispatch action upload file
      // console.log('formUpload', formUpload);
      dispatch(uploadFile(formUpload));
      if (uploadSuccess) {
        message.success(`${selectedFile.name} file uploaded and converted successfully`);
        setOpen(false);
      } else {
        message.error(`${selectedFile.name} file upload failed.`);
      }
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  useEffect(() => {
    // if (uploadSuccess) {
    //   dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage }));
    //   dispatch(resetUserSuccess());
    // }
  }, [dispatch, page, rowsPerPage, uploadSuccess]);

  // write code here
  useEffect(() => {
    if (usersSuccess) {
      debugger
      dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage }));
      // dispatch(resetUserSuccess());
    } else {
      dispatch(actUserGetAsync({ page: page + 1, pageSize: rowsPerPage }));
    }
  }, [dispatch, page, rowsPerPage, usersSuccess]);
  return (
    // if loading is false then show div below else show loading
    // true ? (
    //   <LoadingPage />
    // ) : (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Students</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateStudent')}>
            New Student
          </Button>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateUpload')}>
            New Upload
          </Button>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('CreateGold')}>
            Distribute Gold
          </Button>

          <Dialog
            open={open === 'CreateGold'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1 }}>
              {"Distribute Gold"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2}>
                  <Grid size={{ md: 12 }}>
                    <TextField
                      fullWidth
                      label="Gold"
                      name='Gold'
                      // onchange setformdata
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleAddUser} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={open === 'CreateStudent'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1 }}>
              {"Create student"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='Name'
                      label="Name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      id='Email'
                      name='Email'
                      label="Email"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      label="Password"
                      name='Password'
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name='Phone'
                      onChange={handleChange}
                    />
                  </Grid>
                  {/* <Grid size={{ md: 6 }}>
                    <Autocomplete
                      disablePortal
                      options={Year}
                      value={Year.find((item) => item.year === adminsstionyear)}
                      onChange={(e) => {
                        setformData({ ...formData, adminsstionyear: easily.year });
                      }}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Year" />}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <Typography variant="h6">Date Of Birth</Typography>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={onPanelChange} />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="Gender"
                      onChange={(e) => setformData({ ...formData, Gender: e.target.value === 'true' })}  // So sánh giá trị trả về và chuyển đổi
                    >
                      <FormControlLabel value control={<Radio />} label="Male" />
                      <FormControlLabel value={false} control={<Radio />} label="Female" />
                    </RadioGroup>
                  </Grid>
                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleAddUser} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={open === 'CreateUpload'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Upload file"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Upload {...props}>
                  <AntButton icon={<UploadOutlined />}>Click to Upload</AntButton>
                </Upload>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpload} autoFocus>
                Upload
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
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email', align: 'center' },
                  { id: 'phone', label: 'Phone', align: 'center' },
                  { id: 'gender', label: 'Gender' },
                  { id: 'gold', label: 'Gold' },
                  { id: 'dateOfBirth', label: 'DateOfBirth' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((row) => (
                  <UserTableRow
                    name={row.name || ''} // Kiểm tra row.name
                    id={row.id || ''} // Kiểm tra row.id
                    gender={row.gender || ''} // Kiểm tra row.gender
                    gold={row["gold-balance"] || 0} // Kiểm tra row["gold-balance"]
                    email={row.account?.email || ''} // Kiểm tra row.account?.email
                    phone={row.account?.phone || ''} // Kiểm tra row.account?.phone
                    avatarUrl={row.avatarUrl || ''} // Kiểm tra row.avatarUrl
                    dateOfBirth={row.dateOfBirth ? new Date(row.dateOfBirth).toISOString().split('T')[0] : ''} // Kiểm tra row.dateOfBirth
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