class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.keywords = {
          "hello": "Hello User, <br>Type the choice number according to your question:<br>1.How to register?<br>2. How to login?<br>3. Fertilizer Prediction<br>4. Fertilizers shop Recommendation<br>",
           "how are you": "I'm doing well, thank you!",
            "1" : "One",
            "2" : "Two",
             "3" : "Three",
             "4" : "Four",
             "bye" : "Byeee!"
        }

        this.state = false;
        this.messages = [];
        let text0 = "Hello User, Welcome to Cutivo!!<br>Type the choice number according to your question:<br>1.How to register?<br>2. How to login?<br>3. Fertilizer Prediction<br>4. Fertilizers shop Recommendation<br>"
        let msg0 = { name: "Sam", message: text0 }
        this.messages.push(msg0);

    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;
        if(this.messages.length===1){     //updated for default message
          this.updateChatText(chatbox);
        }

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }

    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        // fetch('http://127.0.0.1:5000/predict', {
        //     method: 'POST',
        //     body: JSON.stringify({ message: text1 }),
        //     mode: 'cors',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //   })  //fetch complete
        //
        //   .then(r => r.json())
        //   .then(r => {
        //     let msg2 = { name: "Sam", message: r.answer };
        //     this.messages.push(msg2);
        //     this.updateChatText(chatbox)
        //     textField.value = ''
        //
        // }).catch((error) => {
        //     console.error('Error:', error);
        //     this.updateChatText(chatbox)
        //     textField.value = ''
        //   });

          let msg2 = { name: "Sam", message: this.keywords[msg1.message] };
          this.messages.push(msg2);
          if(msg2.message===undefined){
            msg2.message = "I'm sorry, I don't understand what you're asking. <br>Print hello for any query.";
          }
          console.log(msg2.message);
          this.updateChatText(chatbox)
          textField.value = ''
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();