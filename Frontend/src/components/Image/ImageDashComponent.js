import React, { useState, useEffect } from 'react';
import { backend_url } from '../Constant/Config';
const ImageDashComponent = ({ imagePath }) => {
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
            {imageData && <img alt="Responsive" className="card-img-top w-100" style={{ height: "185px" }} src={`data:image;base64, ${imageData}`} />}
        </>
    )
}

export default ImageDashComponent;