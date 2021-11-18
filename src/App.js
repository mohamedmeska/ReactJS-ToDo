import React, { useState } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function App(){
  let [tasks_list, set_tasks_list] = useState();

  (function () {
    let stored_tasks = localStorage.getItem('tasks_list');

    if (stored_tasks === null) {
      tasks_list = [];
    } else {
      let stored_tasks_array = JSON.parse(stored_tasks);
      tasks_list = stored_tasks_array;
    }
  })();

  let handleAddTask = (e) => {
    e.preventDefault();

    let task,
        task_name_value = document.getElementById('task_name').value,
        task_details_value = document.getElementById('task_details').value;

    if (task_name_value === '' || task_details_value === '') {
      let MySwal = withReactContent(Swal)

      MySwal.fire({
        title: 'Error!',
        text: 'You Have To Enter The Task Name & Task Details!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      task = {task_name: task_name_value, task_details: task_details_value};
      set_tasks_list([...tasks_list, task]);

      tasks_list.push(task);
      localStorage.setItem('tasks_list', JSON.stringify(tasks_list));

      document.getElementById('task_name').value = '';
      document.getElementById('task_details').value = '';
    }
  }

  let handleDeleteTask = (index) => {
    tasks_list.splice(index, 1);
    set_tasks_list([...tasks_list]);
    localStorage.setItem('tasks_list', JSON.stringify(tasks_list));
  }

  let tasksList = (tasks_list.length > 0) ? (
    tasks_list.map((task, index) => {
      return(
        <tr key={Math.random()*10}>
          <td>{index+1}</td>
          <td>{task.task_name}</td>
          <td>{task.task_details}</td>
          <td><span className='task_action' onClick={() => handleDeleteTask(index)}>x</span></td>
        </tr> 
      );
    })
  ) : (
    <tr className='empty_row'>
      <td colspan='4'><h4>You don't have any tasks to show!</h4></td>
    </tr>
  )

  return (
    <div className='todo_wrapper'>
      <h1 className='todo_title'>
        <span className='todo_title_to'>TO</span>
        <span className='todo_title_do'>DO</span>
        <span className='todo_title_seperator'>...</span>
      </h1>
      <table className='table center todo_body'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasksList}    
        </tbody>
        <tfoot>
          <tr>
            <td colspan='2'>
              <input
                type='text'
                name='task_name'
                id='task_name'
                placeholder='Enter Task Name'
              />
            </td>
            <td>
              <input
                type='text'
                name='task_details'
                id='task_details'
                placeholder='Enter Task Details'
              />
            </td>
            <td>
              <input
                type='submit'
                name='task_submit'
                id='task_submit'
                value='Add Task'
                onClick={handleAddTask}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}