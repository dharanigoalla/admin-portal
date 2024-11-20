import React, { useState } from 'react';
import {
    DndContext,
    useDraggable,
    useDroppable,
    closestCenter,
    DragOverlay,
} from '@dnd-kit/core';
import { Paper, Box } from '@mui/material';

const DraggableItem = ({ id }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id,
    });

    return (
        <Paper
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                padding: '16px',
                margin: '8px',
                backgroundColor: isDragging ? '#0056b3' : '#007bff',
                color: 'white',
                cursor: 'grab',
                transition: 'background-color 0.2s ease',
            }}
        >
            {id}
        </Paper>
    );
};

const DroppableArea = ({ items, moveItem }) => {
    return (
        <Box
            style={{
                border: '2px dashed #007bff',
                padding: '16px',
                minHeight: '200px',
            }}
        >
            {items.map((item) => (
                <DroppableItem key={item} id={item} moveItem={moveItem} />
            ))}
        </Box>
    );
};

const DroppableItem = ({ id, moveItem }) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div ref={setNodeRef}>
            <DraggableItem id={id} />
        </div>
    );
};

const App = () => {
    const [items, setItems] = useState([
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
    ]);

    const moveItem = (fromIndex, toIndex) => {
        const updatedItems = [...items];
        // Swap items
        [updatedItems[fromIndex], updatedItems[toIndex]] = [updatedItems[toIndex], updatedItems[fromIndex]];
        setItems(updatedItems);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const fromIndex = items.findIndex(item => item === active.id);
            const toIndex = items.findIndex(item => item === over.id);
            moveItem(fromIndex, toIndex);
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <DroppableArea items={items} moveItem={moveItem} />
            <DragOverlay>
                {/* Optional overlay for the currently dragged item */}
                {/* You can customize this as needed */}
            </DragOverlay>
        </DndContext>
    );
};

export default App;
