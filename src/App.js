import ProjectsSideBar from './components/ProjectsSideBar.jsx'
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import { useState } from 'react';
import SelectedProject from './components/SelectedProjected.jsx';
function App() {
  const [projectState,setProjectState] = useState({
    selectedProjectID:undefined,
    projects:[],
    tasks:[],
  });

  function handleAddTask(text){ //we get this text from the newTasks through prop drilling
    setProjectState(prevState=>{
      const taskId = Math.random();
      const newTask = {
        text:text,
        projectId:prevState.selectedProjectID,
        id:taskId,
      };
      return {
        ...prevState,
        tasks:[newTask,...prevState.tasks]
      }
    })
  }
  function handleDeleteTask(id){
    setProjectState(prevState=>{
      return {
        ...prevState,
        tasks:prevState.tasks.filter((task)=>task.id !==id)
      }
    })
  }




  function handleSelectProject(id){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectID:id,
      }
    })
  }
  function handleStartAddProject(){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectID:null,
      }
    })
  }

  function handleCancelAddProject(){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectID:undefined,
      }
    })
  }

  function handleAddProject(projectData){
    setProjectState(prevState=>{
      const newProject = {
        ...projectData,
        id:Math.random()
      }
      return {
        ...prevState,
        selectedProjectID:undefined,
        projects:[...prevState.projects,newProject]
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectID:undefined,
        projects:prevState.projects.filter((project)=>project.id !==prevState.selectedProjectID)
      }
    })
  
  }

  const selectedProject = projectState.projects.find(project=> project.id ===projectState.selectedProjectID)

  let content=<SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks}/>;
  if(projectState.selectedProjectID===null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectState.selectedProjectID===undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className='h-screen my-8 flex gap-8'> 
      <ProjectsSideBar onStartAddProject={handleStartAddProject}
      projects={projectState.projects}
      onSelectProject={handleSelectProject} selectedProjectId={projectState.selectedProjectID}/>
      {content}
    </main>
  );
}

export default App;
