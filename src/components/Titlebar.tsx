import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

const Titlebar = () => {
    const [isMaximized, setIsMaximized] = useState(false);

    // Function to check if window is maximized
    const checkMaximized = async () => {
        try {
            const maximized = await invoke<boolean>('is_window_maximized');
            setIsMaximized(maximized);
        } catch (error) {
            // Silent error handling
        }
    };

    useEffect(() => {
        // Check initial state
        checkMaximized();

        // Set up event listener for window resize
        window.addEventListener('resize', checkMaximized);

        return () => {
            window.removeEventListener('resize', checkMaximized);
        };
    }, []);

    // Event handlers for window controls using Rust commands
    const handleMinimize = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        invoke('minimize_window')
            .catch(() => { });
    };

    const handleMaximize = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isMaximized) {
            invoke('unmaximize_window')
                .then(() => setIsMaximized(false))
                .catch(() => { });
        } else {
            invoke('maximize_window')
                .then(() => setIsMaximized(true))
                .catch(() => { });
        }
    };

    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        invoke('close_window')
            .catch(() => { });
    };

    return (
        <div className="h-8 bg-[#1a1a1a] flex justify-between items-center select-none text-white fixed top-0 left-0 right-0 z-10 rounded-t-lg">
            <div className="flex items-center flex-grow h-full [-webkit-app-region:drag]">
                <div className="ml-3 text-sm font-medium">Jauri App</div>
            </div>
            <div className="flex h-full [-webkit-app-region:no-drag] relative z-20 ml-auto">
                <button
                    className="flex justify-center items-center w-[46px] h-full border-none bg-transparent outline-none text-white cursor-pointer transition-colors duration-200 z-[2001] [--webkit-app-region:no-drag] p-0 relative select-none touch-manipulation hover:bg-[#0078d7] active:scale-[0.96]"
                    onClick={handleMinimize}
                    type="button"
                    aria-label="Minimize"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <rect width="10" height="1" x="1" y="6" />
                    </svg>
                </button>
                <button
                    className="flex justify-center items-center w-[46px] h-full border-none bg-transparent outline-none text-white cursor-pointer transition-colors duration-200 z-[2001] [--webkit-app-region:no-drag] p-0 relative select-none touch-manipulation hover:bg-[#0078d7] active:scale-[0.96]"
                    onClick={handleMaximize}
                    type="button"
                    aria-label="Maximize"
                >
                    {isMaximized ? (
                        <svg width="12" height="12" viewBox="0 0 12 12">
                            <rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="currentColor" />
                            <rect width="6" height="6" x="1" y="5" fill="currentColor" />
                        </svg>
                    ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12">
                            <rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="currentColor" />
                        </svg>
                    )}
                </button>
                <button
                    className="flex justify-center items-center w-[46px] h-full border-none bg-transparent outline-none text-white cursor-pointer transition-colors duration-200 z-[2001] [-webkit-app-region:no-drag] p-0 relative select-none touch-manipulation rounded-tr-lg hover:bg-[#e81123] active:scale-[0.96]"
                    onClick={handleClose}
                    type="button"
                    aria-label="Close"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12">
                        <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="1" y1="11" x2="11" y2="1" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Titlebar;
