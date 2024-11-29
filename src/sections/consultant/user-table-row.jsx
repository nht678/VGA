import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from 'src/firebaseConfig';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
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
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Calendar, theme, Image, Upload, Button as ButtonAnt } from 'antd';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { updateConsultant, deleteConsultant, removeCertificationAsyn } from 'src/store/consultant/action';
import DeleteDialog from '../../pages/delete';

const getColorByLevel = (level) => {
  switch (level) {
    case 1:
      return 'green';
    case 2:
      return 'blue';
    case 3:
      return 'orange';
    case 4:
      return 'red';
    default:
      return 'black'; // Màu mặc định nếu không có level hợp lệ
  }
};

export default function UserTableRow({
  name,
  avatarUrl,
  email,
  phone,
  id,  // Đổi tên id props thành userId
  dateOfBirth,
  description,
  consultantLevelId,
  gender,
  rowKey,
  certifications,
}) {

  console.log('certifications', certifications);

  let userId = localStorage.getItem('userId');

  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});
  const cleanedCertifications = certifications?.map((item) => ({
    id: item.id,
    description: item.description,
    imageUrl: item.imageUrl,
  })) || [
      {
        id: '',
        description: "",
        imageUrl: "",
      },
    ];
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    password: '',
    phone: phone,
    status: true,
    doB: dateOfBirth,
    description: description,
    consultantLevelId: '',
    universityId: userId,
    certifications: cleanedCertifications
  });
  const { consultantLevels } = useSelector((state) => state.levelReducer);
  const [inputValue, setInputValue] = useState(''); // Giá trị input
  // const [value, setValue] = useState(null); // Giá trị đã chọn
  const handleLevelChange = (event, newValue) => {
    // setValue(newValue);
    setFormData({ ...formData, consultantLevelId: newValue?.id || '' });
  };


  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // if not onchange then onchange will take value default
  // use useEffect not onchange then onchange will take value default

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


  const dispatch = useDispatch();
  const handleUpdate = () => {
    if (!validateForm()) return;

    dispatch(updateConsultant(id, formData));
    handleCloseDialog();
  };
  const handleDelete = () => {
    dispatch(deleteConsultant(id));
    handleCloseDialog();
  }
  const onPanelChange = (value1, mode) => {
    setFormData({ ...formData, DateOfBirth: value1.format('YYYY-MM-DD') });
  };
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickOpenDialog = (type) => {
    setDialog(type);
    setOpen(null);
  };

  const handleCloseDialog = () => {
    setDialog(null);
  };


  const handleClose = () => {
    setDialog(null);
  };


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

  const fileList = formData.certifications.map((certification) =>
    certification.imageUrl
      ? [
        {
          uid: "-1",
          name: "Uploaded Image",
          status: "done",
          url: certification.imageUrl, // URL ảnh từ chứng chỉ
        },
      ]
      : []
  );

  // const [formData1, setFormData1] = useState({
  //   certifications: [

  const fileList1 = imageUrl
    ? [
      {
        uid: "-1", // UID duy nhất cho mỗi ảnh
        name: "Uploaded Image", // Tên hiển thị
        status: "done", // Trạng thái upload
        url: imageUrl, // URL ảnh để hiển thị
      },
    ]
    : []; // Nếu chưa có ảnh thì danh sách trống

  const uploadProps1 = (index) => ({
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



  const updateCertification = (index, key, value) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index][key] = value;
    setFormData({ ...formData, certifications: newCertifications });
  }

  const removeCertification = (id1, index) => {
    const newCertifications = [...formData.certifications];
    newCertifications.splice(index, 1);
    setFormData({ ...formData, certifications: newCertifications });
    dispatch(removeCertificationAsyn(id1));
  }

  const addCertification = () => {
    const newCertifications = [...formData.certifications];
    newCertifications.push({
      description: "",
      imageUrl: ""
    });
    setFormData({ ...formData, certifications: newCertifications });

  }

  console.log('formData', formData);


  return (
    <>
      <TableRow hover >
        <TableCell>
          {rowKey}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{email}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{phone}</TableCell>


        <TableCell sx={{ textAlign: 'center' }}>
          {description}
        </TableCell>
        <TableCell>{gender ? 'Male' : 'Female'}</TableCell>
        <TableCell
          sx={{
            textAlign: 'center',
            color: getColorByLevel(consultantLevelId),
            fontWeight: 'bold'
          }}
        >
          {`Level ${consultantLevelId}`}
        </TableCell>
        <TableCell>
          {dateOfBirth}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog
        open={dialog === 'edit'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
          Cập nhật tư vấn viên
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={name}
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
                  defaultValue={email}
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
                  defaultValue={phone}
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
                  defaultValue={description}
                  name='description'
                  placeholder='Hãy viết mô tả...'
                  onChange={handleChange}
                />
                {errors.description && <Typography variant='caption' color="error">{errors.description}</Typography>}
              </Grid>
              <Grid size={{ md: 6 }}>
                <Typography variant="h6">Cấp độ</Typography>
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
                {errors.consultantLevelId && <Typography variant='caption' color="error">{errors.consultantLevelId}</Typography>}
              </Grid>


              <Grid item xs={12}>
                <Typography variant="h6">Ngày sinh</Typography>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={onPanelChange} />
                {errors.doB && <Typography variant='caption' color="error">{errors.doB}</Typography>}
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
                {errors.gender && <Typography variant='caption' color="error">{errors.gender}</Typography>}
              </Grid>
              {formData.certifications.map((certification, index) => (
                <Grid container size={{ md: 12 }} spacing={2} sx={{ mt: 1 }} key={index} style={{ border: '1px solid black', borderRadius: '8px' }}>
                  <Grid container size={{ md: 12 }} spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid size={{ md: 12 }}>
                      <Typography variant="h6">Ảnh</Typography>
                      <Upload {...uploadProps(index)} fileList={fileList[index]} listType="picture">
                        {!formData.certifications[index]?.imageUrl && (
                          <ButtonAnt type="primary" icon={<UploadOutlined />}>
                            Upload
                          </ButtonAnt>
                        )}
                      </Upload>

                    </Grid>
                    <Grid size={{ md: 12 }}>
                      <Typography variant="h6">Nội dung</Typography>
                      <textarea defaultValue={certification?.description} onChange={(e) => updateCertification(index, 'description', e.target.value)} placeholder="Hãy viết nội dung....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                      />
                    </Grid>


                  </Grid>
                  <Grid size={{ md: 12 }} sx={{ my: 1, justifyContent: 'center', display: 'flex' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeCertification(certifications?.id, index)}
                    >
                      Xóa
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid size={{ md: 12 }} sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
              <Button variant="contained" onClick={() => handleClickOpenDialog('addCertification')}>
                Thêm chứng chỉ
              </Button>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdate} autoFocus>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialog === 'addCertification'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
          Thêm chứng chỉ
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Ảnh</Typography>
                <Upload {...uploadProps(formData.certifications.length)} fileList={fileList[formData.certifications.length]} listType="picture">
                  {!formData.certifications[formData.certifications.length]?.imageUrl && (
                    <ButtonAnt type="primary" icon={<UploadOutlined />}>
                      Upload
                    </ButtonAnt>
                  )}
                </Upload>
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Nội dung</Typography>
                <textarea onChange={(e) => updateCertification(formData.certifications.length, 'description', e.target.value)} placeholder="Hãy viết nội dung....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={addCertification} autoFocus>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={dialog === 'Detail'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
        style={{ zIndex: 1 }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            marginLeft: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#1976d2', // Primary color for the title
            paddingBottom: 2,
          }}
        >
          Chi tiết người tư vấn
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: 3 }}
          >
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 4 }}>
                <Image
                  width={200}
                  src="https://vietnix.vn/wp-content/uploads/2022/09/Steve-Jobs-2.webp"
                  style={{ zIndex: 2 }}
                />
              </Grid>
              <Grid size={{ md: 8 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }} >
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Họ và tên:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {email}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Số điện thoại
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {phone}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Giới tính:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {gender ? 'Nam' : 'Nữ'}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Ngày sinh:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {dateOfBirth}
                </Typography>
              </Grid>

            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Mô tả:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {description}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Cấp độ:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {`Level ${consultantLevelId}`}
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>




      </Dialog >

      {/* <DeleteDialog open={dialog} onClose={handleCloseDialog} handleDelete={() => handleDelete()} /> */}
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => handleClickOpenDialog('edit')}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Cập nhật
        </MenuItem>
        <MenuItem onClick={() => handleClickOpenDialog('Delete')} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
        <MenuItem onClick={() => handleClickOpenDialog('Detail')}>
          <InfoIcon sx={{ mr: 2 }} />
          Chi tiết
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  dateOfBirth: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  description: PropTypes.string,
  gender: PropTypes.bool,
  consultantLevelId: PropTypes.number,
  rowKey: PropTypes.number,
  certifications: PropTypes.array,
};
