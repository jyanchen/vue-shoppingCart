<template>
  <div id="todo-list-example">
    <input
      v-model="newTodoText"
      v-on:keyup.enter="addNewTodo"
      placeholder="Add a todo"
    >
    <ul>
      <li
      is="todo-item"
      v-for="(item, index) in todos"
      :title="item"
      @remove="todos.splice(index, 1)"
      ></li>
    </ul>
    <ol>
      <li v-for="option in options">
        <input type="checkbox" v-model="selected" :value="option.value">
        <span>{{option.text}}</span>
      </li>
    </ol>
    {{selected}}
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'TodoList',
    data(){
      return {
        newTodoText: '',
        todos: [
          'Do the dishes',
          'Take out the trash',
          'Mow the lawn'
        ],
        selected: [],
        options: [
          { text: '上海市', value: '20' },
          { text: '湖北省', value: '43' },
          { text: '河南省', value: '45' },
          { text: '北京市', value: '10' }
        ]
      }
    },
    components: {
      'todo-item': {
        template: [
          // '<li @click="showMsg(\'Hello Vue.js\', $event), showMsg2($event)">',
          '<li>',
            '<input type="checkbox" :value="title" v-model="checkTodos" />',
            '{{title}}',
            '<button @click="$emit(\'remove\')">X</button>{{checkTodos}}',
          '</li>'
        ].join(''),
        props: ['title'],
        data() {
          return {
            checkTodos: []
          }
        },
        methods: {
          showMsg(message, event) {
            // if(event) {
            //   event.preventDefault()
            //   console.log(event)
            // }

            console.log(1)
          },
          showMsg2(event) {
            // if(event) {
            //   event.preventDefault()
            // }
            console.log(2)
          }
        }
      }
    },
    methods: {
      addNewTodo() {
        this.todos.push(this.newTodoText)
        this.newTodoText = ''
      }
    }
  }
</script>
