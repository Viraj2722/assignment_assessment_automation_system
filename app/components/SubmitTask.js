import React, { useState } from 'react';
import { useUploadSubmissionMutation } from '../services/mutations';

const SubmitTask = ({ taskId, studentId, onSubmitSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const uploadMutation = useUploadSubmissionMutation();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!selectedFile) return;

        try {
            await uploadMutation.mutateAsync({
                file: selectedFile,
                taskId: taskId,
                studentId: studentId
            });
            
            // Call the success callback with the taskId
            if (onSubmitSuccess) {
                onSubmitSuccess(taskId);
            }
            
            // Reset the file input
            setSelectedFile(null);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
            />
            <button
                onClick={handleSubmit}
                disabled={!selectedFile || uploadMutation.isPending}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {uploadMutation.isPending ? 'Uploading...' : 'Submit'}
            </button>
        </div>
    );
};

export default SubmitTask;