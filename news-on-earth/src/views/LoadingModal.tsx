import React from 'react';
import Modal from 'react-modal';

interface LoadingModalProps {
loading: boolean;
message: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ loading, message }) => {
  return (
    <Modal
    isOpen={loading}
    ariaHideApp={false}
    style={{
        overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'rgba(0, 0, 0)',
        zIndex: '9999',
        },
        content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        },
    }}
    >
        {loading ? message : ''}
    </Modal>
  );
}; 

export default LoadingModal;