class Contact {

    // Never use the constructor directly. Always need to use
    // the async factory method.

    constructor(obj_json) {
        this.id = obj_json.id;
        this.first = obj_json.first;
        this.last = obj_json.last;
        this.email = obj_json.email;
        this.phone = obj_json.phone;
        this.notes = obj_json.notes;
    }

    async update() {
        let data_string = JSON.stringify({
            data: {
                id: this.id,
                first: this.first,
                last: this.last,
                email: this.email,
                phone: this.phone,
                notes: this.notes
            }
        });

        let response = await $.ajax("http://localhost:3000/public/contacts/"+this.id,
        {
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: data_string
        })

        return new Contact(response.result.posted);
    }
}

Contact.findAll = async () => {
    let response = await $.ajax("http://localhost:3000/public/contacts/", {type: "GET", dataType: "json"});

    return response.result;
}

Contact.find = async (id) => {
    let response = await $.ajax("http://localhost:3000/public/contacts/"+id,
    {
        type: "GET",
        dataTyoe: "json"
    });

    return new Contact(response.result);
};

Contact.create = async (first, last, email, phone, notes) => {
    let id = Contact.generate_unique_id();
    let data_string = JSON.stringify({
        data: {
            id: id,
            first: first,
            last: last,
            email: email,
            phone: phone,
            notes: notes
        }
    });

    let response = await $.ajax("http://localhost:3000/public/contacts/"+id,
    {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: data_string
    });

    return new Contact(response.result.posted);
}

Contact.generate_unique_id = () => {
    return Date.now().toString(16);
}
