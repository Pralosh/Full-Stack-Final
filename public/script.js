'use strict'

const $ = document.querySelector.bind(document);
let container = document.getElementById('container');

$('#register-link').addEventListener('click', openRegisterPanel);
$('#login-link').addEventListener('click', openLoginPanel);
$('#login-btn').addEventListener('click', openHomePanel);
$('#logout-btn').addEventListener('click', openLoginPanel);
$('#add-btn').addEventListener('click', openTextBox);

//confirms if user wants the profile deleted
$('#delete-btn').addEventListener('click', e => {
    let msg = "Confirm Delete Profile?"

    //if user clciks ok profile deletoion text
    if(confirm(msg) == true) {
        let username = $('#username').value;
        alert(username + ' deleted !!');
        openLoginPanel();
    }
})

// clear all input values
function resetInputs(){
    var inputs = document.getElementsByTagName("input");
    for(var input of inputs){
        input.value='';
    }
}

//sets the background to the main loginscreen background
function changeToMainBackground() {
    container.style.background = 'none';
    container.style.backgroundImage = "url('image/background.jpg')";
    container.style.backgroundSize = 'cover';
    container.style.backgroundRepeat = 'no-repeat';
    container.style.backgroundAttachment = 'fixed';
}

//sets the new background color for the homescreen
function changeBackground() {
    container.style.background = 'rgba(23, 122, 192 )';
}

//displays the registration panel and adds hidden class to other panels
function openRegisterPanel(){
    $('#home-panel').classList.add('hidden');
    $('#login-panel').classList.add('hidden');
    $('#register-panel').classList.remove('hidden');

    resetInputs();
}

//displays the login panel and adds hidden class to other panels
function openLoginPanel() {
    $('#home-panel').classList.add('hidden');
    $('#register-panel').classList.add('hidden');
    $('#login-panel').classList.remove('hidden');
    
    changeToMainBackground();
    resetInputs();
}

//displays the homescreen panel and adds hidden class to other panels
function openHomePanel() {
    $('#register-panel').classList.add('hidden');
    $('#login-panel').classList.add('hidden');
    $('#home-panel').classList.remove('hidden');

    //gives the diaryContent div a hidden class if its empty
    if($('#diaryContent').childNodes.length === 0) {
        $('#diaryContent').classList.add('hidden');
    }
    else {
        $('#diaryContent').classList.remove('hidden');
    }

    changeBackground();
    resetInputs();
}

//opens a text box and adds functionalities 
function openTextBox() {
    $('#add-btn').classList.add('hidden');

    //creates an empty div to hold textBox and doneBtn
    var textBoxDiv = document.createElement('div');

    //creates a textarea
    var textBox = document.createElement('textarea');
    textBox.className = 'text-box';

    //creates a button to submit the contents in the textarea
    var doneBtn = document.createElement('button');
    doneBtn.className = 'homescreen-btn';
    doneBtn.innerHTML = 'Done';

    //appending textBox and doneBtn to textBoxDiv
    textBoxDiv.appendChild(textBox);
    textBoxDiv.appendChild(document.createElement('br'));
    textBoxDiv.appendChild(doneBtn);
    
    //appending the textBoxDiv to an empty div with ID diaryInput in HTML
    $('#diaryInput').appendChild(textBoxDiv);

    //creates an empty div to hold the user written contents
    var diaryContent = document.createElement('div');
    diaryContent.className = 'diary-box';

    //adds functionality to the doneBtn 
    doneBtn.addEventListener('click', e => {
        $('#add-btn').classList.remove('hidden');
        $('#diaryContent').classList.remove('hidden');

        //storing the texts in the textBox textarea
        var text = textBox.value;

        //removing the textBoxDiv from the diaryInput diiv in HTML
        $('#diaryInput').removeChild(textBoxDiv);

        //the diaryContent div is filled with content after doneBtn is clicked 
        diaryContent.innerHTML = text;
        //appending the diaryContent div created from js to diaryContent div in HTML
        $('#diaryContent').appendChild(diaryContent);
    });

    //funtionality to delete the selected content in the diary
    diaryContent.addEventListener('click', e => {
        let msg = 'Do you want to delete this?\nOK or Cancel'
        if(confirm(msg) == true) {
            //removes the selected content from the diaryContent div in HTML
            $('#diaryContent').removeChild(e.target);
        }

        //statement to change the style of diaryContent div if the div is empty
        if($('#diaryContent').childNodes.length === 0) {
            $('#diaryContent').classList.add('hidden');
        }
        else {
            $('#diaryContent').classList.remove('hidden');
        }
    })
}
