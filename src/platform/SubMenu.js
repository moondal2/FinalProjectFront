import { Link, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import "./SubMenu.css";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useEffect, useState } from "react";
import MobileMainMenu from "./MobileMainMenu";
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from "sweetalert2";
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import axios from "axios";


const SubMenu = (props) => {

    let userId = null;
    let jwtToken = null;
    if (sessionStorage.getItem('token') != null) {
        jwtToken = sessionStorage.getItem('token');
        userId = jwt_decode(jwtToken).sub;
    }

    const header = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    };

    const [ userNickname, setUserNickname ] = useState('');

    const navigate = useNavigate();

    const [state, setState] = useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    //
    useEffect(()=>{

        const params = {
            userId: userId
        }

        axios.get(`http://${process.env.REACT_APP_JKS_IP}:8080/api/submenu/nickname`, { params: params, headers: header })
            .then((response) => {
                console.log(response);
                setUserNickname(response.data);
            })
            .catch((error) => {
                console.log(error);
                setUserNickname(null);
            })
    },[userNickname])
    


    //[로그아웃 핸들러]
    const handlerLogout = () => {
        Swal.fire({
            title: "로그아웃",
            text: "로그아웃 하시겠습니까?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'confirm',
            cancelButtonText: 'cancel'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.clear();
                    navigate("/");
                }
            })
    }

    const handlerMobileMypage = () => {
        navigate("/mobilemypage");
    }

    const handlerMypage = () => {
        navigate("/mypage");
    }

    const handlerLoginpage = () => {
        navigate("/login");
    }


    return (
        <>
            <div className="submenu-box">
                <div className="mobile-submenu">
                    <MenuIcon onClick={toggleDrawer('left', true)} />
                    <Drawer
                        anchor='left'
                        open={state.left}
                        onClose={toggleDrawer('left', false)}
                    >
                        <MobileMainMenu />
                    </Drawer>
                </div>
                <Link to="/">
                    <img id="submenu-logo" src={process.env.PUBLIC_URL+'/KADA.png'} />
                </Link>
                <div className="mobile-submenu">

                    {userNickname == null ?
                        <AccountCircleRoundedIcon onClick={handlerLoginpage} />
                        :
                        <AccountCircleRoundedIcon onClick={handlerMobileMypage} />
                    }
                </div>
                <span id="blank-submenu"></span>
                <ul id="submenu-ul">
                    <Link to="/noticeList" ><li className="submenu-li">NOTICE</li></Link>
                    <Link to="/qnalist"><li className="submenu-li">HELP</li></Link>
                    {
                        userNickname == null ?
                            <>
                                <Link to="/regist">
                                    <li className="submenu-li">REGIST</li>
                                </Link>
                                <Link to="/login">
                                    <li className="submenu-li">LOGIN</li>
                                </Link>
                            </>
                            :
                            <>
                                <p onClick={handlerMypage}><AccountBoxRoundedIcon/>{userNickname}</p>
                                <LogoutIcon id="logout-icon" onClick={handlerLogout} />
                            </>
                    }
                </ul>
            </div>
        </>
    )
}

export default SubMenu;
