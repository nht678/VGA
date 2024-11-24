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
import { actUpdateNewsContentAsync, actCreateNewsImageAsync, actDeleteNewsImageAsync, resetNewsSuccess, actDeleteNewsAsync } from 'src/store/NewsForUniversity/action';
import { UploadOutlined } from '@ant-design/icons';
import { Button as ButtonAnt, message, Upload, Image } from 'antd';
import InfoIcon from '@mui/icons-material/Info';


// Hàm lấy nhãn trạng thái


export default function UserTableRow({
  imageSingle,
  id,
  title,
  content,
  createAt,
  imageNews,
  rowKey
}) {
  console.log('id', id)
  console.log('title', title)
  console.log('content', content)


  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { news, total = 0, success } = useSelector((state) => state.newsForUniversityReducer);

  const handleDelete = async () => {
    await dispatch(actDeleteNewsAsync(id)); // Đảm bảo hàm này hoàn tất

    if (success) { // Kiểm tra lại giá trị success sau khi dispatch hoàn tất
      dispatch(resetNewsSuccess());
    }

    handleCloseDialog();
  };
  // const validateForm = () => {
  //   let newErrors = {};
  //   if (!formData.name) {
  //     newErrors.name = 'Tên không được để trống';
  //   }
  //   if (!formData.priceOnSlot) {
  //     newErrors.priceOnSlot = 'Giá trên mỗi slot không được để trống';
  //   }
  //   if (!formData.description) {
  //     newErrors.description = 'Mô tả không được để trống';
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // }



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

  const handleClose = () => {
    setDialog(null);
  };
  // const [imageNews, setImageNews] = useState([]); // Lưu thông tin hình ảnh
  const [fileList, setFileList] = useState([]); // Lưu danh sách file cho upload component
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageToUpdate, setImageToUpdate] = useState(null); // Hình ảnh cần cập nhật
  const [formData, setFormData] = useState({
    title: title,
    content: content,
    imageNews: [],
  });

  useEffect(() => {
    if (imageNews && imageNews.length > 0) {
      const initialFileList = imageNews.map((item) => ({
        uid: item.id, // Dùng id của từng item làm uid
        name: item.descriptionTitle, // Lấy tên mô tả làm tên file
        status: 'done',
        url: item.imageUrl, // Lấy URL của ảnh
      }));
      setFileList(initialFileList);
    }
  }, [imageNews]);

  const handleFileChange = (fileList1) => {
    setFileList(fileList1);
  };

  // // Hàm upload ảnh
  // const uploadImage = async (file) => {
  //   const storageRef = ref(storage, `images/${file.name}`);
  //   await uploadBytes(storageRef, file);
  //   return getDownloadURL(storageRef);
  // };

  // const initiateUpdate = (url) => {
  //   setImageToUpdate(url);
  // };

  // const handleUpdateImage = async (e) => {
  //   const newFile = e.target.files[0];
  //   if (newFile && imageToUpdate) {
  //     // Xóa ảnh cũ
  //     const oldRef = ref(storage, imageToUpdate);
  //     await deleteObject(oldRef);

  //     // Upload ảnh mới
  //     const updatedUrl = await uploadImage(newFile);

  //     // Cập nhật lại state với URL mới
  //     setImageNews(prevImageNews =>
  //       prevImageNews.map(item =>
  //         item.imageUrl === imageToUpdate
  //           ? { ...item, imageUrl: updatedUrl }
  //           : item
  //       )
  //     );
  //     setImageToUpdate(null); // Reset imageToUpdate
  //   }
  // };
  // Các props cho component Upload
  // Hàm upload từng ảnh và gửi dữ liệu về backend
  const handleUploadSingle = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const imageData = [{ imageUrl: url, descriptionTitle: file.name }];

    // Gửi dữ liệu `{ imageUrl, descriptionTitle }` đến backend
    // await sendImageToBackend(imageData, id);
    console.log("Đang gửi dữ liệu ảnh lên backend:", imageData, id);
    dispatch(actCreateNewsImageAsync({ imageData, id }));
    // Cập nhật formData với dữ liệu ảnh đã upload
    setFormData((prevData) => ({
      ...prevData,
      imageNews: [...prevData.imageNews, imageData],
    }));
  };

  // Hàm gửi hình ảnh lên backend
  // const sendImageToBackend = async (imageData, id1) => {
  //   // Gọi API hoặc phương thức backend để gửi imageData
  //   console.log("Đang gửi dữ liệu ảnh lên backend:", imageData, id1);
  //   dispatch(actCreateNewsImageAsync({ imageData, id1 }));
  //   // await api.uploadImage(imageData);
  // };

  // Cấu hình Upload của Ant Design
  const uploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload(file) {
      setSelectedFiles((prevFiles) => [...prevFiles, file]);
      setFileList((prevList) => [
        ...prevList,
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: URL.createObjectURL(file),
        },
      ]);
      handleUploadSingle(file); // Gọi hàm upload ngay khi file được chọn
      return false;
    },
    onRemove(file) {
      // Loại bỏ file khỏi selectedFiles và fileList
      setSelectedFiles((prevFiles) => prevFiles.filter((f) => f.uid !== file.uid));
      setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));

      // Gọi API xóa hình ảnh khỏi backend dựa trên ID hoặc URL
      handleDeleteImage(file.uid);
      deleteImageFireBase(file.path || `images/${file.name}`); // Adjust path if necessary
    },
  };
  const deleteImageFireBase = async (filePath) => {
    try {
      // Create a reference to the file to delete based on its path
      const imageRef = ref(storage, filePath);
      await deleteObject(imageRef); // Delete image from Firebase Storage

      // Remove the image from the fileList in state
      setFileList((prevList) => prevList.filter((item) => item.url !== filePath));
    } catch (error) {
      console.error("Error deleting image from Firebase:", error);
    }
  };




  // Hàm xóa ảnh qua API
  const handleDeleteImage = async (imageId) => {
    // Gọi API xóa hình ảnh tại backend dựa trên imageId
    console.log("Đang xóa ảnh với ID:", imageId);
    dispatch(actDeleteNewsImageAsync(imageId));
    // await api.deleteImage(imageId);
  };

  const handleUpdateNews = async () => {
    // Chuỗi 1: Cập nhật nội dung (title, content)
    const updatedContent = {
      title: formData.title,
      content: formData.content,
    };

    console.log("Dữ liệu cập nhật nội dung:", updatedContent);
    dispatch(actUpdateNewsContentAsync({ formData: updatedContent, id }));

    handleCloseDialog();

    // Chuỗi 2: Upload và cập nhật hình ảnh nếu có thay đổi
    // const uploadedImages = await Promise.all(
    //   selectedFiles.map(async (file) => {
    //     const storageRef = ref(storage, `images/${file.name}`);
    //     await uploadBytes(storageRef, file);
    //     const url = await getDownloadURL(storageRef);
    //     return {
    //       imageUrl: url,
    //       descriptionTitle: file.name,
    //     };
    //   })
    // );

    // // Gộp ảnh đã upload mới vào imageNews hiện tại để tạo updatedImages
    // const updatedImages = [
    //   ...imageNews, // Giữ lại những ảnh cũ
    //   ...uploadedImages, // Thêm những ảnh mới upload
    // ];

    // console.log("Dữ liệu cập nhật ảnh:", updatedImages);

    // Gửi dữ liệu lên backend (cả content và imageNews)
    // Có thể gửi cả `updatedContent` và `updatedImages` lên API backend
  };

  return (
    <>
      <TableRow hover >
        <TableCell>
          {rowKey}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={title} src={imageSingle} />
            <Typography variant="subtitle2" component='div' noWrap>
              {title}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell sx={{ textAlign: 'center' }}>
          {content?.length > 150 ? `${content.slice(0, 150)}...` : content}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{createAt}</TableCell>
        {/* <TableCell sx={{ textAlign: 'center' }}>{imageNews}</TableCell> */}


        {/* <TableCell align="center">
          <Chip
            label={getStatusLabel(status)}
            color={getStatusColor(status)}
            variant="outlined"
          />
        </TableCell> */}

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
          {"Cập nhật tin tức"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Tiêu đề</Typography>
                <textarea
                  name="title"
                  defaultValue={title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Hãy viết tiêu đề....."
                  style={{ width: '100%', height: '50px', borderRadius: '5px', border: '1px solid black' }}
                />
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Nội dung</Typography>
                <textarea
                  name="content"
                  defaultValue={content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Hãy viết nội dung....."
                  style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
              </Grid>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Ảnh</Typography>
                <Upload
                  listType="picture"
                  fileList={fileList} // Sử dụng fileList từ state
                  {...uploadProps}
                  onChange={(info) => handleFileChange(info.fileList)} // Đồng bộ fileList nếu cần
                >
                  <ButtonAnt type="primary" icon={<UploadOutlined />}>
                    Upload
                  </ButtonAnt>
                </Upload>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateNews} autoFocus>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog >

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
          Chi tiết tin tức
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
                  src={imageSingle}
                  style={{ zIndex: 2 }}
                  alt={title}
                />
              </Grid>
              <Grid size={{ md: 8 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }} >
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Tiều đề:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {title}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Ngày tạo:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {createAt}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                  Nội dung:
                </Typography>
              </Grid>
              <Grid size={{ md: 9 }}>
                <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                  {content}
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
  imageSingle: PropTypes.any,
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  createAt: PropTypes.string,
  imageNews: PropTypes.any,
  rowKey: PropTypes.number
};
