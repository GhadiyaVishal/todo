import React, { useEffect, useLayoutEffect, useState } from 'react'
import Task from './Task';


const initialValue = localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
const Home = () => {
  const [tasks,setTasks] = useState(initialValue);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");


  useEffect (() =>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks]);

  const submitHandler = (e) =>{
    e.preventDefault();
    setTasks([...tasks,{
      title:title,
      description:description,
    }])
    // localStorage.setItem("tasks",JSON.stringify(tasks))
    setTitle("");
    setDescription("");
  }

  const deleteTask = (index) => {
      const fillteredArray = tasks.filter((val,i) => {
        return i!==index;
      }
      )
      setTasks(fillteredArray)
  }
  
  // console.log(title,description);
  return (
    <div className='container'>
      <h1>TODO LIST</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <textarea  placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>

        <button type='submit'>SUBMIT</button>
      </form>

      {tasks.map((item,index) => (
        <Task 
        key={index} title={item.title} 
        description={item.description}
        deleteTask = {deleteTask}
        index = {index}/>
      ))}
    </div>
  )
}

export default Home;
