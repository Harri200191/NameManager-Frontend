import React, { useEffect } from 'react'
import Taskform from './Taskform'
import Task from './Task';
import { useState } from 'react';
import {toast} from 'react-toastify'
import axios from 'axios'
import { URL } from '../App';
import loadingimage from "../assets/loading.gif"
import MLModel from './MLModel';
import Search from './Search';

//http://localhost:5000/api/tasks

const Tasklist = () => 
{
  const [tasks, settasks] = useState([])
  const [completedtasks, setcompletedtasks] = useState([])
  const [isloading, setisloading] = useState(false)
  const [isediting, setisediting] = useState(false)
  const [taskID, settaskID] = useState("")

  const [formData, setformData] = useState({
    name: "",
    completed: false
  })

  const {name} = formData

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setformData({...formData, [name]: value})
  };

  const getTasks = async() => {
    setisloading(true)
    try{
      const {data} = await axios.get(`${URL}/api/tasks?name=`)
      settasks(data)
      setisloading(false)
    }
    catch(error){
      toast.error(error.message)
      setisloading(false)
    }
  };

  useEffect(() => {
    getTasks()
  }, [])

  const createTask = async (e) => {
    e.preventDefault()
    if (name === ""){
      return toast.error("Input can not be empty")
    }
    try{
      await axios.post(`${URL}/api/tasks/`, formData)
      toast.success("Name added succesfully!")
      setformData({...formData, name: ""})
      getTasks()
    }
    catch(error){
      toast.error(error.message)
    }
  }

  const deleteTask = async (id) => {
    try{
      await axios.delete(`${URL}/api/tasks/${id}`)
      toast.success("Name deleted succesfully!")
      getTasks()
    }
    catch(error){
      toast.error(error.message)
    }
  }

  useEffect(() =>{
    const cTask = tasks.filter((task) => {
      return task.completed === true
    })

    setcompletedtasks(cTask)
  }, [tasks])

  const getsingletask= async (task) => {
    setformData({
      name: task.name,
      completed: false
    })

    settaskID(task._id)
    setisediting(true)
  }


  const updateTask = async (e) => {
    e.preventDefault()
    if (name === ""){
      return toast.error("Input can not be empty")
    }

    try{
      await axios.put(`${URL}/api/tasks/${taskID}`, formData)
      setformData({...formData, name: ""})
      setisediting(false)
      toast.success("Name Updated succesfully!")
      getTasks()
    }
    catch(error){
      toast.error(error.message)
    }
  }

  const settocomplete= async (task) => {
    const newFormData = ({
      name: task.name,
      completed: !task.completed
    })

    try{
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
      getTasks()
    }
    catch(error){
      toast.error(error.message)
    }

  }



  const searchfortherecord = async () => {
    try{
      const {data} = await axios.get(`${URL}/api/tasks/`)
      getTasks()
    }
    catch(error){
      toast.error(error.message)
    }
  }


  return (
    
    <div>
        <h2 >Name Selecter App</h2>
        <Taskform name={name} handleInputChange={handleInputChange} createTask={createTask} isediting ={isediting} updateTask= {updateTask} />
        {
          tasks.length>0 && (
            <div className='--flex-between --pb'>
              <p>
                <b>Total Names: </b> {tasks.length}
              </p>
              <p>
                <b>Selected People: </b> {completedtasks.length}
              </p>
            </div>
          )
        }

        <hr />
        {
          isloading && (
            <div className="--flex-center">
              <img src = {loadingimage} alt='Loading...'></img>
            </div>
          )
        }
        {
          !isloading && tasks.length === 0 ? (
            <p className='--py'>No Name added. Please add a Name</p>
          ) : 
          (
            <>
              {tasks.map((task, index) => {
                return (
                  <Task 
                    key={task._id} 
                    task = {task} 
                    index = {index} 
                    deleteTask ={deleteTask} 
                    updateTask= {updateTask} 
                    getsingletask ={getsingletask}
                    settocomplete = {settocomplete}
                  />
                )
              })}
            </>
          )
        }

      <br/>
      <hr/>
      <br/>

      <div className=''>
        <h2>Text Summarization</h2>

        <MLModel/>

      </div>
    </div>
  )
}

export default Tasklist;