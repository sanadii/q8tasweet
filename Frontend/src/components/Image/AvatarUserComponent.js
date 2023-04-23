import React, { useState, useEffect } from 'react';
import { backend_url } from '../Constant/Config';
const AvatarUserComponent = ({ imagePath }) => {
    const [imageData, setImageData] = useState(null);
    useEffect(() => {
        if (imagePath)
            fetch(backend_url + 'getImage/?imagePath=' + imagePath, { method: 'GET' })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setImageData(data.data);
                })
    }, [imagePath]);
    return (
        <>
            {imageData && <img alt="avatar" className="rounded-circle" src={`data:image;base64, ${imageData}`} />}
        </>
    )
}

export default AvatarUserComponent;