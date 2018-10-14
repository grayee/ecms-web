<template>
  <div class="users">
    <h1>Hello Users!</h1>
    <ul>
      <li v-for="(user,index) in users" @click="user.show=!user.show">
        <h2>{{user.name}}</h2>
        <h3 v-show="user.show">{{user.email}}</h3>
      </li>
    </ul>

    <input v-model="inputValue"/>
    <button @click='handleSubmit'>提交</button>
    <todo-item v-for="(item,index) of list"
               :key="index"
               :index="index"
               :content="item"
               @delete="handleDelete">
    </todo-item>

  </div>
</template>

<script>
  import TodoItem from "./TodoItem";

  export default {
    name: 'User',
    data() {
      return {
        inputValue: '',
        list: [],
        users: [{name: 'Welcome', position: 'dev', show: false},
          {name: 'to', position: 'dev', show: false},
          {name: 'Your', position: 'dev', show: false},
          {name: 'Vue.js', position: 'dev', show: false},
          {name: 'App', position: 'dev', show: false}]
      }
    },
    component: {
      'todo-item': TodoItem
    },
    methods: {
      handleSubmit() {
        this.list.push(this.inputValue);
        this.inputValue = '';
      },
      handleDelete(index) {
        this.list.splice(index, 1)
      }
    },
    created() {
      this.$http.get("http://jsonplaceholder.typicode.com/users").then((data) => {
        console.log("--->",data);
        this.users = data.data;
      }).catch(error => {
        console.log("error",error);
      });

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  ul {
    list-style-type: none;
    padding: 10px;
  }

  li {
    display: inline-block;
    margin: 10px 10px;
    border: 1px solid #222;
    flex-basis: 200px;
    padding: 30px;
    text-align: center;
  }

  a {
    color: #42b983;
  }

  h1 {
    color: purple;
  }

  .users {
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>
