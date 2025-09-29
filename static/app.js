class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        };

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });

      
        this.showWelcomeMessage(chatBox);
    }

    toggleState(chatbox) {
        this.state = !this.state;
        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textfield = chatbox.querySelector('input');
        let text1 = textfield.value;
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        fetch(SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(r => {
                let msg2 = { name: "Sam", message: r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textfield.value = '';
            })
            .catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox);
                textfield.value = '';
            });
    }

    updateChatText(chatbox) {
        var html = '';

        this.messages.slice().reverse().forEach(function (item) {
            if (item.name === "User") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }


    showWelcomeMessage(chatbox) {
        let msg = {
            name: "Coffebot",
            message: "👋 Welcome to *Premium Coffee* ☕✨\n\nPlease select an option:\n\n1️⃣ About the Company\n2️⃣ Our Products\n3️⃣ Promotions\n4️⃣ Payments & Shipping\n5️⃣ Contact an Agent\n6️⃣ Locations\n7️⃣ Hours\n8️⃣ Technical Support\n9️⃣ Loyalty Program\n🔟 About My Creators\n\n👉 Please reply with the number of your choice.\n\n"
        };
        this.messages.push(msg);
        this.updateChatText(chatbox);
    }
}

const chatbox = new Chatbox();
chatbox.display();
