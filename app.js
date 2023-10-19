 const parent = React.createElement("div" ,{id:"parent"},[
  React.createElement("div", {id :"child1"} ,
 [ React.createElement("h1",{}, "im an h1 tag"), React.createElement("h2", {}, "i am h2 tag")])],
 [
    React.createElement("div", {id :"child2"} ,
   [ React.createElement("h1",{}, "im an h1 tag"), React.createElement("h2", {}, "i am h2 tag")])]
 )
 console.log(parent)
const heading = React.createElement("h1" , {id:"heading"} , "Hello World From React!");
   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(parent);