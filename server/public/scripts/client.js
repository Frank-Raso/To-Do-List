$(document).ready(onReady);

function onReady() {
  $('#addButton').on('click', addTask);
  getList();

  $('#viewTasks').on('click', '.delButton', delTask); // dynamically created button
  $('#viewTasks').on('click', '.compButton', completeTask);
};

function addTask() {
  let taskToSend = {
    task: $('#taskIn').val(),
    complete:'N',
  };
  console.log('adding:', taskToSend);
  $.ajax({
    method: 'POST',
    url: '/to_do',
    data: taskToSend
  }).then(function (response) {
    console.log('back from POST:', response);
    // display on the DOM
    getList();
    // empty all inputs
    $('input').val('')
  }).catch(function (err) {
    console.log(err);
    alert('err ADD task');
  });

};

function getList() {
  console.log('in getList');
  $.ajax({
    method: 'GET',
    url: '/to_do'
  }).then(function (response) {
    console.log('back from GET:', response);
    let el = $('#viewTasks');
    el.empty();
    for (let i = 0; i < response.length; i++) {
if(response[i].complete == 'N'){

      el.append(`<tr class="incomplete" ><td>${response[i].task}</td>
        <td><button class="delButton" data-id="${response[i].id}">Delete</button></td><td><button class="compButton" data-id="${response[i].id}">Complete Task</button></td> </tr>`);
        }else{
          el.append(`<tr class="completed" ><td>${response[i].task}</td>
          <td><button class="delButton" data-id="${response[i].id}">Delete</button></td>
          <td class="check" >☑️</td>
          </tr>`);
        }
      }
  }).catch(function (err) {
    console.log(err);
    alert('err GET tasks');
  })
}; // end getList


function completeTask() {
  console.log('in completeTask:', $(this).data('id'));
  $.ajax({
    method: 'PUT',
    url: '/to_do?id=' + $(this).data('id')
  }).then(function (response) {
    console.log(response);
    getList();
  }).catch(function (err) {
    console.log(err);
    alert('error completeTask');
  })
} // 


function delTask() {
  console.log('in delTask:', $(this).data('id'));
  // delete AJAX call
  $.ajax({
    method: 'DELETE',
    url: `/to_do?id=${$(this).data('id')}` // ex: /to_do?id=3
  }).then(function (response) {
    console.log(response);
    getList();
  }).catch(function (err) {
    console.log(err);
    alert('error delTask');
  })
} // end delTask