import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';


import Scrollbar from 'src/components/scrollbar';
import { useSelector, useDispatch } from 'react-redux';
import { getConsultants, resetConsultantSuccess, addConsultant } from 'src/store/consultant/action';
import { actLevelGetAsync } from 'src/store/level/action';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';






// ----------------------------------------------------------------------

export default function ConsultantAccountView() {

  const dispatch = useDispatch();
  const { consultants, total = 0, successConsultant } = useSelector((state) => state.consultantReducer);
  const { consultantLevels } = useSelector((state) => state.levelReducer);

  let userId = localStorage.getItem('userId');

  const [page, setPage] = useState(0);
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    doB: '',
    description: '',
    consultantLevelId: '',
    universityId: userId,
    certifications: [
      {
        description: "",
        imageUrl: ""
      }
    ]
  });

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getConsultants({ page: 1, pageSize: rowsPerPage, search: filterName, level: filterLevel, universityId: userId }));
    dispatch(actLevelGetAsync({}));
  }, [successConsultant]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getConsultants({ page: newPage + 1, pageSize: rowsPerPage, search: filterName, level: filterLevel, universityId: userId })); // Cập nhật trang và gọi API
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset về trang đầu tiên khi thay đổi số lượng
    dispatch(getConsultants({ page: 1, pageSize: newRowsPerPage, search: filterName, level: filterLevel, universityId: userId })); // Gọi API với `pageSize` mới
  };

  const handleFilterByName = async (event) => {
    const filterValue = event.target.value;
    setFilterName(filterValue);  // Cập nhật tạm thời giá trị tìm kiếm cho input

    if (filterValue.trim()) {
      dispatch(getConsultants({ page: 1, pageSize: rowsPerPage, search: filterValue, level: filterLevel, universityId: userId }));
    } else {
      // Gọi lại API khi không có từ khóa tìm kiếm
      dispatch(getConsultants({ page: 1, pageSize: rowsPerPage, level: filterLevel, universityId: userId }));
    }
  };
  const handleFilterByLevel = async (Selectedlevel) => {
    setFilterLevel(Selectedlevel);  // Cập nhật tạm thời giá trị tìm kiếm cho input
    setFilterLevelName(`Level ${Selectedlevel}`);

    dispatch(getConsultants({ page: 1, pageSize: rowsPerPage, search: filterName, level: Selectedlevel, universityId: userId }));
  };

  const [filterLevel, setFilterLevel] = useState('');
  const [filterLevelName, setFilterLevelName] = useState('Level');

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ mt: 5, mb: 5 }} variant="h4">Tư vấn viên</Typography>
      </Stack>
      <Card>
        <UserTableToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterLevel={filterLevel}
          filterLevelName={filterLevelName}
          consultantLevels={consultantLevels}
          handleFilterByLevel={handleFilterByLevel}
        />

        <Scrollbar>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
                headLabel={[
                  { id: 'name', label: 'Tên' },
                  { id: 'email', label: 'Email', align: 'center' },
                  { id: 'phone', label: 'Số điện thoại', align: 'center' },
                  { id: 'decription', label: 'Mô tả', align: 'center' },
                  { id: 'gender', label: 'Giới tính' },
                  { id: 'consultantLevelId', label: 'Level', align: 'center' },
                  { id: 'dateOfBirth', label: 'Ngày sinh' },
                  { id: 'status', label: 'Trạng thái', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {consultants.map((row, index) => (
                  <UserTableRow
                    key={row?.id}
                    id={row?.id || ''}
                    rowKey={index + 1}
                    name={row.name || ''}
                    email={row?.email || ''}
                    phone={row?.phone || ''}
                    description={row.description || ''}
                    consultantLevelId={row?.consultantLevel?.id || ''}
                    gender={row?.gender || ''}
                    dateOfBirth={row.dateOfBirth ? new Date(row.dateOfBirth).toISOString().split('T')[0] : ''}
                    status={row?.accountStatus || ''}
                    accountId={row?.accountId || ''}
                    walletBalance={row?.walletBalance || 0}
                    consultantLevelPrice={row?.consultantLevel?.priceOnSlot || 0}
                    image_Url={row?.account?.image_Url}
                    consultantLevelDes={row?.consultantLevel?.description || ''}
                    certifications={row?.certifications}
                    consultantRelations={row?.consultantRelations}
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
  )
  // );
}  