import React, { useState, useEffect } from 'react';
import "./style.css";

//fetching local storage data
const getLocalData = () => {
    const list = localStorage.getItem("todolist");
    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  //function to add items
  const addItems = () => {
      if (!inputData) {
          alert('Please add an item');
      } else if (inputData && toggleButton) {
          setItems(
              items.map((curElem) => {
                  if (curElem.id === isEditItem) {
                      return{...curElem, name: inputData};
                  }
                  return curElem;
              })
          );
          setInputData([]);
          setIsEditItem(null);
          setToggleButton(false);
      } 
      else {
          const newInputData = {
              id: new Date().getTime().toString(),
              name: inputData
          }
          setItems([...items, newInputData]);
          setInputData("");
      }
  };
  //function to edit items
  const editItems = (index) => {
    const editedItems = items.find((curElem) => {
        return curElem.id === index;
    });
    setInputData(editedItems.name);
    setIsEditItem(index);
    setToggleButton(true);
  };
  //function to delete items
  const delItems = (index) => {
      const updatedItems = items.filter((curElem) => {
          return curElem.id !== index;
      });
      setItems(updatedItems);      
  };
  //function to remove all the items
  const removeAll = () => {
      setItems([]);
  };
  //adding local storage functionality
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
  }, [items]);
  
  return (
      <>
          <div className="main-div">
              <div className="child-div">
                  <figure>
                      <img src="./images/todo.svg" alt="todologo"/>
                      <figcaption> Add Your List Here </figcaption>
                  </figure>
                  <div className="addItems">
                      <input type="text" placeholder="✍️ Add Items" className="form-control" value = {inputData} onChange={(event) => setInputData(event.target.value)}/>
                      {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItems}></i>) : (<i className="fa fa-plus add-btn" onClick={addItems}></i>)}
                  </div>
                  {/* Show Items */}
                  <div className="showItems">
                      {items.map((curElem) => {
                          return (
                            <div className = "eachItem" key={curElem.id}>
                                <h3> {curElem.name} </h3>
                                <div className = "todo-btn">
                                    <i className = "far fa-edit add-btn" onClick = {() => editItems(curElem.id)}></i>
                                    <i className = "far fa-trash-alt add-btn" onClick={() => delItems(curElem.id)}></i>
                                </div>
                            </div>
                          )
                      })}
                      
                  </div>

                  <div className="showItems">
                      <button className = "btn effect04" data-sm-link-text="Remove All" onClick={removeAll}> 
                        <span> Check List </span>  
                      </button>
                  </div>
              </div>
          </div>
      </>
  );
};

export default Todo;
