
// import React, { useEffect } from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { message } from 'antd';
// import { signoutUser } from '../store/account/action';

// export default function Logout() {
//     const [open, setOpen] = React.useState(false);
//     const handleClickOpen = () => {
//         setOpen(true);
//       };
    
//       const handleClose = () => {
//         setOpen(false);
//       };
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { isAuthenticated, error } = useSelector((state) => state.accountReducer);

//     // const handleLogout = () => {
//     //     dispatch({ type: 'LOGOUT' });
//     //     navigate('/signin', { replace: true });
//     // }
//     useEffect(() => {
//         dispatch(signoutUser());
//         if (!isAuthenticated) {
//             navigate('/signin', { replace: true });
//             message.success('Sign out successfully');
//         }
//     }, [dispatch, navigate]);

//     return (
//         <>
//             <Dialog
//                 open={open}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">{"Are you sure you want to sign out?"}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         are you sure you want to sign out?
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => handleClose() }>
//                         Cancel
//                     </Button>
//                     <Button onClick={() => navigate('/signin', { replace: true })} color="primary" autoFocus>
//                         Sign out
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//         </>
//     )

// }