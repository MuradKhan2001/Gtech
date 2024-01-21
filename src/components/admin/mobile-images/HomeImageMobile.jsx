import "./style.scss"
import {useContext, useEffect, useState, useRef} from "react";
import axios from "axios";
import {MyContext} from "../../App/App";

const HomeImageMobile = () => {
    let value = useContext(MyContext);
    const [photos, setPhotos] = useState(null)
    const [photosList, setPhotosList] = useState([])
    const getInputPhoto = (event) => {
        const {target: {files}} = event;
        const file = files[0];

        function getBase64(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setPhotos(reader.result);
            };
            reader.onerror = function () {
                setPhotos(null);
            };

        }

        getBase64(file);
    };

    const getList = () => {
        axios.get(`${value.url}/api/v1/photo/mobile/`).then((response) => {
            setPhotosList(response.data);
        })
    };

    useEffect(() => {
        getList();
    }, []);


    const addPhoto = () => {
        if (photos) {
            const post = {
                image_type: "mobile",
                image: photos
            };
            axios.post(`${value.url}/api/v1/photo/`, post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                getList();
                document.getElementById("photo").value = ""
            })
        } else alert("Rasmni tanlang")

    }

    const delPhoto = (id) => {
        axios.delete(`${value.url}/api/v1/photo/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            getList();
        })
    }

    return <div className="partners-container">
        <div className="top-side">
            <input id="photo" onChange={getInputPhoto} type="file"/>
            <div onClick={addPhoto} className="button-add">
                Qo'shish
            </div>
        </div>

        <div className="partners">
            {
                photosList.map((item, index) => {
                    return <div key={index} className="partner">
                        <img src={item.image} alt=""/>
                        <div onClick={() => delPhoto(item.id)} className="del-btn">
                            O'chirish
                        </div>
                    </div>
                })
            }

        </div>
    </div>
}

export default HomeImageMobile