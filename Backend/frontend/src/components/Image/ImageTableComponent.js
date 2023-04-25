/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { backend_url } from '../Constant/Config';
const ImageTableComponent = ({ imagePath }) => {
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
    return (
        <div>
            {imageData && <img src={`data:image;base64, ${imageData}`} alt="Image" />}
        </div>)
}

export default ImageTableComponent;