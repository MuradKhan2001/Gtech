import "./style.scss";
import {useContext, useState} from "react";
import axios from "axios";
import {MyContext} from "../App/App";
import {useOnKeyPress} from "./useOnKeyPress";
import {useNavigate} from "react-router-dom";

const LoginAdmin = () => {
    const navigate = useNavigate();
    let value = useContext(MyContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checkUser,setCheckUser]=useState("");

    function getName(e) {
        setUsername(e.target.value);
        setCheckUser("")
    }

    function logIn() {
        if (username.trim().length > 0 && password.trim().length > 0) {
            let user = {
                username,
                password
            };

            axios.post(`${value.url}/api/v1/login/`, user).then((response) => {

                localStorage.setItem("token", response.data.token);
                window.location.pathname = '/';

            }).catch((error) => {
                if (error.response.status === 400) setCheckUser("Login yoki parol xato");
            });
        } else setCheckUser("Ma'lumotlarni kiriting")
    }

    useOnKeyPress(logIn, 'Enter');


    return <div className="login-container">

        <div className="login-card">
            <div className="logo">
                <img onClick={()=>navigate("/")} src="./images/logoTech.png" alt=""/>
            </div>
            <div className="status-text">{checkUser}</div>
            <div className="input_box">
                <input onChange={getName} placeholder="Login" type="text"/>
                <input onChange={e => setPassword(e.target.value)} placeholder="Parol" type="password"/>
            </div>

            <div onClick={logIn} className="btn-login">
                Kirish
            </div>
        </div>
    </div>
};

export default LoginAdmin;