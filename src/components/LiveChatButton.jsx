import React, { useState } from 'react';
import LiveChatCanvas from './LiveChatPanel';
import { MdClose } from 'react-icons/md';

const LiveChatButton = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            {/* Floating button */}
            <button
                className="btn btn-primary rounded-circle"
                type="button"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    zIndex: 1050,
                }}
                onClick={() => setVisible(true)}
            >
                💬
            </button>

            {/* Chat Panel (mimicking offcanvas) */}
            <div
                className={`chat-panel position-fixed bg-white shadow p-4 ${visible ? 'd-block animated slideInRight' : 'd-none'
                    }`}
                style={{
                    top: '0',
                    right: '0',
                    height: '100vh',
                    width: '400px',
                    zIndex: 1055,
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="mb-2 border-bottom pb-2">
                        <h5 className="mb-0">💬 Live Chat</h5>
                        <small className="text-muted">Ask us anything!</small>
                    </div>

                    <button className="btn" onClick={() => setVisible(false)}>
                        <MdClose size={24} className='text-danger' />

                    </button>
                </div>
                <LiveChatCanvas />
            </div>
        </>
    );
};

export default LiveChatButton;