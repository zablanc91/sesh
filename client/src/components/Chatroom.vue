<template>
  <div class="hello">
    <p>Placeholder : {{message}}</p>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'HelloWorld',
  data(){
    return {
      socket: {},
      message: ''
    }
  },
  created(){
    this.socket = io('http://localhost:3000');
  },
  mounted(){
    this.socket.on('login', (message) => {
      this.message = message;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
