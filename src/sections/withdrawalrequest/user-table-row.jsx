import { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from 'src/firebaseConfig';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
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
import Grid from '@mui/material/Grid2';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { Button as ButtonAnt, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import InfoIcon from '@mui/icons-material/Info';
import { requestWithdrawalAsync, resetTransaction } from 'src/store/transaction/action';
// Hàm lấy nhãn trạng thái
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

// Hàm lấy màu cho Chip dựa trên trạng thái
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
  id,
  description,
  transactionDateTime,
  transactionType,
  goldAmount,
  rowKey,
}) {

  console.log('transactionType', transactionType);


  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');

  const dispatch = useDispatch();

  const { transactions = [], total = 0, success } = useSelector((state) => state.transactionReducer);

  let nameHighSchool = localStorage.getItem('name');


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickOpenDialog = (action) => {
    if (action === 'Accept') {
      setFormData({
        ...formData,
        type: 6,
      });
    } else if (action === 'Reject') {
      setFormData({
        ...formData,
        type: 5, // Cập nhật giá trị type thành 'Reject'
      });
    }
    setDialog(action);
    setOpen(null);
  };

  const handleCloseDialog = () => {
    setDialog(null);
  };

  const handleClose = () => {
    setDialog(null);
  };

  const handleAccept = () => {
    dispatch(requestWithdrawalAsync(id, formData));
    if (success) {
      dispatch(resetTransaction());
      setDialog(null);
    }
  };

  const [formData, setFormData] = useState({
    type: '',
    image: ''
  });

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
        await deleteImageFromFirebase(imageUrl); // Xóa ảnh từ Firebase
        setSelectedFile(null); // Xóa file trong state
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



  return (
    <>
      <TableRow hover>
        <TableCell>
          {rowKey}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" component='div' noWrap>
              {nameHighSchool}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell
          sx={{
            textAlign: 'center',
            color: transactionType === 2 ? 'red' : transactionType === 1 ? 'green' : 'inherit',
            fontWeight: 'bold',
          }}
        >
          {transactionType === 2 ? `- ${goldAmount}` : transactionType === 1 ? `+ ${goldAmount}` : goldAmount}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{transactionDateTime}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {description}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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
          Chi tiết giao dịch
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: 3 }}
          >
            <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }}>
              <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px', mt: 2, px: 3 }} >
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Tên:
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
                      Số điểm:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2"
                      sx={{
                        textAlign: 'center',
                        color: transactionType === 2 ? 'red' : transactionType === 1 ? 'green' : 'inherit',
                        fontWeight: 'bold',
                      }}
                    >
                      {transactionType === 2 ? `- ${goldAmount}` : transactionType === 1 ? `+ ${goldAmount}` : goldAmount}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Thời gian:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {transactionDateTime}
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

      <Dialog
        open={dialog === 'Accept'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
          Chấp nhận giao dịch
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 12 }} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Ảnh giao dịch</Typography>
                <Upload
                  listType="picture"
                  {...uploadProps}
                  fileList={fileList}
                >
                  {!imageUrl && ( // Chỉ hiển thị nút upload nếu chưa có ảnh
                    <ButtonAnt type="primary" icon={<UploadOutlined />}>
                      Upload
                    </ButtonAnt>
                  )}
                </Upload>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleAccept} autoFocus>
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialog === 'Reject'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
          Bạn có chăc muốn hủy bỏ giao dịch?
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 12 }} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6"> Giao dịch sẽ bị hủy bỏ</Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleAccept} autoFocus>
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>
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

        <MenuItem onClick={() => handleClickOpenDialog('Accept')}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Chấp nhận
        </MenuItem>
        <MenuItem onClick={() => handleClickOpenDialog('Reject')}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Từ chối
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
  description: PropTypes.string,
  transactionDateTime: PropTypes.string,
  goldAmount: PropTypes.number,
  rowKey: PropTypes.number,
  transactionType: PropTypes.string,
};
