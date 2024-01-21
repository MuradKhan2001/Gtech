import "./style.scss";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const {t} = useTranslation();
    const menu = [{
        id: 1, name: t('home'), link: "/"
    }, {
        id: 2, name: t('services'), link: "/"
    },{
        id: 4, name: t('aboutus'), link: "/contact"
    },{
        id: 2, name: t('tariff'), link: "/contact"
    } ];
    const navigate = useNavigate();

    return <>
        <div className="footer-container">

            <div className="section-logo">
                <img src="./images/logoHome3.png" alt=""/>
            </div>

            <div className="section-contact">
                <div className="title-footer">
                    {t("tariff")}
                </div>
                <div className="item-footer">
                    +998 90 135 99 99
                </div>
                <div className="item-footer">
                    +998 97 710 70 10
                </div>

                <div className="title-footer">
                    {t("address")}
                </div>
                <div className="item-footer">
                    {t("address-info")}
                </div>
            </div>

            <div className="section-menu">
                <div className="title-footer">
                    {t("menu")}
                </div>
                {
                    menu.map((item, index)=>{
                        return  <div key={index} onClick={() => {
                            navigate(item.link)
                            setTimeout(()=>{
                                if (item.id === 2) {
                                    window.scrollTo(0, 0)
                                }
                                if (item.id === 3) {
                                    window.scrollTo(0, 0)
                                }
                                if (item.id === 4) {
                                    window.scrollTo(0, 0)
                                }
                                if (item.id === 1) {
                                    window.scrollTo(0, 0)
                                }
                            },200)
                        }} className="item-footer">
                            {item.name}
                        </div>
                    })
                }
            </div>

        </div>
    </>
};

export default Footer;