import "./style.scss"
import {useContext, useEffect, useState} from "react";
import {MyContext} from "../../App/App";
import axios from "axios";
import {fireEvent} from "@testing-library/react";

const Clients = () => {
    let value = useContext(MyContext);
    const [clients, setClients] = useState([])

    useEffect(() => {
        axios.get(`${value.url}/api/v1/client/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setClients(response.data);
        })
    }, []);

    const delUser = (id) => {
        axios.delete(`${value.url}/api/v1/client/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            axios.get(`${value.url}/api/v1/client/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                setClients(response.data);
            })
        })
    }

    return <div className="drivers-container">
        <div className="header-side">
            Mijozlar ro'yxati
        </div>
        <div className="table-content">
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Ism familiya</th>
                    <th>Telefon Raqam</th>
                    <th>Maxsulot</th>
                    <th>Ma'lumot</th>
                    <th>O'chirish</th>
                </tr>
                </thead>

                <tbody>
                {clients.map((item, index) => {
                    return <tr>
                        <td>{index + 1}</td>
                        <td>{item.first_name}</td>
                        <td>{item.phone}</td>
                        <td>{item.product ? item.product.translations.uz.name : ""}</td>
                        <td>
                            {item.description}
                        </td>
                        <td>
                            <div className="box">
                                <img onClick={() => delUser(item.id)} src="./images/bin.png" alt=""/>
                            </div>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </div>
}

export default Clients