import '../src/app.css';

import { controls } from "./displayControls";
import { todo } from "./todo";


controls.init();

todo.createTodo();

console.table(todo.todos);