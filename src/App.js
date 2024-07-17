import './App.css';
import { useState } from 'react';
import deleteIcon from './deleteicon.svg';
import editIcon from './editicon.svg';

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState(""); // New state for the current task text being edited

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleTask = () => {
    if (input.trim() !== '') {
      const date = new Date();
      const task = {
        text: input,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        })
      };
      setList([...list, task]);
      setInput('');
    }
  };

  const handleUpdate = (index) => {
    const date = new Date();
    const task = {
      text: editingText,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      })
    };
    const updatedList = [...list];
    updatedList[index] = task;
    setList(updatedList);
    setEditingIndex(null);
    setEditingText(""); // Reset the editing text
  };

  const handleDelete = (index) => {
    const filterList = list.filter((_, i) => i !== index);
    setList(filterList);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(list[index].text); // Set the current text of the task being edited
  };
  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      handleUpdate(index);
    }
  };
 
  return ( 
    <div className="App">
      <h2>Todo List</h2>
      <div className="container">
        <div className="input-box">
          <input type="text" value={input} onChange={handleInput} placeholder='Enter Task' />
          <button onClick={handleTask}>Add Task</button>
        </div>
        <div className="list">
          <ul>
            {list.map((item, i) => (
              <li key={i} className="task-item">
                {editingIndex === i ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)} onBlur={() => handleUpdate(i)} 
                    onKeyDown={(e) => handleKeyDown(e, i)} />) : (
                  <div onClick={() => handleEdit(i)}>{item.text}</div> )}
                <div>{item.date}</div>
                <div>{item.time}</div>
                <div className="icons">
                  {/* {editingIndex === i ? (<button onClick={() => handleUpdate(i)}>Update</button>) : (
                  <img src={editIcon} onClick={() => handleEdit(i)} alt="edit" className='edit-icon' />
                  )} */}
                  <img src={deleteIcon} onClick={() => handleDelete(i)} alt="delete" className='dlt-icon' />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default App;
