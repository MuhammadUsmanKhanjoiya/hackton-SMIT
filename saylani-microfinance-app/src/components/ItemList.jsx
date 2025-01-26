import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Item List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-between">
              <Link
                to={`/edit/${item._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;







// import type React from "react"
// import { useState, useEffect } from "react"
// import axios from "axios"
// import { Link } from "react-router-dom"

// interface Item {
//   _id: string
//   name: string
//   description: string
// }

// const ItemList: React.FC = () => {
//   const [items, setItems] = useState<Item[]>([])

//   useEffect(() => {
//     fetchItems()
//   }, [])

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/items")
//       setItems(response.data)
//     } catch (error) {
//       console.error("Error fetching items:", error)
//     }
//   }

//   const deleteItem = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/items/${id}`)
//       fetchItems()
//     } catch (error) {
//       console.error("Error deleting item:", error)
//     }
//   }

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-3xl font-bold mb-4">Item List</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {items.map((item) => (
//           <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
//             <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
//             <p className="text-gray-600 mb-4">{item.description}</p>
//             <div className="flex justify-between">
//               <Link to={`/edit/${item._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                 Edit
//               </Link>
//               <button
//                 onClick={() => deleteItem(item._id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ItemList

