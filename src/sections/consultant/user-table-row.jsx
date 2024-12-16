import { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from 'src/firebaseConfig';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/system/Grid';
import moment from 'moment';
import dayjs from 'dayjs';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Calendar, Image, Upload, Button as ButtonAnt } from 'antd';
import InfoIcon from '@mui/icons-material/Info';
import Chip from '@mui/material/Chip';
// import link react router dom
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateConsultant, deleteConsultant, removeCertificationAsyn, resetConsultantSuccess, addCertificationAsyn } from 'src/store/consultant/action';
import { actUserBan } from 'src/store/users/action';
import DeleteDialog from '../../pages/delete';
import { validateFormData, isRequired, isPhone, isEmail } from '../formValidation';

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
const getStatusLabel = (status) => {
  switch (status) {
    case 1:
      return 'Active';
    case 2:
      return 'Inactive';
    case 3:
      return 'Blocked';
    default:
      return 'Unknown';
  }
};
const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return 'success'; // Xanh lá
    case 2:
      return 'default'; // Xám
    case 3:
      return 'error';   // Đỏ
    default:
      return 'default';
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
  status,
  walletBalance,
  accountId,
  consultantLevelPrice,
  image_Url,
  nameUniversity,
  emailuniversity,
  consultantLevelDes,
  certifications,
  universityDes,
  consultantRelations
}) {
  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});
  const cleanedCertifications = certifications?.map((item) => ({
    id: item.id,
    description: item.description,
    imageUrl: item.imageUrl,
    majorId: item.majorId,
  })) || [
      {
        id: '',
        description: "",
        imageUrl: "",
        majorId: '',
      },
    ];

  const consultantRelationsName = consultantRelations?.map((consultantRelation) => consultantRelation?.universityName);
  const consultantRelationUniversityId = consultantRelations?.map((consultantRelation) => consultantRelation?.universityId);

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    phone: phone,
    status: true,
    doB: dateOfBirth,
    gender: gender,
    description: description,
    consultantLevelId: consultantLevelId,
    certifications: cleanedCertifications,
    consultantRelations: consultantRelationUniversityId
  });




  const { consultantLevels } = useSelector((state) => state.levelReducer);
  const { successConsultant } = useSelector((state) => state.consultantReducer);
  const { majors, success } = useSelector((state) => state.majorReducer);
  const { universities } = useSelector((state) => state.reducerUniversity);
  const theme = useTheme();

  const handleLevelChange = (event, newValue) => {
    // setValue(newValue);
    setFormData({ ...formData, consultantLevelId: newValue?.id || '' });
  };

  const rules = {
    name: [isRequired('Tên')],
    email: [isRequired('Email'), isEmail],
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'gender' ? e.target.value === 'true' : e.target.value,
    });
  };


  const dispatch = useDispatch();
  const handleUpdate = () => {
    if (!validateForm()) return;
    dispatch(updateConsultant(id, formData));
    handleCloseDialog();
    if (successConsultant) {
      dispatch(resetConsultantSuccess());
    }
    setOpen('');
  };
  const handleDelete = () => {
    if (successConsultant) {
      dispatch(resetConsultantSuccess());
      dispatch(deleteConsultant(id));
    }
    handleCloseDialog();
  }
  const onPanelChange = (value1, mode) => {
    setFormData({ ...formData, DateOfBirth: value1.format('YYYY-MM-DD') });
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [dialog1, setDialog1] = useState('');

  const handleClickOpenDialog = (type) => {
    setDialog(type);
    setOpen('');
  };
  const handleClickOpenDialog1 = (type) => {
    setDialog1(type);
  };

  const handleClose1 = () => {
    setDialog1('');
  };

  const handleCloseDialog = () => {
    setDialog('');
  };


  const handleClose = () => {
    setDialog('');
    setOpen('');
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

  const [imageUrl1, setImageUrl1] = useState(avatarUrl || ""); // Lưu URL ảnh (có thể là ảnh cũ nếu có avatarUrl)
  const [fileList2, setFileList2] = useState([]); // Danh sách file của Upload

  useEffect(() => {
    if (image_Url) {
      setImageUrl1(image_Url); // Cập nhật imageUrl với avatarUrl nếu có
      setFileList2([{
        uid: '-1', // Đảm bảo có một uid cho ảnh hiện tại
        name: 'image.jpg', // Đặt tên file phù hợp (có thể lấy tên ảnh từ avatarUrl)
        status: 'done', // Đảm bảo file đã được tải lên
        url: image_Url, // URL ảnh cũ từ Firebase
      }]);
    }
  }, [image_Url]); // Cập nhật fileList khi avatarUrl thay đổi

  const uploadProps2 = {
    name: "file",
    listType: "picture",
    fileList: fileList2, // Hiển thị ảnh cũ nếu có
    beforeUpload: async (file) => {
      try {
        setSelectedFile(file);
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        setImageUrl1(url); // Lưu URL vào state
        setFileList2([{
          uid: file.uid,
          name: file.name,
          status: 'done',
          url,
        }]);

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
        await deleteImageFromFirebase(file.url); // Xóa ảnh từ Firebase
        setSelectedFile(null); // Xóa file trong state
        setFileList2([]); // Xóa file trong fileList
        setImageUrl1(""); // Xóa URL trong state

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
  const deleteImageFromFirebase = async (imageUrl2) => {
    try {
      const imageRef = ref(storage, imageUrl2); // Tạo reference từ URL
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

  const uploadProps1 = {
    name: "file",
    beforeUpload: async (file) => {
      try {
        setSelectedFile(file);
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        setImageUrl(url); // Lưu URL vào state
        setFormData1((prevData) => ({
          ...prevData,
          imageUrl: url, // Lưu URL vào formData.image
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
        setFormData1((prevData) => ({
          ...prevData,
          imageUrl: "", // Xóa URL trong formData
        }));
      } catch (error2) {
        console.error("Failed to remove image:", error2);
      }
    },
  };

  const [formData1, setFormData1] = useState({
    description: "",
    imageUrl: "",
    majorId: "",
  });

  const updateRelation = (index, key, value) => {
    const newRelations = [...formData.consultantRelations];
    newRelations[index][key] = value;
    setFormData({ ...formData, consultantRelations: newRelations });
  }

  const removeRelation = (id1, index) => {
    const newRelations = [...formData.consultantRelations];
    newRelations.splice(index, 1);
    setFormData({ ...formData, consultantRelations: newRelations });
    // dispatch(removeCertificationAsyn(id1));
  }


  // const defaultUniversity = universities.filter((university) => consultantRelations?.universityId?.includes(university.id)).map((university) => university.account?.name || []);
  // const defaultUniversityNames = universities
  //   .filter((university) => consultantRelations.some((relation) => relation.universityId === university.id))
  //   .map((university) => university?.account?.name || "Unknown Name");

  const [nameUniversitySelect, setNameUniversitySelect] = useState(consultantRelationsName);
  function getStyles(name1, nameuniversityselect, theme1) {
    return {
      fontWeight: nameuniversityselect?.includes(name1)
        ? theme1.typography.fontWeightMedium
        : theme1.typography.fontWeightRegular,
    };
  }

  const handlechange = (event) => {
    const {
      target: { value },
    } = event;

    const selectedNames = typeof value === 'string' ? value.split(',') : value;
    setNameUniversitySelect(selectedNames); // Cập nhật danh sách đã chọn

    // Ánh xạ 
    const selectedIds = universities
      .filter((university) => selectedNames.includes(university.account?.name))
      .map((university) => university.id);

    // Chuyển đổi thành mảng đối tượng { universityId: id }
    const formConsultantRelations = selectedIds.map((id1) => ({ universityId: id1 }))


    setFormData({
      ...formData,
      consultantRelations: formConsultantRelations,
    });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };




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
  // addrowrelation
  const addRowRelation = () => {
    setFormData((prevData) => ({
      ...prevData,
      consultantRelations: [
        ...prevData.consultantRelations,
        {
          universityId: '',
        },
      ],
    }));
  };

  const addCertification = () => {
    dispatch(addCertificationAsyn(formData1, id));
    if (successConsultant) {
      dispatch(resetConsultantSuccess());
      setFormData1({
        description: "",
        imageUrl: "",
      });
      setImageUrl("");
      setSelectedFile(null);
      handleClose1();
    }
  }

  const handleBan = async () => {
    const changeStatus = status === 1 ? 2 : 1;
    await dispatch(actUserBan({ changeStatus, accountId }));
    if (successConsultant) {
      dispatch(resetConsultantSuccess());
    }
    handleCloseDialog();
    handleCloseMenu();
  };



  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      certifications: cleanedCertifications,
    }));
  }, [certifications]);


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
        <TableCell>{gender ? 'Nam' : 'Nữ'}</TableCell>
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
        <TableCell align="center">
          <Chip
            label={getStatusLabel(status)}
            color={getStatusColor(status)}
            variant="outlined"
          />
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
                  defaultValue={phone}
                  label="Số điện thoại"
                  name='phone'
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <Autocomplete
                  onChange={handleLevelChange}
                  value={consultantLevels.find((level) => level.id === formData?.consultantLevelId) || null}
                  id="controllable-states-demo"
                  options={consultantLevels || []} // Đảm bảo options luôn là một mảng
                  getOptionLabel={(option) => option?.name || ''} // Hiển thị chuỗi rỗng nếu option.name không có
                  renderInput={(params) => <TextField {...params} label="Chọn cấp độ" />}
                />
                {errors.consultantLevelId && <Typography variant='caption' color="error">{errors.consultantLevelId}</Typography>}
              </Grid>

              <Grid size={{ md: 12 }}>
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
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Ảnh</Typography>
                <Upload
                  {...uploadProps2}
                  accept="image/*" // Chỉ cho phép chọn các file ảnh
                >
                  {!imageUrl1 && ( // Chỉ hiển thị nút upload nếu chưa có ảnh
                    <ButtonAnt type="primary" icon={<UploadOutlined />}>
                      Upload
                    </ButtonAnt>
                  )}
                </Upload>
                {errors.image_Url && <Typography variant='caption' color="error" >{errors.image_Url}</Typography>}
              </Grid>



              <Grid item xs={12}>
                <Typography variant="h6">Ngày sinh</Typography>
                <Calendar
                  fullscreen={false}
                  onPanelChange={onPanelChange}
                  onChange={onPanelChange}
                  disabledDate={(current) => current && current >= moment().endOf('day')}
                  defaultValue={formData.doB ? dayjs(formData.doB, 'YYYY-MM-DD') : null}
                />
                {errors.doB && <Typography variant='caption' color="error">{errors.doB}</Typography>}
              </Grid>
              <Grid size={{ md: 6 }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  defaultValue={gender}
                  onChange={handleChange}  // So sánh giá trị trả về và chuyển đổi
                >
                  <FormControlLabel value="true" control={<Radio />} label="Nam" />
                  <FormControlLabel value="false" control={<Radio />} label="Nữ" />
                </RadioGroup>
                {errors.gender && <Typography variant='caption' color="error">{errors.gender}</Typography>}
              </Grid>
              {formData.certifications.map((certification, index) => (
                <Grid container size={{ md: 12 }} spacing={2} sx={{ mt: 1 }} key={index} style={{ border: '1px solid black', borderRadius: '8px' }}>
                  <Grid container size={{ md: 12 }} spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid container size={{ md: 12 }} spacing={2} sx={{ justifyContent: 'center' }} >
                      <Grid size={{ md: 5.5 }}>
                        <Typography sx={{ mb: 1 }} variant="h6">Ngành</Typography>
                        <Autocomplete
                          fullWidth
                          value={majors?.find((major) => major.id === certification.majorId) || null}
                          onChange={(e, newValue) =>
                            updateCertification(index, "majorId", newValue?.id)
                          }
                          options={majors || []}
                          getOptionLabel={(option) => option?.name || ""}
                          renderInput={(params) => (
                            <TextField {...params} label="Chọn ngành học" />
                          )}
                        />
                      </Grid>
                      <Grid size={{ md: 5.5 }}>
                        <Typography variant="h6">Hình ảnh</Typography>
                        <Upload {...uploadProps(index)} fileList={fileList[index]} accept='image/*' listType="picture">
                          {!formData.certifications[index]?.imageUrl && (
                            <ButtonAnt type="primary" icon={<UploadOutlined />}>
                              Upload
                            </ButtonAnt>
                          )}
                        </Upload>
                      </Grid>
                      <Grid size={{ md: 11 }} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography variant="h6">Nội dung</Typography>
                        <textarea defaultValue={certification?.description} onChange={(e) => updateCertification(index, 'description', e.target.value)} placeholder="Hãy viết nội dung....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={{ md: 12 }} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeCertification(certification?.id, index)}
                    >
                      Xóa
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Grid size={{ md: 12 }} container>
                <Typography variant="h6">Trường đại học</Typography>
                <Grid size={{ md: 12 }}>
                  <FormControl sx={{ m: 1, width: '100%' }} >
                    <InputLabel id="demo-multiple-chip-label">Chọn trường đại học</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={nameUniversitySelect} // Giá trị đã chọn
                      onChange={handlechange}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {universities.map((universitie, index) => (
                        <MenuItem
                          key={index}
                          value={universitie.account?.name}
                          style={getStyles(universitie.account?.name, nameUniversitySelect, theme)}
                        >
                          {universitie.account?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

            </Grid>

            <Grid size={{ md: 12 }} sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
              <Button variant="contained" onClick={() => handleClickOpenDialog1('addCertification')}>
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
        open={dialog1 === 'addCertification'}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
          Thêm chứng chỉ
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 5.5 }}>
                <Typography sx={{ mb: 1 }} variant="h6">Ngành</Typography>
                <Autocomplete
                  fullWidth
                  onChange={(e, newValue) =>
                    setFormData1((prev) => ({ ...prev, majorId: newValue?.id }))
                  }
                  options={majors || []}
                  getOptionLabel={(option) => option?.name || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Chọn ngành học" />
                  )}
                />
              </Grid>
              <Grid size={{ md: 5.5 }}>
                <Typography variant="h6">Ảnh</Typography>
                <Upload
                  listType="picture"
                  {...uploadProps1}
                  fileList={fileList1}
                  accept='image/*'
                >
                  {!imageUrl && ( // Chỉ hiển thị nút upload nếu chưa có ảnh
                    <ButtonAnt type="primary" icon={<UploadOutlined />}>
                      Upload
                    </ButtonAnt>
                  )}
                </Upload>
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Mô tả</Typography>
                <textarea onChange={(e) => setFormData1((prev) => ({ ...prev, description: e.target.value }))} placeholder="Hãy viết nội dung....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Hủy bỏ</Button>
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
                  src={image_Url || "https://th.bing.com/th/id/OIP.c3sJJ74lDvfpM_BWe_yxSwHaGI?rs=1&pid=ImgDetMain"}
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
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Tình trạng:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {getStatusLabel(status)}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Số dư ví:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {walletBalance}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Trường đại học:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {nameUniversity}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Giá:
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {consultantLevelPrice}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Miêu tả cấp độ:
                </Typography>
              </Grid>
              <Grid size={{ md: 9 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {consultantLevelDes}
                </Typography>
              </Grid>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Lịch tư vấn:
                </Typography>
              </Grid>
              <Grid size={{ md: 9 }}>
                <Typography variant="body1" sx={{ ml: 2 }} >
                  <Link to={`/historybooking/${id}`} style={{ color: '#16a34a', textDecoration: '#16a34a' }}>
                    Chi tiết
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Chứng chỉ:
                </Typography>
              </Grid>
              {certifications?.map((item, index) => (
                <Grid key={index} size={{ md: 3 }}>
                  <Image
                    width={100}
                    height={100}
                    src={item?.imageUrl}
                    style={{ zIndex: 2 }}
                  />
                  <Typography variant="body2" sx={{ color: '#616161' }}>
                    {item?.description}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog >
      <DeleteDialog open={dialog} onClose={handleCloseDialog} handleDelete={() => handleDelete()} />
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
        <MenuItem onClick={() => handleClickOpenDialog('Detail')}>
          <InfoIcon sx={{ mr: 2 }} />
          Chi tiết
        </MenuItem>
        {/* <MenuItem onClick={() => handleClickOpenDialog('Delete')} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xóa
        </MenuItem> */}
        <MenuItem onClick={handleBan} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          {status === 1 ? 'Chặn' : 'Mở chặn'}
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
  status: PropTypes.number,
  walletBalance: PropTypes.number,
  accountId: PropTypes.string,
  nameUniversity: PropTypes.string,
  consultantLevelPrice: PropTypes.number,
  image_Url: PropTypes.string,
  emailuniversity: PropTypes.string,
  consultantLevelDes: PropTypes.string,
  certifications: PropTypes.array,
  universityDes: PropTypes.string,
  consultantRelations: PropTypes.array
};
