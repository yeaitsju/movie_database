//opening the data base
import { openDB } from 'idb';


export const database = openDB('movieStore', 2, {
  
  upgrade(db) {
   db.createObjectStore('moviesToStore' , {keyPath: "id", autoIncrement: true});
},
});
   
   
   
   //function
   // a function is const myfunc = () => {
   
   //}
   // method
   // a method is myMethod() {

   //}
   //console.log("this is where my code would run");
   //}

  
 

