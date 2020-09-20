<template>
  <div class="hello">
    <p>Placeholder : {{messages}}</p>
    <p>Welcome, {{username}}</p>
    <input v-model="message" ref="messageInput" placeholder="Type message here.">
    <button @click="sendMessage">Send</button>
    <p>Online:</p>

  </div>
</template>

<script>
import io from 'socket.io-client';
export default {
  name: 'Chatroom',
  data(){
    return {
      socket: {},
      username: '',
      message: '',
      messages: []
    }
  },
  methods: {
    connect(){
      this.socket.on('connected', ({messages, users}) => {
        this.users = users;
        this.messages = messages;
      });
    },
    login(){
      this.username = prompt('Please input a username.', `Anon${Math.floor(Math.random() * Math.floor(1337))}`);
      this.socket.emit('login', this.username);
    },
    sendMessage(){
      //TODO: need to create an object representing a message (text, user) to send to backend
      if(this.message === ''){
        return;
      }
      console.log(this.message);
      this.$refs.messageInput.value = '';
    }
  },
  created(){
    this.socket = io('http://localhost:3000');
  },
  mounted(){
    this.connect();
    this.login();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
