import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';

function ToDo({ task, deleteTask, toggleCompleted, editTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleEditChange = e => {
        setEditText(e.target.value);
    };

    const handleEditKeyDown = e => {
        if(e.key === 'Enter') {
            editTask(task.id, editText);
            setIsEditing(false);
        }
    };

    const handleChange = () => {
        toggleCompleted(task.id);
    }

    const handleDelete = () => {
        deleteTask(task.id);
    };

    return (
        <div className='todo'>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleChange}
                className='custom-checkbox'
            />
            {isEditing ? (
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                  onKeyDown={handleEditKeyDown}
                  autoFocus
                />
            ) : (
                <p className={task.completed ? 'completed' : ''}>{task.text}</p>
            )}
            
            <div className='icons'>

                <MdEdit size='1.3em' onClick={handleEdit} />

                <MdDelete
                    onClick={handleDelete}
                    size='1.3em'
                    className='delete-icon'
                />
            </div>
        </div>
    )
}

export default ToDo
