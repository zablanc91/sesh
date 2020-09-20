<template>
  <div id="app">
    <Chatroom />
  </div>
</template>

<script>
import Chatroom from './components/Chatroom.vue'

export default {
  name: 'App',
  components: {
    Chatroom
  }
}
</script>

<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #2C3E50;
    margin: 0;
    padding: 0;
  }
</style>
