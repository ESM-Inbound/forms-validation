let error_messages = {
	firstname: 'Please provide a name',
	email: 'Please provide a properly formatted email address',
	website: '',
	checkbox_field: 'Please agree that you\'re totally awesome'
}

let input = document.querySelectorAll('input');

function onChangeHandler(event) {
	if (!event) event = window.event;
  var changedElement = event.srcElement || this;
	console.log(changedElement.getAttribute('name'), changedElement.classList.contains('invalid'), changedElement.classList.contains('error'));
	setTimeout(function(){  
		if( changedElement.classList.contains('invalid') || changedElement.classList.contains('error') || changedElement.getAttribute('type') == 'checkbox' ){
			let parentElement = changedElement.closest('.field');
			let errorDiv = parentElement.querySelector('.hs-error-msg')
			if(errorDiv) errorDiv.innerText = error_messages[changedElement.getAttribute('name')]
			console.log(error_messages[changedElement.getAttribute('name')]);
		}
	}, 200);
}

for (var i = 0; i < input.length; i += 1) {
	let typeCheck = input[i].getAttribute('type') == 'checkbox' ? true : input[i].hasAttribute('required')
	if( error_messages.hasOwnProperty(input[i].getAttribute('name')) && typeCheck ){
		['keyup', 'mouseout', 'change','hover'].forEach(function(e) {
			input[i].addEventListener(e, onChangeHandler);
		})
	}  
}

 