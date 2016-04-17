/*
Your code goes here!
 */

/*
You might find you want to use RegEx. As this quiz is about setCustomValidity
and not RegEx, here are some RegEx patterns you might find useful:

match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
match a number: /[0-9]/g or /\d/g
match a lowercase letter: /[a-z]/g
match an uppercase letter: /[A-Z]/g
match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
 */

/*
Grabbing a few inputs to help you get started...
 */
var firstPasswordInput = document.querySelector('#first');
var secondPasswordInput = document.querySelector('#second');
var submit = document.querySelector('#submit');

/*
You'll probably find this function useful...
 */  
submit.onclick = function () {
	var val_1 = firstPasswordInput.value;
	var val_2 = secondPasswordInput.value;
	var len = firstPasswordInput.value.length;

	var re_1 = /[\!\@\#\$\%\^\&\*]/g;
	var re_2 = /[0-9]/g;
	var re_3 = /[a-z]/g;
	var re_4 = /[A-Z]/g;
	var re_5 = /[^A-z0-9\!\@\#\$\%\^\&\*]/g;

	var msg = "";

	if(len < 16 || len > 100)
	{
		msg = msg + "password should be 16-100 characters" + "\n";
	}

	if(!re_1.test(val_1))
	{
		msg = msg + "At least one of these symbols: !, @, #, $, %, ^, &, *" + "\n";
	}

	if(!re_2.test(val_1))
	{
		msg = msg + "At least one number" + "\n";
	}
	
	if(!re_3.test(val_1))
	{
		msg = msg + "At least one lowercase letter" + "\n";
	}	
	
	if(!re_4.test(val_1))
	{
		msg = msg + "At least one uppercase letter" + "\n";
	}
	
	if(!re_5.test(val_1))
	{
		msg = msg + "illegal character that is not allowed" + "\n";
	}

	if(val_1 !== val_2)
	{
		msg = msg + "fields don't match" + "\n";
	}

	firstPasswordInput.setCustomValidity(msg);
};