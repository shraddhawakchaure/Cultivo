class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.keywords = {
            "0": "Type the choice number according to your question:<br>1. How to get Fetilizer Prediction?<br>2. How to see the nearby fertilizer shops?<br>3. How to handle the chatbot? <br>4. Contact with us <br> 5. Give a Feedback <br> 6. To know about Cultivo. <br> ",
          "hello": "Hello User, <br>Type the choice number according to your question:<br>1. How to get Fetilizer Prediction?<br>2. How to see the nearby shops?<br>3. How to handle the chatbot? <br>4. Contact with us <br> 5. Give a Feedback <br> 6. To know about Cultivo. <br> ",
           "how are you": "I'm doing well, thank you!",
            "1" : "Steps to get the fertilizaer prediction:<br> 1. Make sure you are in home page<br>2.YOu'll see the options to enter your soil type and climate details. <br> 3. Enter the correct details.<br>4.Click the submit button (Green in color)<br>5.Fertilizer type is displayed.<br>For any query enter 0.",
            "2" : "Steps to see the nearby fertilizer Shops: 1. Once you have got the result of fertilizer type prediction, you will se the white button named search nearby shops. <br> 2. Click on that button <br> 3. Map of your location will be opened. <br> 4. Now you can search neatby shops. <br> For any query enter 0.",
             "3" : "Chatbot Handle: <br> You'll see the chatbot icon (Chatbot Toggle button) on lower left of page, you can click on it to access the chatbot or to hide it.<br> For any query enter 0.",
             "4" : "To contact us: <br>1. You'll see contact us button on navigation bar. 2. Click it, and you are on contact page! <br> For any query enter 0. ",
             "5" : "To give feedback: <br>1. You'll see contact us button on navigation bar. 2. Click it, and you are on contact page. <br> 3. You'll see the space to give feedback. <br> 4. Type in your feedback we'll recieve it. <br>For any query enter 0.",
             "6" : "To know about us: <br>1. You'll see About us button on navigation bar. <br> 2. Click  it, and you are on About us page <br> 3. Scroll to know about us and see our team! <br>For any query enter 0.",
             "bye" : "Byeee!"
        }

        this.state = false;
        this.messages = [];
        let text0 = "Hello User, Welcome to Cutivo!!<br>Type the choice number according to your question:<br>1. How to get Fetilizer Prediction?<br>2. How to see the nearby shops?<br>3. How to handle the chatbot? <br>4. Contact with us <br> 5. Give a Feedback <br> 6. To know about Cultivo. <br>"
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

          let msg2 = { name: "Sam", message: this.keywords[msg1.message.toLowerCase()] };
          this.messages.push(msg2);
          if(msg2.message===undefined){
            msg2.message = "I'm sorry, I don't understand what you're asking. <br>Enter 0 for any query.";
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
                html += '<div class="messages__item messages__item--visitor" >' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator" style = "background-color: #68B984">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();
