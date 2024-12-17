import { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject, getMetadata } from 'firebase/storage';
import { storage } from 'src/firebaseConfig';
import { Upload, Button as ButtonAnt, Image } from 'antd';
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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import DeleteDialog from 'src/pages/delete';
import { actUpdateMajorCategoryAsync, actDeleteMajorCategoryAsync, resetMajorCategorySuccess } from 'src/store/majorCategory/action';
import InfoIcon from '@mui/icons-material/Info';
import { validateFormData, isRequired } from '../formValidation';


// Hàm lấy nhãn trạng thái
const getStatusLabel = (status) => {
  switch (status) {
    case true:
      return 'Hoạt động';
    case false:
      return 'Không hoạt động';
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
  name,
  avatarUrl,
  id,
  status,
  rowKey,
  description
}) {

  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { majorCategories, total = 0, success } = useSelector((state) => state.majorCategoryReducer);
  const [formData, setFormData] = useState({
    name: name,
    description: description,
    image: avatarUrl,
  });

  const rules = {
    name: [isRequired('Tên')],
    description: [isRequired('Mô tả')],
    image: [isRequired('Ảnh')],
  };

  const validateForm = () => {
    const newErrors = validateFormData(formData, rules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleDelete = () => {
    dispatch(actDeleteMajorCategoryAsync(id));
    if (success) {
      dispatch(resetMajorCategorySuccess());
      handleCloseDialog();
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(avatarUrl || ""); // Lưu URL ảnh (có thể là ảnh cũ nếu có avatarUrl)
  const [fileList, setFileList] = useState([]); // Danh sách file của Upload

  useEffect(() => {
    if (avatarUrl) {
      setImageUrl(avatarUrl); // Cập nhật imageUrl với avatarUrl nếu có
      setFileList([{
        uid: '-1', // Đảm bảo có một uid cho ảnh hiện tại
        name: 'image.jpg', // Đặt tên file phù hợp (có thể lấy tên ảnh từ avatarUrl)
        status: 'done', // Đảm bảo file đã được tải lên
        url: avatarUrl, // URL ảnh cũ từ Firebase
      }]);
    }
  }, [avatarUrl]); // Cập nhật fileList khi avatarUrl thay đổi

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
  ;

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


  const handlechange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,

    });
  }

  const handleUpdateMajorCategory = () => {
    if (!validateForm()) {
      return;
    }
    dispatch(actUpdateMajorCategoryAsync({ formData, id }));
    if (success) {
      dispatch(resetMajorCategorySuccess());
      handleClose();
    }
  };

  const handleClose = () => {
    setDialog(null);
  };


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
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
        <TableCell align="center">
          {description}
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
          Cập nhật thể loại ngành
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 12 }}>
                <TextField
                  fullWidth
                  defaultValue={name}
                  name='name'
                  label="Tên"
                  onChange={handlechange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Description</Typography>
                <textarea
                  defaultValue={description}
                  style={{ width: '100%', height: '100px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
                  label="Mô tả"
                  name='description'
                  placeholder='Hãy viết mô tả...'
                  onChange={handlechange}
                />
                {errors.description && <Typography variant='caption' color="error" >{errors.description}</Typography>}
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Ảnh</Typography>
                <Upload
                  {...uploadProps}
                  accept='image/*'
                >
                  {!imageUrl && ( // Chỉ hiển thị nút upload nếu chưa có ảnh
                    <ButtonAnt type="primary" icon={<UploadOutlined />}>
                      Upload
                    </ButtonAnt>
                  )}
                </Upload>
                {errors.image && <Typography variant='caption' color="error" >{errors.image}</Typography>}
              </Grid>

            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateMajorCategory} autoFocus>
            Cập nhật
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
          Chi tiết Lĩnh vực chuyên môn chính
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
                  src={avatarUrl}
                  style={{ zIndex: 2 }}
                />
              </Grid>
              <Grid size={{ md: 8 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }} >
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Lĩnh vực chuyên môn chính
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
                      Tình trạng:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {getStatusLabel(status)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>




      </Dialog >


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
  avatarUrl: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.number,
  status: PropTypes.bool,
  rowKey: PropTypes.number,
  description: PropTypes.string,
};
