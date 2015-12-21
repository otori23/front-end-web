describe('Address Book', function() {
	var addressBook,
		thisContact;

	beforeEach(function() {
		addressBook = new AddressBook();
		thisContact = new Contact();
	});

	it('should be able to add a contact', function() {
		/* add the contact to the address book */
		addressBook.addContact(thisContact);

		/* test that the contact was added to the address book */
		/* interpret as: if I were to get the 1st conact in the address book */
		/* it would be thesame as 'thisContact' */
		expect(addressBook.getContact(0)).toBe(thisContact);
	});

	it('should be able to delete a contact', function() {
		// Do some work
		addressBook.addContact(thisContact);
		addressBook.deleteContact(0);

		// test expectation
		expect(addressBook.getContact(0)).not.toBeDefined();
	});
});

describe('Async Address Book', function() {
	var addressBook = new AddressBook();

	// Think of done as a WaitHandle in C#
	beforeEach(function(done) {
		addressBook.getInitialContacts(function(){
			// Signals to Jasmine Framework that our asynchronous call is finished
			// so continue any tests that are flagged to wait for me to finish
			done();
		});
	});

	it('should grab initial contacts', function(done) {
		expect(addressBook.initialComplete).toBe(true);

		// Signals to Jasmine Framework that this test, i.e. this it-block
		// relys on the asynchronous function call in the beforeEach
		// i.e. this test (it-block) is flagged as having to wait for asynchronous
		// call in beforeEach to complete
		done();
	});
});