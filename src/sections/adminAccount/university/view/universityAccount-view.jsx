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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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

import { actUniversityAddAsync, actUniversityGetAsync, resetUniversitySuccess } from 'src/store/university/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';
import { validateFormData, isRequired, isEmail, isPhone, isValidPassword } from '../../../formValidation';


// ----------------------------------------------------------------------

const options = ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

export default function UniversityAccountView() {
  const [page, setPage] = useState(0);



  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [errors, setErrors] = useState({});

  const [open, setOpen] = useState(false);

  const [openDialog, setOpenDialog] = useState('');

  const dispatch = useDispatch();

  const { universities = [], successUniversity, total } = useSelector((state) => state.reducerUniversity);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    description: '',
    establishedYear: '',
    type: '',
    image_Url: '',
  });

  const rules = {
    code: [isRequired('Mã trường')],
    name: [isRequired('Tên')],
    email: [isRequired('Email'), isEmail],
    phone: [isRequired('Số điện thoại'), isPhone],
    password: [isRequired('Mật khẩu'), isValidPassword('Mật khẩu')],
    description: [isRequired('Mô tả')],
    establishedYear: [isRequired('Năm thành lập')],
    type: [isRequired('Trường')],
  };

  const validateForm = () => {
    const newErrors = validateFormData(formData, rules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleAddUniversity = () => {
    if (!validateForm()) return;
    dispatch(actUniversityAddAsync(formData));
    if (successUniversity) {
      dispatch((resetUniversitySuccess()));
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        description: '',
        establishedYear: '',
        type: '',
        image_Url: '',
      });
    }

    handleCloseDialog();
  };

  const handleOpen = () => {
    setOpen(true);
  };


  const handleYearChange = (event, newValue) => {
    // setValue(newValue);
    setFormData({ ...formData, establishedYear: newValue });
  };

  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlechangeType = (e) => {
    setFormData({
      ...formData,
      type: e.target.value,
    });
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
    onRemove: (file) => {
      try {
        // await deleteImageFromFirebase(imageUrl); // Xóa ảnh từ Firebase
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

  // // Hàm xóa ảnh từ Firebase
  // const deleteImageFromFirebase = async (imageUrl1) => {
  //   try {
  //     const imageRef = ref(storage, imageUrl1); // Tạo reference từ URL
  //     await deleteObject(imageRef); // Xóa ảnh
  //     console.log("Ảnh đã được xóa thành công");
  //   } catch (error1) {
  //     console.error("Lỗi khi xóa ảnh:", error1);
  //   }
  // };

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


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actUniversityGetAsync({ page: newPage + 1, pageSize: rowsPerPage, search: filterName })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actUniversityGetAsync({ page: 1, pageSize: newRowsPerPage, search: filterName })); // Gọi API với `pageSize` mới
  };

  const handleClickOpen = (Typedialog) => {
    setOpenDialog(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog('');
  };

  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(actUniversityGetAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actUniversityGetAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    }
  };

  useEffect(() => {
    dispatch(actUniversityGetAsync({ page: page + 1, pageSize: rowsPerPage }));
    // Fetch regions chỉ một lần khi component mount

  }, [successUniversity]);


  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Trường đại học</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
            Tạo trường đại học
          </Button>
          <Dialog
            open={openDialog === 'Create'}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              Tạo trường đại học
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      name='code'
                      label="Mã trường"
                      onChange={handlechange}
                      error={!!errors.code}
                      helperText={errors.code}
                    />
                  </Grid>
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
                      label="Mật khẩu"
                      onChange={handlechange}
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel id="demo-controlled-open-select-label">Trường</InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={formData?.typeUniversity}
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        label="Trường"
                        onChange={handlechangeType}
                      >
                        <MenuItem value={1}>Trường công lập</MenuItem>
                        <MenuItem value={2}>Trường tư</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.type && <Typography variant='caption' color="error">{errors.type}</Typography>}
                  </Grid>


                  <Grid size={{ md: 6 }}>
                    <Autocomplete
                      onChange={handleYearChange}
                      options={options}
                      getOptionLabel={(option) => option || ''}
                      renderInput={(params) => <TextField {...params} label="Năm thành lập" />}
                    />
                    {errors.establishedYear && <Typography variant='caption' color="error">{errors.establishedYear}</Typography>}
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
                    {errors.image_Url && <Typography variant='caption' color="error" >{errors.image_Url}</Typography>}
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Mô tả</Typography>
                    <textarea name='description' onChange={handlechange} placeholder="Hãy viết Mô tả....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                    {errors.description && <Typography variant='caption' color="error">{errors.description}</Typography>}
                  </Grid>


                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Hủy bỏ</Button>
              <Button onClick={handleAddUniversity} autoFocus>
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

                numSelected={0}
                headLabel={[
                  { id: 'name', label: 'Tên' },
                  { id: 'email', label: 'Email', align: 'center' },
                  { id: 'phone', label: 'Số điện thoại', align: 'center' },
                  { id: 'Type', label: 'Trường', align: 'center' },
                  { id: 'establishedYear', label: 'Năm thành lập', align: 'center' },
                  { id: 'goldBalance', label: 'Số điểm', align: 'center' },
                  { id: 'status', label: 'Tình trạng', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {universities.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    rowKey={index + 1}
                    name={row?.account?.name}
                    email={row?.account?.email}
                    phone={row?.account?.phone}
                    typeUniversity={row?.type}
                    description={row?.description}
                    id={row?.id}
                    status={row?.account?.status}
                    avatarUrl={row?.image_Url}
                    goldBalance={row?.account?.wallet?.goldBalance}
                    accountId={row?.account?.id || ''}
                    code={row?.code}
                    establishedYear={row?.establishedYear}
                    image_Url={row?.account?.image_Url}
                    universityLocations={row?.universityLocations}
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
