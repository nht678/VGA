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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import DeleteDialog from 'src/pages/delete';

import { Image } from 'antd';
import InfoIcon from '@mui/icons-material/Info';
import { actDeleteTestLessonAsync, actResetSuccessQuestion, actGetquestionbyTestIdAsync, actUpdateQuestionAsync, actDeleteQuestionAsync, actCreateQuestionAsync } from 'src/store/testLesson/action';
import { validateFormData, isRequired } from '../formValidation';





export default function UserTableRow({
  content,
  id,
  group,
  rowKey,
  answerModels
}) {

  const [open, setOpen] = useState(null);
  const [dialog, setDialog] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { testLessons = [], successQuestion, typestest = [], totalQuestion = 0, questions = [] } = useSelector((state) => state.testLessonReducer);

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


  const handleClose = () => {
    setDialog('');
  };

  const answerValue = [
    { key: "Extraversion (E)", value: 1 },
    { key: "Introversion (I)", value: 2 },
    { key: "Sensing (S)", value: 3 },
    { key: "Intuition (N)", value: 4 },
    { key: "Thinking (T)", value: 5 },
    { key: "Feeling (F)", value: 6 },
    { key: "Judging (J)", value: 7 },
    { key: "Perceiving (P)", value: 8 },
  ];
  const groupValue = [
    { key: 'MBTI', value: 0 },
    { key: "Realistic", value: 1 },
    { key: "Investigative", value: 2 },
    { key: "Artistic", value: 3 },
    { key: "Social", value: 4 },
    { key: "Enterprising", value: 5 },
    { key: "Conventional", value: 6 },
  ];


  const [formData, setFormData] = useState({
    content: content,
    group: group,
    answers: answerModels || [
      { content: "", answerValue: 1 },
      { content: "", answerValue: 1 },
    ],
  });

  const rules = {
    content: [isRequired('Câu hỏi')],
  };

  const validateForm = () => {
    const newErrors = validateFormData(formData, rules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAnswerChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedAnswers = [...prev.answers];
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        [field]: value,
      };
      return { ...prev, answers: updatedAnswers };
    });
  };
  const handleChangeField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateQuestion = async () => {
    if (!validateForm()) return;
    dispatch(actUpdateQuestionAsync({ formData, id }));
    if (successQuestion) {
      dispatch(actResetSuccessQuestion());
    }
    handleClose();
  }

  const handleDelete = () => {
    dispatch(actDeleteQuestionAsync(id));
    if (successQuestion) {
      dispatch(actResetSuccessQuestion());
    }
    handleCloseDialog();
  }

  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Tăng giá trị để kích hoạt lại useEffect
  };

  // Đồng bộ hóa state khi props thay đổi
  useEffect(() => {
    setFormData({
      content: content,
      group: group,
      answers: answerModels || [
        { content: "", answerValue: 1 },
        { content: "", answerValue: 1 },
      ],
    });
  }, [content, group, answerModels]); // Chạy khi bất kỳ prop nào thay đổi


  return (
    <>
      <TableRow hover >
        <TableCell>
          {rowKey}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {content?.length > 30 ? `${content.slice(0, 30)} ...` : content}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}> {groupValue.find((groupV) => groupV.value === group)?.key || 'N/A'}</TableCell>
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
        aria-describedby="alert-dialog-group"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
          Cập nhật câu hỏi
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-group">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ md: 12 }}>
                <Typography variant="h6">Câu hỏi</Typography>
              </Grid>
              <Grid size={{ md: 12 }}>
                <TextField
                  fullWidth
                  defaultValue={formData.content}
                  label="Câu hỏi"
                  variant="outlined"
                  margin="dense"
                  onChange={(e) => handleChangeField("content", e.target.value)}
                  error={!!errors.content}
                  helperText={errors.content}
                />
              </Grid>

              {/* Group của câu hỏi */}
              <Grid size={{ md: 12 }}>
                <Autocomplete
                  options={groupValue}
                  getOptionLabel={(option) => option.key}
                  value={groupValue.find((item) => item.value === formData.group) || null}
                  onChange={(e, value) => handleChangeField("group", value?.value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Nhóm"
                      variant="outlined"
                      margin="dense"
                    />
                  )}
                />
              </Grid>

              {formData.answers.map((answer, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Đáp án {index + 1}</Typography>
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <TextField
                      fullWidth
                      label="Nội dung"
                      variant="outlined"
                      margin="dense"
                      defaultValue={formData.answers[index].content}
                      onChange={(e) => handleAnswerChange(index, "content", e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Autocomplete
                      options={answerValue}
                      getOptionLabel={(option) => option.key}
                      value={answerValue.find((item) => item.value === answer.answerValue) || null}
                      onChange={(e, value) => handleAnswerChange(index, "answerValue", value?.value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Giá trị"
                          variant="outlined"
                          margin="dense"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleUpdateQuestion} autoFocus>
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
          Chi tiết Câu hỏi
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
                      Câu hỏi:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {content}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      Nhóm:
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                      {groupValue.find((groupV) => groupV.value === group)?.key || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid size={{ md: 12 }} container spacing={2} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                  {answerModels?.map((answer, index) => (
                    <Grid size={{ md: 12 }} container spacing={2} key={index} sx={{ border: '1px solid #e0e0e0', padding: 1, borderRadius: '4px' }} >
                      <Grid size={{ md: 12 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#424242' }}>
                          Đáp án {index + 1}:
                        </Typography>
                      </Grid>
                      <Grid size={{ md: 12 }}>
                        <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                          {answer.content}
                        </Typography>
                      </Grid>
                      <Grid size={{ md: 12 }}>
                        <Typography variant="body2" sx={{ ml: 2, color: '#616161' }}>
                          {answerValue.find((answerV) => answerV.value === answer.answerValue)?.key || 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
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
        <MenuItem onClick={() => {
          handleClickOpenDialog('edit')
        }
        }>
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
  content: PropTypes.string,
  id: PropTypes.number,
  group: PropTypes.number,
  rowKey: PropTypes.number,
  answerModels: PropTypes.array,
};
