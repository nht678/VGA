import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from 'src/firebaseConfig';

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

import { UploadOutlined } from '@ant-design/icons';
import { Button as ButtonAnt, message, Upload } from 'antd';

import Grid from '@mui/system/Grid';



import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useSelector, useDispatch } from 'react-redux';

import { actGetNewsAsync, actAddNewsAsync, resetNewsSuccess } from 'src/store/NewsForUniversity/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';


// ----------------------------------------------------------------------

export default function NewsForUniversityView() {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setError] = useState({});

  let userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState(
    {
      title: '',
      content: '',
      imageNews: [],
    }
  );

  console.log('formData', formData);



  // write code here

  const dispatch = useDispatch();

  const { news, total = 0, success } = useSelector((state) => state.newsForUniversityReducer);
  console.log('news', news)




  const [options, setOptions] = useState([]); // Danh sách tỉnh thành
  console.log('option', options)
  const [value, setValue] = useState(null); // Giá trị đã chọn
  console.log('value', value);
  const [inputValue, setInputValue] = useState(''); // Giá trị input\
  console.log('inputValue', inputValue);

  // Function để cập nhật formData với giá trị đã chọn
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actGetNewsAsync({ page: newPage + 1, pageSize: rowsPerPage })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(actGetNewsAsync({ page: 1, pageSize: newRowsPerPage })); // Gọi API với `pageSize` mới
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
      dispatch(actGetNewsAsync({ page: 1, pageSize: rowsPerPage, search: filterValue }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(actGetNewsAsync({ page: 1, pageSize: rowsPerPage }));
    }
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // Hàm lưu file đã chọn vào state và ngăn upload mặc định của antd
  const uploadProps = {
    name: 'file',
    multiple: true,  // Cho phép chọn nhiều file
    beforeUpload(file) {
      setSelectedFiles(prevFiles => [...prevFiles, file]);  // Thêm file vào danh sách
      return false;  // Ngăn chặn upload mặc định của antd
    },
    onRemove(file) {
      setSelectedFiles(prevFiles => prevFiles.filter(f => f.uid !== file.uid)); // Remove file from list
    },
  };

  // Hàm upload tất cả ảnh đã chọn lên Firebase và lấy URL
  const handleUpload = async () => {
    const uploadedUrls = await Promise.all(
      selectedFiles.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setImageUrls((prevUrls) => [...prevUrls, url]);
        return { imageUrl: url, descriptionTitle: file.name };
      })
    );

    // Cập nhật `formData.imageNews` với các URL đã upload
    setFormData((prevData) => ({
      ...prevData,
      imageNews: [...prevData.imageNews, ...uploadedUrls],
    }));

    // Trả về các URL đã upload để sử dụng nếu cần
    return uploadedUrls;
  };

  // Hàm xử lý khi nhấn nút Tạo mới
  const handleAddNews = async () => {
    // Chờ hoàn thành upload và lấy dữ liệu các URL đã upload
    const uploadedUrls = await handleUpload();
    const newsData = {
      universityId: userId,
      title: formData.title,
      content: formData.content,
      imageNews: uploadedUrls,
    };
    console.log("Dữ liệu gửi đi:", newsData);
    dispatch(actAddNewsAsync(newsData));

    setFormData({
      title: '',
      content: '',
      imageNews: [],
    });
    setSelectedFiles([]);
    dispatch(resetNewsSuccess());
    handleClose();
    // setImageUrls([]);
    // Gửi `newsData` tới server hoặc thực hiện hành động tiếp theo
  };
  // dispatch(actAddNewsAsync(newsData));

  useEffect(() => {
    dispatch(actGetNewsAsync({ page: page + 1, pageSize: rowsPerPage, universityid: userId }));

  }, [success]);

  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Tin tức</Typography>
        <Box>
          <Button sx={{ marginRight: 2 }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
            Tạo tin tức
          </Button>


          <Dialog
            open={open === 'Create'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ marginLeft: 1, textAlign: 'center' }}>
              Tạo mới tin tức
            </DialogTitle>
            <DialogContent >
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Tiêu đề</Typography>
                    <textarea name='title' onChange={handlechange} placeholder="Hãy viết tiêu đề....." style={{ width: '100%', height: '50px', borderRadius: '5px', border: '1px solid black' }}
                    />
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Nội dung</Typography>
                    <textarea name='content' onChange={handlechange} placeholder="Hãy viết nội dung....." style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                    />
                  </Grid>
                  <Grid size={{ md: 12 }}>
                    <Typography variant="h6">Ảnh</Typography>
                    <Upload
                      listType="picture"
                      {...uploadProps}
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
              <Button onClick={handleAddNews} autoFocus>
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
                  { id: 'title', label: 'Tiêu đề' },
                  { id: 'content', label: 'Nội dung', align: 'center' },
                  { id: 'createAt', label: 'Ngày tạo', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {news.map((row, index) => (
                  <UserTableRow
                    key={index}
                    id={row?.id}
                    rowKey={index + 1}
                    title={row?.title}
                    content={row?.content}
                    createAt={row?.createdAt ? new Date(row.createdAt)
                      .toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                      : ''}
                    imageNews={row?.imageNews}
                    imageSingle={row?.imageNews[0].imageUrl}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          component="div"
          count={total}
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
