import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {

const [todos, setTodos] = useState([]); // array of todo item
const [headingInput, setHeadingInput] = useState(''); //value entered by user
const [listInputs , setListInputs] = useState({});  // listInputs as empty object

const handleAddTodo = () => {
  if (headingInput.trim() !== '') {
    setTodos([...todos, {heading: headingInput, lists: [] }]);
    setHeadingInput('');  
  }
};
// function to handle adding a new list item to a specific todo heading
const handleAddList = (index) => {
  // Check if the input for the given index is not empty or just whitespace
  if (listInputs[index] && listInputs[index].trim() !== ''){
    const newTodos = [...todos]; // Create a copy of the current todos array
    newTodos[index].lists.push(listInputs[index]); // add the new list item to the corresponding heading's list 
    setTodos(newTodos); // update the todos state with the new list item
    setListInputs({...listInputs, [index]: ''}); // Clear the input field for that index 
  }
};

//  FUnction to updatre the list input value for a specific heading index
const handleListInputChange = (index, value ) => {
  setListInputs({...listInputs, [index]: value}); // Update the listInputs state for the correspoding index
}; 
const handleDeleteTodo = (index) =>{
  // create a shallow copy of the current todos array
const newTodos = [...todos];
// Remove the todo at the specified index
newTodos.splice(index, 1);
// Update the state with the new array (without the deleted todo )
setTodos(newTodos);
};

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className='input-container'>{/*input field to enter a new heading*/}
          <input
            type='text'
            className='heading-input' // css class for styling  
            placeholder="Enter Heading" // enter heading placeholder
            value={headingInput}
            onChange={(e) => {setHeadingInput(e.target.value);}} // add onchange event handler to update headinginput state 
          />
            {/*button to add the entered heading to the todo list*/}
            <button className='add-list-button' onClick={handleAddTodo}> Add Heading </button>
        </div>
      </div>

      {/*Todo main*/}
      <div className="todo_main">
        {todos.map((todo, index) => ( // iterate over each todo item in the todos array
          <div key={index} className='todo-card'>
            <div className='heading_todo'>
              {/* Display the heading text of the current todo items*/}
              <h3>{todo.heading}</h3> 
               {/*Button to delete the current heading by passing its index */}
              <button className='delete-button-heading' onClick={() => handleDeleteTodo(index)}> Delete Heading</button>   
            </div>

              <div className='add_list'>
                <ul>
                {/* Iterate over each list item inside the current todo*/}
                {todo.lists.map((list, listIndex) => (
                  <li key={listIndex} className='todo_inside_list'>
                    {/*Display the text content of the list item`*/}
                    <p>{list}</p>
                  </li>
                ))}
                </ul>
                {/* Input the field for adding a new item uder a specific heading*/}
                <input
                  type='text'
                  className='list-input'
                  placeholder='Add List'
                  value={listInputs[index] || ''} // use the value from listinputs array based on the current heading index 
                  onChange={(e) => handleListInputChange(index, e.target.value)} 
                /> 
                {/*Button add the list item to the corresponding heading */}
                <button className='add-list-button' onClick={() => handleAddList(index)}>Add List</button>
              </div> 
          </div>
        ))}
      </div> {/*Todo main end*/}
    </>
  );
};

export default TodoList;
