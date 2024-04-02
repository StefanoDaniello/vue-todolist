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

import {todo} from "./data.js";
// import getRndInteger from "./utility.js";

const {createApp} = Vue;

createApp({
    data() {
        return {
            todo,
            newTodo: '',
            searchQuery: '',
            done:'',
        }
    },
    methods: {
    ToDoComplete(id) {
        const i = this.todo.find(todo => todo.id === id)
        i.done = !i.done
    },
    removeItem(id){
        const i = this.todo.findIndex(todo => todo.id === id)
        if(i != -1){
            this.todo.splice(i, 1);
        }
    },
    addItem(){
        const newitem={
            id:null,
            text:this.newTodo,
            done:false
        }
        let somma = 0;
        this.todo.forEach((el)=>{
            if(somma<el.id){
                somma= el.id;
            }
        });
        newitem.id = somma+1;
        this.newTodo = '';
        if(newitem.text.length > 0){
            this.todo.push(newitem);
        }    
        console.log(this.todo)
    },
    findTask(){
        this.todo = todo.filter((el)=>{
           return el.text.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
       console.log(this.todo)
        
   },
    },
    computed: {
        filteredTodo(){
            return this.todo.filter((el) =>{
                if(this.done ===''){
                    return el;
                }
                if(this.done === 'completed'){
                    return el.done;
                }
                if(this.done === 'notcompleted'){
                    return !el.done;
                }
            });
        }
    },

}).mount('#app')