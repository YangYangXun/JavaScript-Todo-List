'use strict'

// const todos = [{
//     text: 'Web develop',
//     completed: false
// }, {
//     text: 'Watch suits on Netflix',
//     completed: true
// }, {
//     text: 'Get some vacation',
//     completed: false
// }, {
//     text: 'Clean room',
//     completed: false
// }, {
//     text: 'Wake up at 7:30',
//     completed: false
// }, {
//     text: 'Watch Movie',
//     completed: true
// }]

var todos = getSavedNotes()

const filters = {
    searchText: '',
    hideCompleted: false
}


// Call function initial 
renderTodos(todos, filters)

// item filter
document.querySelector('#search-input').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

// add item
document.querySelector('#add-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // console.log('knock')
    let todoText = e.target.elements.itemToAdd.value
    e.target.elements.itemToAdd.value = ''
    todos.unshift({
        id: uuidv4(),
        text: todoText,
        completed: false
    })
    savaNotes(todos)

    renderTodos(todos, filters)
    // location.reload()

})

// hide-completed
document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked;
    // renderTodos(todos, filters)


    var finishDIV = document.querySelector('#todo-finish-div')
    var todoDIV = document.querySelector('#todo-notfinish-div')

    if (e.target.checked) {
        finishDIV.style.display = "none";
        todoDIV.className = "col-md-12"
    } else {
        finishDIV.style.display = "block";
        todoDIV.className = "col-md-7"
    }

})

//check item
// document.querySelector('#todo-check').addEventListener('change', function (e) {
//     console.log(e.target.checked)
// })

document.querySelector('#selector').addEventListener('change', function (e) {
    console.log(e.target.value)
})
//delete all todos item
document.querySelector('#clean-storage').addEventListener('click', function (e) {
    localStorage.removeItem('todos')
})
