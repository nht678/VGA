import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from 'src/firebaseConfig';

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
import { Calendar, theme, Button as ButtonAnt, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { getConsultants, resetConsultantSuccess, addConsultant } from 'src/store/consultant/action';
import { actLevelGetAsync } from 'src/store/level/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';
import { validateFormData, isRequired, isValidPassword, isPhone, isEmail } from '../../formValidation';

// ----------------------------------------------------------------------

export default function ConsultantView() {

  const dispatch = useDispatch();
  const { consultants, total = 0, successConsultant } = useSelector((state) => state.consultantReducer);
  const { consultantLevels } = useSelector((state) => state.levelReducer);

  let userId = localStorage.getItem('userId');

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    doB: '',
    description: '',
    gender: '',
    consultantLevelId: '',
    universityId: userId,
    certifications: [
      {
        description: "",
        imageUrl: ""
      }
    ]
  });

  const rules = {
    name: [isRequired('Tên')],
    email: [isRequired('Email'), isEmail],
    password: [isRequired('Mật khẩu'), isValidPassword('Mật khẩu')],
    phone: [isRequired('Số điện thoại'), isPhone],
    doB: [isRequired('Ngày sinh')],
    description: [isRequired('Mô tả')],
    consultantLevelId: [isRequired('Level')],
    gender: [isRequired('Giới tính')]
  };


  const validateForm = () => {
    const newErrors = validateFormData(formData, rules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [inputValue, setInputValue] = useState(''); // Giá trị input

  const onPanelChange = (value1, mode) => {
    setFormData({ ...formData, doB: value1.format('YYYY-MM-DD') });
  };

  const [errors, setErrors] = useState({});
  console.log('errors', errors);

  // handlechange
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getConsultants({ page: 1, pageSize: rowsPerPage, search: filterName }));
    dispatch(actLevelGetAsync({}));
  }, [successConsultant]);

  const handleAddConsultant = () => {
    if (!validateForm()) return;
    dispatch(addConsultant(formData));
    if (successConsultant) {
      dispatch(resetConsultantSuccess);
    };
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      doB: '',
      description: '',
      consultantLevelId: '',
      certifications: [
        {
          description: "",
          imageUrl: ""
        }
      ]
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

  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleLevelChange = (event, newValue) => {
    // setValue(newValue);
    setFormData({ ...formData, consultantLevelId: newValue?.id || '' });
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

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Lưu URL ảnh

  const uploadProps = (index) => ({
    name: "file",
    beforeUpload: async (file) => {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        setFormData((prevData) => {
          const updatedCertifications = [...prevData.certifications];
          updatedCertifications[index].imageUrl = url; // Gắn URL vào đúng chứng chỉ
          return { ...prevData, certifications: updatedCertifications };
        });

        return false;
      } catch (error) {
        console.error("Upload failed:", error);
        return false;
      }
    },
    onRemove: async () => {
      try {
        await deleteImageFromFirebase(formData.certifications[index]?.imageUrl);
        setFormData((prevData) => {
          const updatedCertifications = [...prevData.certifications];
          updatedCertifications[index].imageUrl = ""; // Xóa URL từ chứng chỉ cụ thể
          return { ...prevData, certifications: updatedCertifications };
        });
      } catch (error) {
        console.error("Failed to remove image:", error);
      }
    },
  });


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


  const updateCertification = (index, key, value) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index][key] = value;
    setFormData({ ...formData, certifications: newCertifications });
  }

  const removeCertification = (index) => {
    const newCertifications = [...formData.certifications];
    newCertifications.splice(index, 1);
    setFormData({ ...formData, certifications: newCertifications });
  }

  const addCertification = () => {
    const newCertifications = [...formData.certifications];
    newCertifications.push({
      description: "",
      imageUrl: ""
    });
    setFormData({ ...formData, certifications: newCertifications });
  }




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
                    <Calendar
                      fullscreen={false}
                      onPanelChange={onPanelChange}
                      onChange={onPanelChange}
                      disabledDate={(current) => current && current >= moment().endOf('day')} />
                    {errors.doB && <Typography variant='caption' color="error">{errors.doB}</Typography>} {/* Hiển thị lỗi nếu có */}
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="gender"
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value === 'true' })}  // So sánh giá trị trả về và chuyển đổi
                    >
                      <FormControlLabel value control={<Radio />} label="Nam" />
                      <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                    </RadioGroup>
                    {errors.gender && <Typography variant='caption' color="error">{errors.gender}</Typography>} {/* Hiển thị lỗi nếu có */}
                  </Grid>
                  {formData.certifications.map((certification, index) => (
                    <Grid container size={{ md: 12 }} spacing={2} sx={{ mt: 1 }} key={index} style={{ border: '1px solid black', borderRadius: '8px' }}>
                      <Grid container size={{ md: 12 }} spacing={2} sx={{ justifyContent: 'center' }}>
                        <Grid size={{ md: 12 }}>
                          <Typography variant="h6">Ảnh</Typography>
                          <Upload {...uploadProps(index)} fileList={fileList[index]} listType='picture' accept='image/*'>
                            {!formData.certifications[index]?.imageUrl && (
                              <ButtonAnt type="primary" icon={<UploadOutlined />}>
                                Upload
                              </ButtonAnt>
                            )}
                          </Upload>
                        </Grid>
                        <Grid size={{ md: 12 }}>
                          <Typography variant="h6">Nội dung</Typography>
                          <textarea onChange={(e) => updateCertification(index, 'description', e.target.value)} placeholder="Hãy viết nội dung....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                          />
                        </Grid>
                      </Grid>
                      <Grid size={{ md: 12 }} sx={{ my: 1, justifyContent: 'center', display: 'flex' }}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => removeCertification(index)}
                        >
                          Xóa
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid size={{ md: 12 }} sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
                  <Button variant="contained" onClick={addCertification}>
                    Thêm chứng chỉ
                  </Button>
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
                  { id: 'status', label: 'Trạng thái', align: 'center' },
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
                    certifications={row?.certifications}
                    status={row?.accountStatus || ''}
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