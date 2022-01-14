import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ groceryList, deleteItem, editItem }) => {
  return (
    <div>
      {groceryList.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div>
              <FaEdit className="edit-btn" onClick={() => editItem(id)} />
              <FaTrash className="delete-btn" onClick={() => deleteItem(id)} />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
