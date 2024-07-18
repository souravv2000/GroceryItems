import './LocalTasker.css'
import  React from 'react';
import{ useState } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LocalTasker(){
        const previousItems = JSON.parse(localStorage.getItem('items')) || [];
        const [items, setItems] = useState(previousItems);
        const [newItemsName, setNewItems] = useState('');

        const notifyAdd = () => toast("Item is added!");
        const notifyDelete = () => toast("item is deleted");
        const notifyClear = () => toast("Selected items are cleared");

        function handleAddItems(){
               const newItems = {
                id:new Date().getTime(),
                name:newItemsName,
                completed:false
               }
               const updatedItems = [...items, newItems];
            //    alert('item is added');
               notifyAdd();
               setItems(updatedItems);
               localStorage.setItem('items',JSON.stringify(updatedItems));
               setNewItems('');
        }

        function handleDeleteItem(id){
            const updatedItems = items.filter((item)=>item.id!==id);
            // alert('item is deleted');
            notifyDelete();
            setItems(updatedItems);
            localStorage.setItem('items',JSON.stringify(updatedItems));
        }

        function handleCompleteItem(taskId){
            const updatedItems = items.map((item)=>
                item.id === taskId ? { ...item, completed: !item.completed } : item
            );
            setItems(updatedItems);
            localStorage.setItem('items',JSON.stringify(updatedItems));
        };

        function handleClearItem(){
            const updatedItems = items.filter((item)=> !item.completed);
            notifyClear();
            setItems(updatedItems);
            localStorage.setItem('items',JSON.stringify(updatedItems));
        }

return(
    <>
    <div className='Grocery_Container'>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
        <h1>Grocery Bud</h1>
        <div className='inputItem'>
            <input type="text" 
            value={newItemsName}
            placeholder='Enter Item'
            onChange={(e)=>setNewItems(e.target.value)}/>
            <button onClick={handleAddItems} id="add">Add Item</button>
        </div>
        <div className='items'>
               <ul>
                    {items.map((item)=>(
                     <li id={item.id} >
                        <div className='item'>
                                <input type="checkbox" name={item.name} id={item.id} checked={item.completed} onClick={()=>handleCompleteItem(item.id)}/>
                                <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.name}</span>
                        </div>
                                <button id="delete"onClick={()=>handleDeleteItem(item.id)}>Delete</button>
                     </li>    
                ) ) }
                
               </ul>
               <button id="clear"onClick={handleClearItem}>Clear</button>
        </div>
    </div>
    </>
)
}
export default LocalTasker;