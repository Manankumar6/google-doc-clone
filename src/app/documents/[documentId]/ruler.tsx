import React, { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const Ruler = () => {
    const [leftMargin, setLeftMargin] = useState(56);
    const [rightMargin, setRightMargin] = useState(56);

    const [isDraggingLeft, setIsDraggingLeft] = useState(false);
    const [isDraggingRight, setIsDraggingRight] = useState(false);

    const rulerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
   
        if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
            const container = rulerRef.current.querySelector('#ruler-container');
            if (container) {
                const containerRect = container.getBoundingClientRect();
                const relativeX = e.clientX - containerRect.left;
                const rawPosition = Math.max(0, Math.min(816, relativeX));

                if (isDraggingLeft) {
                    const maxLeftPosition = 816 - rightMargin - 100; // Ensure minimum gap
                    const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
                    setLeftMargin(newLeftPosition);
                } else if (isDraggingRight) {
                    const maxRightPosition = 816 - leftMargin - 100; // Ensure minimum gap
                    const newRightPosition = Math.min(816 - rawPosition, maxRightPosition);
                    setRightMargin(newRightPosition);
                }
            }
        }
    };

    const handleMouseUp = () => {
        setIsDraggingLeft(false);
        setIsDraggingRight(false);
    };

    const handleLeftMouseDown = () => setIsDraggingLeft(true);
    const handleRightMouseDown = () => setIsDraggingRight(true);

    const handleLeftDoubleClick = () => setLeftMargin(56);
    const handleRightDoubleClick = () => setRightMargin(56);

    const markings = [];
    for (let i = 0; i <= 102; i++) {
        markings.push(
            <div
                key={i}
                className={`absolute border-l bottom-0 ${
                    i % 10 === 0
                        ? 'h-2.5 border-neutral-700'
                        : i % 5 === 0
                        ? 'h-2 border-neutral-500'
                        : 'h-1.5 w-[1px] border-gray-500'
                }`}
                style={{ left: `${i * 8}px` }}
            >
                {i % 10 === 0 && (
                    <span className="text-[10px] text-neutral-700 bottom-2 transform -translate-x-1/2 absolute">
                        {i / 10 + 1}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div
        ref={rulerRef}
            className="h-6 w-[816px] mx-auto border-b border-gray-300 flex items-end relative select-none print:hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
              
                id="ruler-container"
                className=" w-full h-full relative"
            >
                <Marker
                    isLeft={true}
                    position={leftMargin}
                    isDragging={isDraggingLeft}
                    onMouseDown={handleLeftMouseDown}
                    onDoubleClick={handleLeftDoubleClick}
                />
                <Marker
                    isLeft={false}
                    position={rightMargin}
                    isDragging={isDraggingRight}
                    onMouseDown={handleRightMouseDown}
                    onDoubleClick={handleRightDoubleClick}
                />
                {markings}
            </div>
        </div>
    );
};

export default Ruler;

interface MarkerProps {
    position: number;
    isLeft: boolean;
    isDragging: boolean;
    onMouseDown: () => void;
    onDoubleClick: () => void;
}

const Marker = ({
    position,
    isLeft,
    isDragging,
    onMouseDown,
    onDoubleClick,
}: MarkerProps) => {
    return (
        <div
        className="absolute top-0 w-4 cursor-ew-resize z-[5] group -ml-2"
        style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
    >
        {/* Marker Icon */}
        <FaCaretDown className="relative left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
        
        {/* Dragging Line */}
        <div
            className="absolute left-1/2 top-0 transform -translate-x-1/2 duration-150"
            style={{
                height: '100vh', // Extend the height to full view
                width: '1px', // Thin line
                backgroundColor: '#3b72f6', // Line color
                transform: isDragging ? 'scale(1)' : 'scale(0)', // Smooth scaling effect
                transition: 'transform 0.15s ease-in-out', // Smooth transition
            }}
        />
    </div>
    );
};
