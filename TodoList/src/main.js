import Todos from "./api/todos";
import "./assets/css/main.css";
import { createApp } from "vue";

const apiTodos = new Todos();

const app = createApp({
  data() {
    return {
      todos: [],
      form: {
        text: "",
        done: false,
      },
      loading: false,
    };
  },
  async created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        this.loading = true;
        this.todos = await apiTodos.index();
      } catch (error) {}
    },
    async createTodo() {
      const data = await apiTodos.store(this.form);
      this.todos.push(data);
      this.form.text = "";
      this.form.done = false;
    },
    async toggleTodoStatus(todo) {
      const data = await apiTodos.update({ ...todo, done: !todo.done });

      const index = this.todos.findIndex(({ id }) => id === data.id);
      this.todos[index] = data;
    },
    async destroyTodo(id) {
      await apiTodos.destroy({ id });
      const index = this.todos.findIndex((todo) => todo.id === id);
      this.todos.splice(index, 1);
    },
  },
});

app.mount("#app");
