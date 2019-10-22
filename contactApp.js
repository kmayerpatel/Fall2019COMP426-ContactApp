$(document).ready(() => {
    loadContacts();

    $("#add_contact").on('click', async (e) => {
        let contact = await Contact.create("First", "Last", "Email", "Phone", "Notes");
        new ContactView(contact, $('#contactList'), true);
    });
});

const loadContacts = async () => {
    const contact_id_list = await Contact.findAll();
    contact_id_list.forEach(async (cid) => {
        const contact = await Contact.find(cid);
        new ContactView(contact, $('#contactList'));
    });
}

