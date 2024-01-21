import "./style.scss"
import {useContext, useState} from "react";
import axios from "axios";
import {MyContext} from "../../App/App";

const ChangePassword = () => {
    let value = useContext(MyContext);
    const [oldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [ConfirmNewPassword, setConfirmNewPassword] = useState("");

    function changePassword() {
        if (oldPassword.trim().length > 0 && NewPassword.trim().length > 0 && ConfirmNewPassword.trim().length > 0) {
            if (NewPassword === ConfirmNewPassword) {
                let password = {
                    old_password: oldPassword,
                    new_password: NewPassword
                };

                axios.post(`${value.url}/api/v1/reset-password/`, password, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                }).then((response) => {
                    alert("Parol muvaffaqiyatli o'zgartirildi");
                    localStorage.removeItem('token');
                    window.location.pathname = '/login-admin-gtech'

                }).catch((error) => {
                    if (error.response.statusText == "Unauthorized") {
                        localStorage.removeItem('token');
                        window.location.pathname = '/'
                    }
                    if (error.response.status === 400) alert("Eski parol notog'ri kiritildi");
                });
            } else alert("Parollar mos kelmadi")
        } else alert("Malumotni to'liq kiriting")
    }

    return <div className="change-password">
        <div className="password-card">
            <div className="title">Parol almashtirish</div>
            <input onChange={(e) => {
                setOldPassword(e.target.value);
            }} placeholder="Eski parol" type="text"/>
            <input onChange={(e) => {
                setNewPassword(e.target.value)
            }
            } placeholder="Yangi parol" type="text"/>
            <input onChange={(e) => {
                setConfirmNewPassword(e.target.value)
            }} placeholder="Yangi parolni takrorlang" type="text"/>

            <div onClick={changePassword} className="button-change">
                Parolni almashtirish
            </div>
        </div>

    </div>
}

export default ChangePassword