import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [item, setItem] = useState("");
  const [groceryList, setGroceryList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const editItem = (id) => {
    const specificItem = groceryList.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setItem(specificItem.title);
  };

  const deleteItem = (id) => {
    showAlert(true, "item removed", "danger"); //show alert
    const newList = groceryList.filter((item) => item.id !== id);
    setGroceryList(newList);
  };

  const clearList = () => {
    showAlert(true, "empty list", "danger"); //show alert
    setGroceryList([]);
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, type, msg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item) {
      // display alert
      showAlert(true, "please enter value", "danger");
    } else if (item && isEditing) {
      setGroceryList(
        groceryList.map((groceryItem) => {
          if (groceryItem.id === editID) {
            return { ...groceryItem, title: item };
          }
          return groceryItem;
        })
      );

      setItem("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "value changed", "success");
    } else {
      showAlert(true, "item added to the list", "success"); //show alert
      const newItem = { id: new Date().getTime().toString(), title: item };
      setGroceryList([...groceryList, newItem]);
      setItem("");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(groceryList));
    return () => {};
  }, [groceryList]);

  return (
    <>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={groceryList} />
          )}
          <h3>Grocery Bud</h3>
          <div className="form-control">
            <input
              type="text"
              placeholder="e.g. eggs"
              className="grocery"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <button className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        {groceryList.length > 0 && (
          <div className="grocery-container">
            <List
              groceryList={groceryList}
              deleteItem={deleteItem}
              editItem={editItem}
            />

            <button className="clear-btn" onClick={clearList}>
              Clear items
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
