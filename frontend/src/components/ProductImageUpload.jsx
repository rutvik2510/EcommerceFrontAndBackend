import React, { useRef } from 'react';
import { FaFile } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import axios from 'axios';

const ProductImageUpload = ({ image, setimageFile, uploadedImageUrl, setuploadedImageUrl }) => {
    const inputRef = useRef(null);

    const handleImageFileChange =async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setimageFile(selectedFile);
            try {
                const imageUrl = await fetchUploadImageData(selectedFile);
                setuploadedImageUrl(imageUrl);
                
            } catch (error) {
                 console.error('Error uploading image:', error);
            }
        }
    };

    const fetchUploadImageData = async (image) => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error('No token found, user is not authenticated.');
        }
    
        const formData = new FormData();
        formData.append('image', image); // 'image' should match the field name on the backend
    
        try {
            const response = await axios.post('http://localhost:5000/api/file/upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.imageUrl; // Ensure this matches what your backend returns
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };
    
    const handleDragover = (e) => {
        e.preventDefault();
    }

    const handleDrop = async (e) => {
        e.preventDefault();
        const dropFile = e.dataTransfer.files?.[0];
        if (dropFile) {
            setimageFile(dropFile);
            try {
                const imageUrl = await fetchUploadImageData(dropFile);
                setuploadedImageUrl(imageUrl);
            } catch (error) {
                console.error('Error uploading image from drop:', error);
            }
        }
    };
    

    const handleRemoveImage = (e) => {
        setimageFile(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    return (
        <>
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Image</label>

            {!image ? (
                <label
                    htmlFor="productImage"
                    className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border-2 border-dashed border-blue cursor-pointer hover:bg-blue hover:text-black"
                    onDragOver={handleDragover}
                    onDrop={handleDrop}
                >
                    <FaFile className="w-8 h-8" />
                    <span>Upload Photo</span>
                    <input
                        type="file"
                        name="image"
                        className="hidden"
                        id="productImage"
                        ref={inputRef}
                        onChange={handleImageFileChange}
                    />
                </label>
            ) : (
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FaFile className="w-8 text-primary mr-2 h-8" />
                        <p className="text-sm font-medium">{image.name}</p>
                    </div>
                    <button
                        className="text-muted-foreground hover:text-foreground"
                        onClick={handleRemoveImage}
                    >
                        <TiDelete className="w-4 h-4" />
                        <span className="sr-only">Remove</span>
                    </button>
                </div>
            )}
        </>
    );
}

export default ProductImageUpload;
