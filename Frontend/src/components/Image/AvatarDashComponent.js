/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { backend_url } from '../Constant/Config';
const AvatarDashComponent = ({ imagePath }) => {
    const [imageData, setImageData] = useState(null);
    useEffect(() => {
        fetch(backend_url + 'getImage/?imagePath=' + imagePath, { method: 'GET' })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setImageData(data.data);
            })
    }, [imagePath]);
    // eslint-disable-next-line jsx-a11y/alt-text
    return (
        <>
            {imageData && <img className="avatar br-5 avatar-lg me-3 my-auto" alt="avatar-img" style={{ height: "200px" }} src={`data:image;base64, ${imageData}`} />}
        </>
    )
}

export default AvatarDashComponent;