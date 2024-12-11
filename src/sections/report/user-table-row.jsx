import { useEffect, useState } from 'react';
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
import Grid from '@mui/material/Grid2';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Image } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { actReset, actHandleReport } from 'src/store/report/action';
import InfoIcon from '@mui/icons-material/Info';




export default function UserTableRow({
  consultantName,
  id,
  studentName,
  startTime,
  endTime,
  consultationDay,
  rowKey,
  image,
  comment
}) {


  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');

  const dispatch = useDispatch();
  const { reports = [], success, } = useSelector((state) => state.reportReducer);


  const handleAccept = () => {
    dispatch(actHandleReport(id, formData));
    if (success) {
      dispatch(actReset());
      setDialog(null);
    }
  };


  const handleClickOpenDialog = (action) => {
    if (action === 'Accept') {
      setFormData({
        ...formData,
        type: 3,
      });
    } else if (action === 'Reject') {
      setFormData({
        ...formData,
        type: 2, // Cập nhật giá trị type thành 'Reject'
      });
    }
    setDialog(action);
    setOpen(null);
  };


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


  const handleCloseDialog = () => {
    setDialog('');
  };
  const [formData, setFormData] = useState({
    type: '',
    comment: '',
    image: ''
  });

  const handlechange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,

    });
  }

  const handleClose = () => {
    setDialog(null);
  };


  return (
    <>
      <TableRow hover >
        <TableCell>
          {rowKey}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {consultantName}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell sx={{ textAlign: 'center' }}>{studentName}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{`${startTime}-${endTime}`}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{consultationDay}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{comment}</TableCell>




        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog
        open={dialog === 'Accept'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
        style={{ zIndex: 1 }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
          Chấp nhận báo cáo
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Hình ảnh</Typography>
                {image && <Image alt='Lỗi hình ảnh' src={image} style={{ zIndex: 2, width: '100px', height: '100px' }} />}
              </Grid>
              <Grid size={{ md: 12 }} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Nhập nội dung</Typography>
                <textarea name='comment' onChange={handlechange} placeholder="Hãy viết mô tả..." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
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
        maxWidth="md"
        fullWidth
        style={{ zIndex: 1 }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
          Không chấp nhận báo cáo
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 6 }}>
                <Typography variant="h6">Hình ảnh</Typography>
                {image && <Image alt='Lỗi hình ảnh' src={image} style={{ zIndex: 2, width: '100px', height: '100px' }} />}
              </Grid>
              <Grid size={{ md: 12 }} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Nhập nội dung</Typography>
                <textarea name='comment' onChange={handlechange} placeholder="Hãy viết mô tả..." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                />
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
          Chi tiết các tố cáo
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
                      Tên người tư vấn:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {consultantName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Tên học sinh:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {studentName}
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
                      {`${startTime}-${endTime}`}
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
                  {comment}
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog >


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
  studentName: PropTypes.string,
  consultantName: PropTypes.string,
  id: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  rowKey: PropTypes.number,
  consultationDay: PropTypes.string,
  image: PropTypes.string,
  comment: PropTypes.string
};
