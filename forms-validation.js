window.addEventListener('message', event => {
	if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
		let error_messages = {
			firstname: 'Please provide a name',
			email: 'Please provide a properly formatted email address',
			website: 'Please provide a properly formatted website address',
			checkbox_field: 'Please agree that you\'re totally awesome',
			complete_all_fields: 'Please complete all required fields.'
		}

		let input = document.querySelectorAll('input'), 
				submit = document.querySelector('form input[type=submit]')

		function globalInputsOnChangeHandler(){
			for (var i = 0; i < input.length; i += 1) {
				let typeCheck = input[i].getAttribute('type') == 'checkbox' ? true : input[i].hasAttribute('required')
				if( error_messages.hasOwnProperty(input[i].getAttribute('name')) && typeCheck ){
					let changedElement = input[i];
					setTimeout(function(){  
						if( changedElement.classList.contains('invalid') || changedElement.classList.contains('error') || changedElement.getAttribute('type') == 'checkbox' ){
							let parentElement = changedElement.closest('.field');
							let errorDiv = parentElement.querySelector('.hs-error-msg')
							if(errorDiv) errorDiv.innerHTML = `<span>&#9888;</span> ${error_messages[changedElement.getAttribute('name')]}`
						}

						let complete_all_fields = document.querySelector('.hs_error_rollup label.hs-main-font-element');
						if( document.body.contains( complete_all_fields ) ){
							complete_all_fields.innerHTML = `<span>&#9888;</span> ${error_messages['complete_all_fields']}`
						}
					}, 50)
				}  
			}
		}

		var observer = new MutationObserver(function(e) {
			globalInputsOnChangeHandler()
			console.log('Attributes changed!');
		});

		for (var i = 0; i < input.length; i += 1) {
			let typeCheck = input[i].getAttribute('type') == 'checkbox' ? true : input[i].hasAttribute('required')
			if( error_messages.hasOwnProperty(input[i].getAttribute('name')) && typeCheck ){
				var target = document.querySelector(`form input[name=${input[i].getAttribute('name')}]`);
				observer.observe(target, {
					attributes: true
				})
			}  
		}
		submit.addEventListener('click', globalInputsOnChangeHandler)

	}
})