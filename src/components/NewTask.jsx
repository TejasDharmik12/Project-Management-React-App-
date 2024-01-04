import { useState } from "react"


export default function NewTask({onAdd}){
    const [entertedTask,setEnteredTask] = useState('');

    function handleChange(event){
        setEnteredTask(event.target.value);
    }

    function handleClick(){
        if(entertedTask.trim()===''){
            return;
        }
        onAdd(entertedTask);
        setEnteredTask('');
    }
    return (
        <div className="flex item-center gap-4">
            <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} value={entertedTask}/>
            <button className="text-stone-700 hover:text-stone-900" onClick={handleClick}>Add Task</button>
        </div>
    )
}