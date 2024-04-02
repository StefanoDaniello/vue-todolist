/*Descrizione:
Rifare l'esercizio della to do list.
Oogni todo sarà un oggetto, formato da tre proprietà:
-id, un numero univoco incrementale
- text, una stringa che indica il testo del todo
- done, un booleano (true/false) che indica se il todo è stato fatto oppure no
MILESTONE 1
Stampare all'interno di una lista HTML un item per ogni todo.
Se la proprietà done è uguale a true, visualizzare il testo del todo sbarrato.
MILESTONE 2
Visualizzare a fianco ad ogni item ha una "x": cliccando su di essa, il todo viene rimosso dalla lista.
MILESTONE 3
Predisporre un campo di input testuale e un pulsante "aggiungi": cliccando sul pulsante, il testo digitato viene letto e utilizzato per creare un nuovo todo, che quindi viene aggiunto alla lista dei todo esistenti.
Bonus:
1- oltre al click sul pulsante, intercettare anche il tasto ENTER per aggiungere il todo alla lista
2- cliccando sul testo dell'item, invertire il valore della proprietà done del todo corrispondente (se done era uguale a false, impostare true e viceversa)
*/

import { todo } from "./data.js";

const { createApp } = Vue;

createApp({
    data() {
        return {
            originalTodo: todo,
            todo: [...todo],
            newTodo: '',
            searchQuery: '',
            done: '',
            darkMode: false,
        }
    },
    methods: {
        ToDoComplete(id) {
            const task = this.todo.find(task => task.id === id);
            task.done = !task.done;
        },
        removeItem(id) {
            const index = this.todo.findIndex(task => task.id === id);
            if (index !== -1) {
                this.todo.splice(index, 1);
                // Effettua la stessa operazione sulla lista originale
                const originalIndex = this.originalTodo.findIndex(task => task.id === id);
                if (originalIndex !== -1) {
                    this.originalTodo.splice(originalIndex, 1);
                }
            }
        },
        addItem() {
            const newTask = {
                id: null,
                text: this.newTodo,
                done: false
            };

            let maxId = 0;
            this.todo.forEach((task) => {
                if (task.id > maxId) {
                    maxId = task.id;
                }
            });

            newTask.id = maxId + 1;
            this.newTodo = '';

            if (newTask.text.length > 0) {
                this.todo.push(newTask);
                this.originalTodo.push(newTask);
            }
        },
        findTask() {
            this.todo = this.originalTodo.filter((task) => {
                return task.text.toLowerCase().includes(this.searchQuery.toLowerCase())
            });
            console.log(this.todo);
        },
        toggleMode() {
            this.darkMode = !this.darkMode;
        },
    },
    computed: {
        filteredTodo() {
            return this.todo.filter((el) => {
                if (this.done === '') {
                    return el;
                }
                if (this.done === 'completed') {
                    return el.done;
                }
                if (this.done === 'notcompleted') {
                    return !el.done;
                }
            });
        }
    },

}).mount('#app');
