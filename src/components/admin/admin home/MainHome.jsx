import "./adminHome.scss"
import {useContext, useEffect, useState} from "react";
import {MyContext} from "../../App/App";
import axios from "axios";

const MainHome = () => {
    let value = useContext(MyContext);
    const [adminHome, setAdminHome] = useState({})

    useEffect(() => {
        axios.get(`${value.url}/api/v1/home/`).then((response) => {
            setAdminHome(response.data);
        })
    }, []);

    return <div className="admin-home-container">

        <div className="header-side">
            <div className="statistic-card">
                <div className="icon">
                    <img src="./images/admin/customer.png" alt=""/>
                </div>
                <div className="title">Mijozlar soni:</div>
                <div className="count">{adminHome.client}</div>
            </div>
            <div className="statistic-card">
                <div className="icon">
                    <img src="./images/admin/product.png" alt=""/>
                </div>
                <div className="title">Maxsulotlar soni:</div>
                <div className="count">{adminHome.product}</div>
            </div>
            <div className="statistic-card">
                <div className="icon">
                    <img src="./images/admin/handshake.png" alt=""/>
                </div>
                <div className="title">Hamkorlar soni:</div>
                <div className="count">{adminHome.partner}</div>
            </div>
            <div className="statistic-card">
                <div className="icon">
                    <img src="./images/admin/products.png" alt=""/>
                </div>
                <div className="title">Kataloglar soni:</div>
                <div className="count">{adminHome.catalog}</div>
            </div>
        </div>

        <div className="map">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d890.8062315304869!2d69.23076028341168!3d41.324050987067594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE5JzI1LjkiTiA2OcKwMTMnNTMuNyJF!5e0!3m2!1sru!2s!4v1705608717834!5m2!1sru!2s"
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
};


export default MainHome