class ContactView {

    constructor(contact, parentDiv, startInEdit) {
        this.contact = contact;
        this.parentDiv = $(parentDiv);
        if (!startInEdit) {
            this.curDiv = this.createViewDiv();
        } else {
            this.curDiv = this.createEditDiv();
        }
        this.parentDiv.append(this.curDiv);
    }

    createViewDiv() {
        let view_div = $(`
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://www.cs.unc.edu/~kmp/kmp-in-namibia.jpg" alt="Placeholder image">
                        </figure>
                        <span class="edit_contact"><i class="fas fa-edit"></i></span>
                        <span class="delete_contact"><i class="fas fa-trash-alt"></i></span>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${this.contact.first} ${this.contact.last}</p>
                        <p class="subtitle is-6">${this.contact.email}<br>
                        ${this.contact.phone}</p>
                    </div>
                </div>
            <div class="content">
            ${this.contact.notes}
            </div>
        </div>
        `);

        view_div.find('.delete_contact').on('click', async (e) => {
            await $.ajax("http://localhost:3000/public/contacts/"+this.contact.id, {type: "DELETE"});
            this.curDiv.remove();
        });

        view_div.find('.edit_contact').on('click', (e) => {
            let edit_div = this.createEditDiv();
            this.curDiv.replaceWith(edit_div);
            this.curDiv = edit_div;
        });

        return view_div;
    }

    createEditDiv() {
        let edit_div = $(`
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://www.cs.unc.edu/~kmp/kmp-in-namibia.jpg" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <form>
                            <label>First: <input name="first" type="text" value="${this.contact.first}"></label><br>
                            <label>Last: <input name="last" type="text" value="${this.contact.last}"></label><br>
                            <label>Email: <input name="email" type="text" value="${this.contact.email}"></label><br>
                            <label>Phone: <input name="phone" type="text" value="${this.contact.phone}"></label><br>
                            <label>Notes: <textarea name="notes">${this.contact.notes}</textarea></label><br>
                            <button type="submit" class="button is-success is-small">Update</button>
                        </form>
                    </div>
                </div>
        </div>
        `);

        edit_div.find("form").on('submit', async (e) => {
            e.preventDefault();
            this.contact.first = edit_div.find(".media-content input[name='first']").val();
            this.contact.last = edit_div.find(".media-content input[name='last']").val();
            this.contact.email = edit_div.find(".media-content input[name='email']").val();
            this.contact.phone = edit_div.find(".media-content input[name='phone']").val();
            this.contact.notes = edit_div.find(".media-content textarea[name='notes']").val();
            this.contact = await this.contact.update();
            let new_view_div = this.createViewDiv();
            this.curDiv.replaceWith(new_view_div);
            this.curDiv = new_view_div;
        });

        return edit_div;
    }
}