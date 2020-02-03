// import React, { Component } from "react";
// // import axios from "axios";

// export default class Demo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true,
//       musuem: []
//     };
//   }
//   componentDidMount() {
//     //api call to the backend
//     //i used axios here but u can use the native fetch api
//    let url =("https://jsonplaceholder.typicode.com/todos/1")
     
//     fetch
    
//         fetch(url)
//         .then(response.json())
//         .then(response => {
//         console.log(response.data);
//         this.setState({
//           musuem: response.data.data,
//           isLoading: false
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
//   renderMusuem = () => {
//     const { musuem } = this.state;
//     if (musuem.length > 0) {
//       return musuem.map(ele => {
//         <div>
//           <span>{ele.name}</span>
//           <span>{ele.date}</span>
//         </div>;
//       });
//     }
//     return null;
//   };
//   render() {
//     const { isLoading } = this.state;
//     return (
//       <div>
//         {isLoading && <div>Loading.....w</div>}
//         {this.renderMusuem()}
//       </div>
//     );
//   }
// }