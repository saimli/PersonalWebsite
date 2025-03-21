import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    open: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ open, children, onClose } : ModalProps) {
    if (!open) return null

    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) {
        console.error("Modal root element not found");
        return null;
    }

     // Function to handle clicks on the overlay
     const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Check if the click is on the overlay (not inside the modal)
        if (event.target === event.currentTarget) {
            onClose();  // Close the modal
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={handleOverlayClick}>
            {children}
        </div>,
        modalRoot
    );
}