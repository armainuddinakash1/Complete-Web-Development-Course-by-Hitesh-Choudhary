/*
listen for document loaded event
when document is loaded
store input element inside a variable
store add button inside a variable
store ul element inside a variable
create a tasks array
if local storage has a tasks string tasks array will store it as it's value
or tasks array's value will be an empty array
create an add task function
add task function will run on the button click event
and the input Enter keydown event
add task will take the trimed value from the input field 
it will create a new task object
the object will contain text, id and completed
it will push the new task to the tasks array
it will update the tasks array in the local storage using the updateTasks function
create an update task function
its purpuse is to update the tasks array in the local storage with the updated tasks array's value
it will stringify the tasks array
then it will push it to the local storage
create a render function
is purpouse is to render the tasks in the dom
the render function will create an li
the li will have the id and text of the current tasks
inside the li there will be a span tag
the text will be inside the span tag
outside of span there will be a delete button to delete the task
run a for each loop on tasks and render each task using the render function
listen for click on li
if the click is on the button then ignore
else toggle completed class on li
and make task.completed true
run update tasks function
listen for click on delete button
then use filter to filterout the deleted task from the tasks array
run updatetask
*/