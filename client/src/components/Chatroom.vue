<template>
  <div class="chat">
    <h1>Current Session</h1>
    <p>Welcome, {{user}}.</p>
    <p>Placeholder : {{messages}}</p>
    <input v-model="message" ref="messageInput" placeholder="Type message here.">
    <button @click="sendMessage">Send</button>
    <p>Online now:{{users}}</p>

  </div>
</template>

<script>
import io from 'socket.io-client';
export default {
  name: 'Chatroom',
  data(){
    return {
      socket: {},
      user: '',
      message: '',
      messages: [],
      users:[]
    }
  },
  methods: {
    login(){
      //log in a user and then load all messages and online users in chat
      this.listen();
      this.user = prompt('Please input a username.', `Anon${Math.floor(Math.random() * Math.floor(1337))}`);
      this.socket.emit('login', this.user);
    },
    listen(){
      this.socket.on('loadUsers', ({users}) => {
        this.users = users;
      });

      this.socket.on('loadMessages', ({messages}) => {
        this.messages = messages;
      });
      
    },
    sendMessage(){
      if(this.message === ''){
        return;
      }
      this.socket.emit('sendMessage', { 
          user: this.user,
          message: this.message
      });
      this.$refs.messageInput.value = '';
    }
  },
  created(){
    this.socket = io('http://localhost:3000');
  },
  mounted(){
    this.login();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chat {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    border: solid 1px black;
    text-align: center;
  }

  button, input {
    margin: 7px auto;
  }
</style>
