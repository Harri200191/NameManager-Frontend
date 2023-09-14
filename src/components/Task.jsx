import React from 'react'
import {FaCheckDouble, FaEdit, FaRegTrashAlt} from 'react-icons/fa'


const Task = ({task, index, deleteTask, updateTask, getsingletask, settocomplete}) => {

  return (
    <div className= {task.completed ? "task completed" : "task"}>
        <p>
            <b>{index+1}.   </b>
            {task.name}
        </p>

        <div className='task-icons'>
            <FaEdit onClick={() => getsingletask(task)} />
            <FaCheckDouble onClick={() => settocomplete(task)}/>
            <FaRegTrashAlt onClick={() => deleteTask(task._id)}/>
        </div>
        
    </div>
  )

}

export default Task;