import React, { useState } from 'react';
import axios from 'axios';
import axiosIntance from '../../api/axiosInstance';

const UploadProfilePicture = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', file);

        try {
            const response = await axiosIntance.post('/user/upload-profile-picture/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log('Profile picture updated:', response.data.profile_picture);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Profile Picture</button>
        </div>
    );
};

export default UploadProfilePicture;


// import React, { useState } from 'react';
// import axios from 'axios';
// import axiosIntance from '../../api/axiosInstance';

// const ProfileUpload = () => {
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) return;
    
//         const reader = new FileReader();
//         reader.onloadend = async () => {
//             const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
//             console.log('Base64 String:', base64String); // In ra chuỗi Base64 để kiểm tra
//             try {
//                 const response = await axiosIntance.post('/user/upload-profile-picture/', { profile_picture: base64String });
//                 console.log('Upload successful:', response.data);
//             } catch (error) {
//                 console.error('Error uploading image:', error);
//             }
//         };
//         reader.readAsDataURL(selectedFile);
//     };
    

//     return (
//         <div>
//             <h1>Upload Profile Picture</h1>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload</button>
//         </div>
//     );
// };

// export default ProfileUpload;
