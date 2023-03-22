// Info date
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');
//Funcion para setear la fecha
const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const addNewTask = event => {
    event.preventDefault();//para que el form no haga un submit y nos quiera llevar a otra pagina, con esto lo evitamos
    const { value } = event.target.taskText;//aca obtenemos el valor del input
    if(!value) return;//si el usuario no ingreso nada y quiere agregar una, no haga nada la funcion asi evitamos que se agreguen tareas vacias
    const task = document.createElement('div');//elemento nuevo que lo guardamos en la variable task
    task.classList.add('task', 'roundBorder');//le agregamos dos clases, task y roundBorder
    task.addEventListener('click', changeTaskState)//eventlistener, cuando hagamos click llamemos a changTaskState
    task.textContent = value;//texto que ingreso el usuario 
    tasksContainer.prepend(task);//prepend para agregarlo al principio de la lista, asi cada elemento se agrega arriba del todo
    event.target.reset();//por ultimo reseteamos para q nos quede vacio el input para una nueva tarea
};

const changeTaskState = event => { //cuando se hace click en una tarea rebibimos une evento
    event.target.classList.toggle('done');// a ese elemento, vamos a acceder a la lista de clases de ese elemento, y con toggle, si no tiene la clase done se la agregamos y si la tiene se la sacamos
};

const order = () => {  //para ordenar las tareas
    const done = [];   //tareas echas
    const toDo = [];   //tareas por hacer
    tasksContainer.childNodes.forEach( el => {  //vamos a ir al elemento taskContainer y vamos acceder a los cada uno de los hijos del mismo, osea a cada una de las tareas
        el.classList.contains('done') ? done.push(el) : toDo.push(el)  //forEach va a iterar todos esos elementos
    })//si en el elemento esta 'done', entonces vamos al array de done a agregar el elemento con el push , si no tiene  la clase 'done', vamos a ir al array toDo y vamos a agregar el elemento tmb con push (agrega el elemento al final del array)
    return [...toDo, ...done]; //la funcion va a devolver un array, primero vamos al toDo para las tareas q hay q hacer queden primero y las que ya estan echas vayan dsp
}

const renderOrderedTasks = () => {  //la llama el boton ordenar
    order().forEach(el => tasksContainer.appendChild(el)) //iteramos el array y lo vamos a agregar al taskContainer
}

setDate();