import React, { useEffect } from "react";
/*import {FaGithub} from 'react-icons/fa'*/
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import Alert from "./Alert";
import { useGlobalContext } from "./context";
import Colors from "./Colors";

const App = () => {
  const {
    inputRef,
    tasks,
    setTasks,
    alert,
    showAlert,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    name,
    setName,
    filter,
    setFilter,
    isColorsOpen,
    setIsColorsOpen,
  } = useGlobalContext();

  const addTask = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Dajte ime zadatku!"); //poruka ukoliko se ne zada ime zadatka
    } else if (name && isEditing) {
      setTasks(
        tasks.map((task) => {
          return task.id === editId ? { ...task, name: name } : task;
        })
      );
      setIsEditing(false);
      setEditId(null);
      setName("");
      showAlert(true, "Zadatak izmenjen!");
    } else {
      const newTask = {
        id: uuid().slice(0, 8),
        name: name,
        completed: false,
        color: "#fffff",//default boja novog zadatka
      };
      setTasks([...tasks, newTask]);
      showAlert(true, "Dodat novi zadatak."); //poruka nakon dodavanja
      setName("");
    }
  };

  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]);
  };

  const deleteAll = () => {
    setTasks([]);
    showAlert(true, "Vaša lista je prazna!");
  };

  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [inputRef, tasks]);

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      const reOrdered = [...tasks];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);
      setTasks(reOrdered);
    }
  };

  const hideColorsContainer = (e) => {
    if (e.target.classList.contains("btn-colors")) return;
    setIsColorsOpen(false);
  };

  return (
  <>
    <div className='container' onClick={hideColorsContainer}> {isColorsOpen && <Colors />} {alert && <Alert msg={alert.msg} />}
      <form className='head' onSubmit={addTask}>
        <input type='text'  ref={inputRef} placeholder='Novi zadatak...' value={name}  onChange={(e) => setName(e.target.value)} />
        <button type='submit' className="dugme1">{isEditing ? "Izmeni" : "Dodaj"}</button>
      </form>
      <div className='filter'>
        <button data-filter='all' className={filter === "all" ? "active" : ""} onClick={filterTasks}>SVI</button>
        <button data-filter='completed' className={filter === "completed" ? "active" : ""} onClick={filterTasks}>ZAVRŠENI</button>
        <button data-filter='uncompleted' className={filter === "uncompleted" ? "active" : ""} onClick={filterTasks}>NEZAVRŠENI</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {tasks.length > 0 ? (
          <List />
        ) : (
          <p className='no-tasks'>Vaša lista je prazna!</p>
        )}
      </DragDropContext>
      {tasks.length > 2 && (
        <button className='btn-delete-all' onClick={deleteAll}>Obriši sve!</button>
      )}
	  
    </div>
	</>
  );
};

export default App;
