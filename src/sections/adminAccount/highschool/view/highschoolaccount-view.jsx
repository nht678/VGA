import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from 'src/firebaseConfig';
import { Button as ButtonAnt, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';
import { actHighSchoolGetAsync, actAddHighSchoolAsync, resetHighSchoolSuccess } from 'src/store/highschool/action';
import { actGetRegionAsync } from 'src/store/region/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { validateFormData, isRequired, isEmail, isPhone, isValidPassword } from '../../../formValidation';


// ----------------------------------------------------------------------

export default function HighSchoolAccountView() {
  const [page, setPage] = useState(0);


  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    regionId: '',
    image_Url: '',
  });
  // write code here

  const dispatch = useDispatch();

  const { highschools, total = 0, successHighSchool } = useSelector((state) => state.highschoolReducer);
  console.log('highschools', highschools);
  const { regions } = useSelector((state) => state.regionReducer);

  const handleAddHighSchool = () => {
    if (!validateForm()) {
      return;
    }
    dispatch(actAddHighSchoolAsync(formData));
    if (successHighSchool) {
      // message.success('Thêm trường cấp 3 thành công');
      dispatch(resetHighSchoolSuccess());
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        regionId: '',
        image_Url: '',
      });
    }
    handleClose();
  };


  const [options, setOptions] = useState([]); // Danh sách tỉnh thành
  const [value, setValue] = useState(null); // Giá trị đã chọn
  const [inputValue, setInputValue] = useState(''); // Giá trị input\
  const [errors, setErrors] = useState({}); // Lỗi khi validate form

  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      regionId: value?.id || '', // Đảm bảo regionId nhận id nếu value có giá trị
    });
  };

  const rules = {
    name: [isRequired('Tên')],
    email: [isRequired('Email'), isEmail],
    phone: [isRequired('Số điện thoại'), isPhone],
    password: [isRequired('Mật khẩu'), isValidPassword('Mật khẩu')],
    address: [isRequired('Địa chỉ')],
    regionId: [isRequired('Tỉnh thành')],
  };

  const validateForm = () => {
    const newErrors = validateFormData(formData, rules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // Cập nhật regionId trực tiếp từ sự kiện onChange của Autocomplete
  const handleRegionChange = (event, newValue) => {
    setValue(newValue);
    setFormData((prevData) => ({
      ...prevData,
      regionId: newValue?.id || '', // Cập nhật regionId khi giá trị thay đổi
    }));
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actHighSchoolGetAsync({ page: newPage + 1, pageSize: rowsPerPage, search: filterName })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actHighSchoolGetAsync({ page: 1, pageSize: newRowsPerPage, filterName })); // Gọi API với `pageSize` mới
  };


  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Lưu URL ảnh

  const uploadProps = {
    name: "file",
    beforeUpload: async (file) => {
      try {
        setSelectedFile(file);
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        setImageUrl(url); // Lưu URL vào state
        setFormData((prevData) => ({
          ...prevData,
          image_Url: url, // Lưu URL vào formData.image
        }));

        return false; // Ngăn upload mặc định
      } catch (error3) {
        console.error("Upload failed:", error3);
        return false;
      }
    },
    onRemove: async (file) => {
      try {
        await deleteImageFromFirebase(imageUrl); // Xóa ảnh từ Firebase
        setSelectedFile(null); // Xóa file trong state
        setImageUrl(""); // Xóa URL trong state
        setFormData((prevData) => ({
          ...prevData,
          image_Url: "", // Xóa URL trong formData
        }));
      } catch (error2) {
        console.error("Failed to remove image:", error2);
      }
    },
  };

  // Hàm xóa ảnh từ Firebase
  const deleteImageFromFirebase = async (imageUrl1) => {
    try {
      const imageRef = ref(storage, imageUrl1); // Tạo reference từ URL
      await deleteObject(imageRef); // Xóa ảnh
      console.log("Ảnh đã được xóa thành công");
    } catch (error1) {
      console.error("Lỗi khi xóa ảnh:", error1);
    }
  };

  const fileList = imageUrl
    ? [
      {
        uid: "-1", // UID duy nhất cho mỗi ảnh
        name: "Uploaded Image", // Tên hiển thị
        status: "done", // Trạng thái upload
        url: imageUrl, // URL ảnh để hiển thị
      },
    ]
    : []; // Nếu chưa có ảnh thì danh sách trống


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

  // Đảm bảo regions được fetch một lần và cập nhật options khi regions thay đổi
  useEffect(() => {
    dispatch(actHighSchoolGetAsync({ page: page + 1, pageSize: rowsPerPage }));
    // Fetch regions chỉ một lần khi component mount
    if (!regions || regions.length === 0) {
      dispatch(actGetRegionAsync());
      setOptions(regions);
    }
  }, [successHighSchool]);






  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} >
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
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              Tạo trường cấp 3
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
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='email'
                      label="Email"
                      onChange={handlechange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='phone'
                      label="Số điện thoại"
                      onChange={handlechange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='password'
                      label="Mật khẩu"
                      onChange={handlechange}
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='address'
                      label="Địa chỉ"
                      onChange={handlechange}
                      error={!!errors.address}
                      helperText={errors.address}
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
                      options={regions} // Truyền đúng mảng options
                      getOptionLabel={(option) => option?.name || ''} // Hiển thị tên tỉnh thành
                      renderInput={(params) => <TextField {...params} label="Chọn tỉnh thành" />}
                    />
                    {errors.regionId && <Typography variant='caption' color="error">{errors.regionId}</Typography>}
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Ảnh</Typography>
                    <Upload
                      listType="picture"
                      {...uploadProps}
                      fileList={fileList}
                      accept="image/*" // Chỉ cho phép chọn các file ảnh
                    >
                      {!imageUrl && ( // Chỉ hiển thị nút upload nếu chưa có ảnh
                        <ButtonAnt type="primary" icon={<UploadOutlined />}>
                          Upload
                        </ButtonAnt>
                      )}
                    </Upload>
                    {errors.image_Url && <Typography variant='caption' color="error" >{errors?.image_Url}</Typography>}
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
      </Stack >

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
                  { id: 'email', label: 'Email', align: 'center' },
                  { id: 'phone', label: 'Số điện thoại', align: 'center' },
                  { id: 'goldBalance', label: 'Số điểm', align: 'center' },
                  { id: 'address', label: 'Địa chỉ', align: 'center' },
                  { id: 'status', label: 'Tình trạng', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {highschools.map((row, index) => (
                  <UserTableRow
                    key={row.id}
                    rowKey={index + 1}
                    name={row?.account?.name}
                    email={row.account?.email}
                    phone={row.account?.phone}
                    address={row?.address}
                    goldBalance={row?.account?.wallet?.goldBalance}
                    id={row?.id}
                    accountId={row?.account?.id || ''}
                    status={row?.account?.status}
                    avatarUrl={row?.avatarUrl}
                    regionId={row?.regionId}
                    image_Url={row?.account?.image_Url}
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
  );
}
