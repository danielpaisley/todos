// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, child, get } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyA2-qL_usRw44kPUo7NDsvNEuiU_Btz5PQ",
//   authDomain: "todo-app-9d933.firebaseapp.com",
//   projectId: "todo-app-9d933",
//   storageBucket: "todo-app-9d933.appspot.com",
//   messagingSenderId: "278417500254",
//   appId: "1:278417500254:web:10d790e872d23aacdc2ccf",
//   measurementId: "G-LQ4LVJLYTV",
//   databaseURL: "https://todo-app-9d933-default-rtdb.firebaseio.com/",
// };
// const app = initializeApp(firebaseConfig);

// export const writeTodos = (todo) => {
//   const database = getDatabase();
//   set(ref(database, `todos/${todo.todoId}`), todo)
// .then(() => {
//   // Data saved successfully!
// })
// .catch((error) => {
//   // The write failed...
// });;
// };
// export const getTodo = (todoId) => {
//   const databaseRef = ref(getDatabase());
//   get(child(databaseRef, `todos/${todoId}`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
// export const
