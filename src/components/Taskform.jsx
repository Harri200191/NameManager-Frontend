import React from 'react'
import Search from './Search';

const Taskform = ({createTask, name, handleInputChange, isediting, updateTask}) => {

  return (
    <form className='task-form' onSubmit={isediting ?updateTask :createTask}>

        <input type='Text' placeholder='Add a name...' name="name" value ={name} onChange={handleInputChange}/>
        <button type='submit'>
            {isediting ? "Edit" : "Select"}
        </button>
        
    </form>
  )

}

export default Taskform;