describe('Address Book', function() {
	it('should be able to add a contact', function() {
		/* create and address book and a contact object */ 
		var addressBook = new AddressBook();
		var thisContact = new Contact();

		/* add the contact to the address book */
		addressBook.addContact(thisContact);

		/* test that the contact was added to the address book */
		/* interpret as: if I were to get the 1st conact in the address book */
		/* it would be thesame as 'thisContact' */
		expect(addressBook.getContact(0)).toBe(thisContact);
	});
});