import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUser } from '../store/account/action';


export default function EmptyPage() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.accountReducer);

    // useEffect(() => {
    //     const token = localStorage.getItem('accessToken');

    //     // Kiểm tra token và trạng thái xác thực
    //     if (!token || !isAuthenticated) {
    //         dispatch(signoutUser());
    //         window.location.reload(); // Reload lại trang
    //     }
    // }, [dispatch, isAuthenticated]);
    return (
        <>
            <Helmet>
                <title>Quản lý</title>
            </Helmet>
            <Box sx={{ height: 550 }} />;
        </>
    )

}