import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('media', file);

        try {
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { Authorization: localStorage.getItem('token') },
            });
            console.log('File uploaded:', data.filePath);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Upload Media</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
