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
import { actUpdateMajorAsync, resetMajor, actDeleteMajorAsync } from 'src/store/major/action';
import InfoIcon from '@mui/icons-material/Info';

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
  avatarUrl,
  id,
  name,
  majorCategoryName,
  status,
  description,
  code,
  majorCategoryId,
  rowKey
}) {


  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [error, setError] = useState({});
  const [majorCategoriesInputValue, setMajorCategoriesInputValue] = useState(''); // Giá trị input


  const dispatch = useDispatch();

  const { majors, total = 0, success } = useSelector((state) => state.majorReducer);
  console.log('majors', majors)
  const { majorCategories } = useSelector((state) => state.majorCategoryReducer);
  console.log('majorCategories', majorCategories);

  const [majorCategoriesValue, setMajorCategoriesValue] = useState(
    majorCategories.find((item) => item.id === majorCategoryId) || null
  );
  console.log('majorCategoriesValue', majorCategoriesValue);

  const handleMajorCategoriesChange = (event, newValue) => {
    setMajorCategoriesValue(newValue);
    setFormData((prevData) => ({
      ...prevData,
      majorCategoryId: newValue?.id || '',
    }));
  };

  const handleDelete = () => {
    dispatch(actDeleteMajorAsync(id));
    if (success) {
      dispatch(resetMajor());
    }
    handleCloseDialog();
  }

  const validateForm = () => {
    let newErrors = {};
    if (!formData.code) {
      newErrors.code = 'Mã ngành không được để trống';
    }
    if (!formData.name) {
      newErrors.name = 'Tên ngành không được để trống';
    }
    if (!formData.majorCategoryId) {
      newErrors.majorCategoryId = 'Thể loại ngành không được để trống';
    }
    if (!formData.description) {
      newErrors.description = 'Mô tả không được để trống';
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }

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
  const [formData, setFormData] = useState({
    code: code,
    name: name,
    majorCategoryId: majorCategoryId,
    description: description,
    image: avatarUrl
  });

  const handlechange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,

    });
  }

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

  const handleUpdateMajor = () => {
    if (validateForm()) {
      dispatch(actUpdateMajorAsync({ formData, id }));
      if (success) {
        dispatch(resetMajor());
      }
      handleClose();
    }
  }

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
            <Typography variant="subtitle2" component='div' noWrap>
              {code?.length > 30 ? `${code.slice(0, 30)}...` : code}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{name}</TableCell>


        <TableCell sx={{ textAlign: 'center' }}>{majorCategoryName}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {description?.length > 50 ? `${description.slice(0, 100)}...` : description}
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
          Cập nhật ngành học
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={code}
                  name='code'
                  label="Mã ngành"
                  onChange={handlechange}
                  error={!!error.code}
                  helperText={error.code}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <TextField
                  fullWidth
                  defaultValue={name}
                  name='name'
                  label="Tên"
                  onChange={handlechange}
                  error={!!error.name}
                  helperText={error.name}
                />
              </Grid>

              <Grid size={{ md: 6 }}>
                <Autocomplete
                  fullWidth
                  value={majorCategoriesValue}
                  onChange={handleMajorCategoriesChange}
                  inputValue={majorCategoriesInputValue}
                  onInputChange={(event, newInputValue) => {
                    setMajorCategoriesInputValue(newInputValue);
                  }}
                  id="majorCategories"
                  options={majorCategories}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label="Thể loại ngành" />}
                />
                {error.majorCategoryId && <Typography variant='caption' color="error" >{error.majorCategoryId}</Typography>}
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
                <textarea defaultValue={description} name='description' onChange={handlechange} placeholder="Hãy viết Mô tả....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
                {error.description && <Typography variant='caption' color="error" >{error.description}</Typography>}
              </Grid>


            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateMajor} autoFocus>
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
          Chi tiết ngành học
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
                      Mã ngành:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {code}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Tên ngành:
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
                      Thể loại ngành:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {majorCategoryName}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Mô tả:
                </Typography>
              </Grid>
              <Grid size={{ md: 9 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {description}
                </Typography>
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
  id: PropTypes.number,
  name: PropTypes.string,
  majorCategoryName: PropTypes.string,
  status: PropTypes.bool,
  description: PropTypes.string,
  code: PropTypes.string,
  majorCategoryId: PropTypes.string,
  rowKey: PropTypes.number
};
