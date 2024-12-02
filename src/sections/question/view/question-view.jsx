import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
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

import Grid from '@mui/system/Grid';
import { message } from 'antd';



import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import Autocomplete from '@mui/material/Autocomplete';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actDeleteTestLessonAsync, actResetSuccessQuestion, actGetquestionbyTestIdAsync, actUpdateQuestionAsync, actDeleteQuestionAsync, actCreateQuestionAsync } from 'src/store/testLesson/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';
import { validateFormData, isRequired } from '../../formValidation';


// ----------------------------------------------------------------------

export default function QuestionView() {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setErrors] = useState({});

  const dispatch = useDispatch();
  // use params
  const { id } = useParams();

  const { testLessons = [], successQuestion, typestest = [], totalQuestion = 0, questions = [] } = useSelector((state) => state.testLessonReducer);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actGetquestionbyTestIdAsync({ page: newPage + 1, pageSize: rowsPerPage, search: filterName, id })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actGetquestionbyTestIdAsync({ page: 1, pageSize: newRowsPerPage, search: filterName, id })); // Gọi API với `pageSize` mới
  };

  // write code here
  const [open, setOpen] = useState('');

  const handleClickOpen = (Typedialog) => {
    setOpen(Typedialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(actGetquestionbyTestIdAsync({ page: 1, pageSize: rowsPerPage, search: filterValue, id }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actGetquestionbyTestIdAsync({ page: 1, pageSize: rowsPerPage, id }));
    }
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
    { key: 'khong biet', value: 0 },
    { key: "Realistic", value: 1 },
    { key: "Investigative", value: 2 },
    { key: "Artistic", value: 3 },
    { key: "Social", value: 4 },
    { key: "Enterprising", value: 5 },
    { key: "Conventional", value: 6 },
  ];

  const [formData, setFormData] = useState({
    content: "",
    group: '',
    personalTestId: id,
    answers: [
      { content: "", answerValue: '' },
      { content: "", answerValue: '' },
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

  const handleAddQuestion = async () => {
    if (!validateForm()) return;
    dispatch(actCreateQuestionAsync(formData));
    if (successQuestion) {
      dispatch(actResetSuccessQuestion());
      setFormData({
        content: "",
        group: 0,
        personalTestId: id,
        answers: [
          { content: "", answerValue: 1 },
          { content: "", answerValue: 1 },
        ],
      });
    }
    handleClose();
  };


  useEffect(() => {
    dispatch(actGetquestionbyTestIdAsync({ page: page + 1, pageSize: rowsPerPage, id }));
  }, [successQuestion]);


  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Câu hỏi</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
            Tạo câu hỏi
          </Button>


          <Dialog
            open={open === 'Create'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              Tạo câu hỏi
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 12 }}>
                    <Typography sx={{ textAlign: 'center' }} variant="h6">Nếu là bài HOLLAND vui lòng không nhập câu trả lời</Typography>
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <TextField
                      fullWidth
                      label="Câu hỏi"
                      variant="outlined"
                      margin="dense"
                      value={formData.content}
                      onChange={(e) => handleChangeField("content", e.target.value)}
                      error={!!error.content}
                      helperText={error.content}
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
                    {error.group && <Typography variant='caption' color="error"> {error.group} </Typography>}
                  </Grid>

                  {formData.answers.map((answer, index) => (
                    <Grid container size={{ md: 12 }} spacing={2} key={index}>
                      <Grid size={{ md: 12 }}>
                        <Typography variant="h6">Đáp án {index + 1}</Typography>
                      </Grid>
                      <Grid size={{ md: 12 }}>
                        <TextField
                          fullWidth
                          label="Nội dung"
                          variant="outlined"
                          margin="dense"
                          value={answer.content}
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
              <Button onClick={handleAddQuestion} autoFocus>
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
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
                headLabel={[
                  { id: 'content', label: 'Câu hỏi' },
                  { id: 'group', label: 'Nhóm', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {questions?.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    id={row?.questionId}
                    rowKey={index + 1}
                    content={row?.content}
                    group={row?.group}
                    answerModels={row?.answerModels}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          component="div"
          count={totalQuestion}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25]}
        />


      </Card>
    </>
  );
}
