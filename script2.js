displayBooks();
class book {
  constructor(name, author, type, start, end) {
    this.name = name;
    this.author = author;
    this.type = type;
    this.start = start;
    this.end = end;
  }
}
class Display {
  // FOR DISPLAY RECORD IN TABLE
  add(myBooks) {                
    let tableBody = document.getElementById("tableBody");
    var getTable = localStorage.getItem("MyBooks")
    if(getTable == null){
      var table = [];
    }
    else{
      var table = JSON.parse(getTable);
    }
    table.push(myBooks)
    localStorage.setItem('MyBooks',JSON.stringify(table)) // Set in localstorage
    displayBooks();

  }
   
  // FOR CLEARING VALUES OF FORM AFTER ADDING IN TABLE
  clear() {
    let cForm = document.getElementById("addBookForm");
    cForm.reset();
  }
  // FOR VALIDATION OF FORM
  validate(myBooks) {
    if (myBooks.name.length < 1 || myBooks.author.length < 2) {
      return false;
    }
    else {
      return true;
    }
  }

  show(type,displayMessage) {
          let message=document.getElementById("message");
          if(type=='Success')
        {  
          message.innerHTML=`
          <div class="alert alert-success" role="alert">
          <strong>${type}: </strong>${displayMessage}
        </div> `
      }
      if(type=='Danger')
      {  
        message.innerHTML=`
        <div class="alert alert-danger" role="alert">
        <strong>${type}: </strong>${displayMessage} 
        </div> `
    }
setTimeout(function(){
message.innerHTML=""
},2000);
  
  }
}
// DISPLAY ALL BOOKS FROM LOCALSTORAGE
function displayBooks(){
  var getTable = localStorage.getItem("MyBooks")
  if(getTable == null){
    var table = [];
  }
  else{
    var table = JSON.parse(getTable);
  }
let bookRecord = ""
table.forEach(mbks)  
function mbks(myBooks){
 bookRecord += `
                  <tr>
                     <td>${myBooks.name}</td>
                     <td>${myBooks.author}</td>
                     <td>${myBooks.type}</td>
                     <td>${myBooks.start}</td>
                     <td>${myBooks.end}</td>
                  </tr>
              `
  }
if (table.length != 0) {
  tableBody.innerHTML = bookRecord;
  }
else {
   tableBody.innerHTML = `
    <div id="noBooks">"No Books Found, Please Add Some Books."</div>
    `
  }
}

let addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', addForm);

function addForm(e) {
  let name = document.getElementById("inputName").value;
  let author = document.getElementById("inputAuthor").value;
  let type;
  if (Programming.checked) {
    type = document.getElementById("Programming").value;
  }
  else if (Fiction.checked) {
    type = document.getElementById("Fiction").value;
  }
  else if (Biography.checked) {
    type = document.getElementById("Biography").value;
  }
  let start = document.getElementById("inputStart").value;
  let end = document.getElementById("inputEnd").value;

  var myBooks = new book(name, author, type, start, end);
  // console.log(myBooks);

  let display = new Display();    
  if (display.validate(myBooks)) {
    display.add(myBooks);
    display.clear();
    display.show("Success", "Your Record has been sucessfully submitted.");
  }
  else {
    display.show("Danger", "Sorry,Your Record can not submited.\n<ul><li>Name of Book should occur atleast one character.</li><li>Name of Author should occur atleast two characters.</li></ul>");
  }
  e.preventDefault();
}
