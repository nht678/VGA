import { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from 'src/firebaseConfig';
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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import DeleteDialog from 'src/pages/delete';

import { UploadOutlined } from '@ant-design/icons';
import { Button as ButtonAnt, message, Upload } from 'antd';
import InfoIcon from '@mui/icons-material/Info';

import { actUpdateOccupationAsync, resetOccupation, actDeleteOccupationAsync } from 'src/store/occupation/action';
import { actGetEntryLevelEducationsAsync } from 'src/store/entryLevelEducation/action';
import { actGetOccupationGroupAsync } from 'src/store/occupationGroup/action';
import { actGetWorkSkillsAsync } from 'src/store/workSkill/action';


// Hàm lấy nhãn trạng thái
const getStatusLabel = (status) => {
  switch (status) {
    case true:
      return 'Active';
    case false:
      return 'Blocked';
    default:
      return 'Unknown';
  }
};

// Hàm lấy màu cho Chip dựa trên trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case true:
      return 'success'; // Xanh lá
    case false:
      return 'error';   // Đỏ
    default:
      return 'default';
  }
};

export default function UserTableRow({
  occupationalSkills,
  name,
  image,
  id,
  entryLevelEducation,
  occupationalGroup,
  status,
  description,
  education,
  howToWork,
  jobOutlook,
  payScale,
  workEnvironment,
  rowKey,
  entryLevelEducationId,
  occupationalGroupId,
}) {

  console.log('entryLevelEducationId', entryLevelEducationId);



  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const { occupations, total = 0, successOccupation } = useSelector((state) => state.occupationReducer);
  const { entryLevelEducations } = useSelector((state) => state.entryLevelEducationReducer);
  console.log('entryLevelEducations', entryLevelEducations)
  const { occupationGroups } = useSelector((state) => state.occupationGroupReducer);
  const { workSkills } = useSelector((state) => state.workSkillReducer);

  const [formData, setFormData] = useState({
    entryLevelEducationId: entryLevelEducationId || "",
    occupationalGroupId: occupationalGroupId || "",
    name: name || "",
    description: description || "",
    howToWork: howToWork || "",
    workEnvironment: workEnvironment || "",
    education: education || "",
    payScale: payScale || "",
    jobOutlook: jobOutlook || "",
    image: image || "",
    occupationalSkills: occupationalSkills ||
      [
        {
          workSkillsId: "",
          content: "",
        },
      ],
  });

  const handleUpdateOccupation = () => {
    dispatch(actUpdateOccupationAsync({ formData, id }));
    if (successOccupation) {
      dispatch(resetOccupation());
    }
    handleCloseDialog();
  }



  const handleChangeField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addOccupationalSkill = () => {
    setFormData((prev) => ({
      ...prev,
      occupationalSkills: [
        ...prev.occupationalSkills,
        {
          workSkillsId: "",
          content: "",
        },
      ],
    }));
  };

  const removeOccupationalSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      occupationalSkills: prev.occupationalSkills.filter((_, i) => i !== index),
    }));
  };

  const updateOccupationalSkill = (index, field, value) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.occupationalSkills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [field]: value,
      };
      return {
        ...prev,
        occupationalSkills: updatedSkills,
      };
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Lưu URL ảnh
  const [fileList, setFileList] = useState([]); // Danh sách file của Upload

  const uploadProps = {
    name: "file",
    listType: "picture",
    fileList: fileList, // Hiển thị ảnh cũ nếu có
    beforeUpload: async (file) => {
      try {
        setSelectedFile(file);
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        setImageUrl(url); // Lưu URL vào state
        setFileList([{
          uid: file.uid,
          name: file.name,
          status: 'done',
          url,
        }]);

        setFormData((prevData) => ({
          ...prevData,
          image: url, // Lưu URL vào formData.image
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
        setFileList([]); // Xóa file trong fileList
        setImageUrl(""); // Xóa URL trong state

        setFormData((prevData) => ({
          ...prevData,
          image: "", // Xóa URL trong formData
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

  useEffect(() => {
    if (image) {
      setImageUrl(image); // Cập nhật imageUrl với avatarUrl nếu có
      setFileList([{
        uid: '-1', // Đảm bảo có một uid cho ảnh hiện tại
        name: 'image.jpg', // Đặt tên file phù hợp (có thể lấy tên ảnh từ avatarUrl)
        status: 'done', // Đảm bảo file đã được tải lên
        url: image, // URL ảnh cũ từ Firebase
      }]);
    }
  }, [image]); // Cập nhật fileList khi avatarUrl thay đổi



  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleDelete = () => {
    // console.log("id",id);
    dispatch(actDeleteOccupationAsync(id));
    if (successOccupation) {
      dispatch(resetOccupation());
    }
    handleCloseDialog();
  }

  const validateForm = () => {
    let newError = {};
    if (!formData.name) {
      newError.name = 'Tên không được để trống';
    }
    if (!formData.priceOnSlot) {
      newError.priceOnSlot = 'Giá trên mỗi slot không được để trống';
    }
    if (!formData.description) {
      newError.description = 'Mô tả không được để trống';
    }
    setError(newError);
    return Object.keys(newError).length === 0;
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
    setDialog('');
  };




  // const handleUpdateLevel = () => {
  //   if (!validateForm()) return;
  //   dispatch(actLevelUpdateAsync({ formData, id }));
  //   if (successLevel) {
  //     dispatch(resetLevelSuccess());
  //   }
  //   handleCloseDialog();
  // }


  const handleClose = () => {
    setDialog(null);
  };


  return (
    <>
      <TableRow hover >
        <TableCell >
          {rowKey}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={image} />
            <Typography variant="subtitle2" component='div' noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {entryLevelEducation?.length > 150 ? `${entryLevelEducation.slice(0, 150)}...` : entryLevelEducation}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {occupationalGroup?.length > 150 ? `${occupationalGroup.slice(0, 150)}...` : occupationalGroup}
        </TableCell>
        {/* <TableCell sx={{ textAlign: 'center' }}>
  {occupationalSkills?.length > 150 ? `${occupationalSkills.slice(0, 150)}...` : occupationalSkills}
</TableCell> */}
        <TableCell sx={{ textAlign: 'center' }}>
          {education?.length > 150 ? `${education.slice(0, 150)}...` : education}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {howToWork?.length > 150 ? `${howToWork.slice(0, 150)}...` : howToWork}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {jobOutlook?.length > 150 ? `${jobOutlook.slice(0, 150)}...` : jobOutlook}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {payScale?.length > 150 ? `${payScale.slice(0, 150)}...` : payScale}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {workEnvironment?.length > 150 ? `${workEnvironment.slice(0, 150)}...` : workEnvironment}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {description?.length > 150 ? `${description.slice(0, 150)}...` : description}
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
          Cập nhật nghề nghiệp
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
                  defaultValue={name}
                  error={!!error.name}
                  helperText={error.name}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <Autocomplete
                  fullWidth
                  onChange={(e, newValue) => handleChangeField('entryLevelEducationId', newValue?.id)}
                  value={entryLevelEducations.find((item) => item.id === formData?.entryLevelEducationId) || null}
                  options={entryLevelEducations || []}
                  getOptionLabel={(option) => option?.name || ''}
                  renderInput={(params) => <TextField {...params} label="Chọn trình độ đầu vào" />}
                />
              </Grid>

              <Grid size={{ md: 6 }}>
                <Autocomplete
                  fullWidth
                  value={occupationGroups.find((item) => item.id === formData?.occupationalGroupId) || null}
                  onChange={(e, newValue) => handleChangeField('occupationalGroupId', newValue?.id)}
                  options={occupationGroups || []}
                  getOptionLabel={(option) => option?.name || ''}
                  renderInput={(params) => <TextField {...params} label="Chọn nhóm nghề nghiệp" />}
                />
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Ảnh</Typography>
                <Upload
                  {...uploadProps}
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
                <textarea defaultValue={description} onChange={(e) => handleChangeField('description', e.target.value)} placeholder="Hãy viết Mô tả....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
                {error.description && <Typography variant='caption' color="error" >{error.description}</Typography>}
              </Grid>

              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Cách làm việc</Typography>
                <textarea defaultValue={howToWork} onChange={(e) => handleChangeField('howToWork', e.target.value)} placeholder="Hãy viết cách làm việc....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Môi trường làm việc</Typography>
                <textarea defaultValue={workEnvironment} onChange={(e) => handleChangeField('workEnvironment', e.target.value)} placeholder="Hãy viết môi trường làm việc....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Giáo dục</Typography>
                <textarea defaultValue={education} onChange={(e) => handleChangeField('education', e.target.value)} placeholder="Hãy viết giáo dục....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Thang lương</Typography>
                <textarea defaultValue={payScale} onChange={(e) => handleChangeField('payScale', e.target.value)} placeholder="Hãy viết giáo dục....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Triển vọng nghề nghiệp</Typography>
                <textarea defaultValue={jobOutlook} onChange={(e) => handleChangeField('jobOutlook', e.target.value)} placeholder="Hãy viết giáo dục....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
              </Grid>
            </Grid>

            {formData.occupationalSkills.map((skill, index) => (
              <Grid container spacing={2} sx={{ mt: 1 }} key={index} style={{ border: '1px solid black', borderRadius: '8px' }}>
                <Grid container size={{ md: 12 }} spacing={2} sx={{ justifyContent: 'center' }}>
                  <Grid size={{ md: 6 }} sx={{ mt: 1 }}>
                    <Autocomplete
                      fullWidth
                      value={workSkills.find((item) => item.id === skill?.workSkills?.id) || null}
                      onChange={(e, newValue) =>
                        updateOccupationalSkill(index, "workSkillsId", newValue?.id)
                      }
                      options={workSkills || []}
                      getOptionLabel={(option) => option?.name || ""}
                      renderInput={(params) => (
                        <TextField {...params} label="Chọn kĩ năng công việc" />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }}>
                  <Typography variant="h6">Nội dung</Typography>
                  <textarea defaultValue={skill?.content} onChange={(e) => updateOccupationalSkill(index, 'content', e.target.value)} placeholder="Hãy viết nội dung....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                  />
                </Grid>
                <Grid size={{ md: 12 }} sx={{ my: 1, justifyContent: 'center', display: 'flex' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeOccupationalSkill(index)}
                  >
                    Xóa
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Grid size={{ md: 12 }} sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
              <Button variant="contained" onClick={addOccupationalSkill}>
                Thêm kĩ năng nghề nghiệp
              </Button>
            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateOccupation} autoFocus>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>



      <DeleteDialog
        open={dialog}
        onClose={handleCloseDialog}
        handleDelete={handleDelete}
      />

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
  image: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  entryLevelEducation: PropTypes.string,
  status: PropTypes.bool,
  description: PropTypes.string,
  occupationalGroup: PropTypes.string,
  occupationalSkills: PropTypes.string,
  education: PropTypes.string,
  howToWork: PropTypes.string,
  jobOutlook: PropTypes.string,
  payScale: PropTypes.string,
  workEnvironment: PropTypes.string,
  rowKey: PropTypes.number,
  entryLevelEducationId: PropTypes.string,
  occupationalGroupId: PropTypes.string,
};
