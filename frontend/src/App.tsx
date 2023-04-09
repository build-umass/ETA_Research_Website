import './App.css';
import Button from './Button'

function App() {
  return (
    <>
      <Button 
        border="none"
        color="#a7b0c4"
        height = "10px"
        onClick={() => console.log("You clicked on the pink circle!")}
        radius = "50%"
        width = "10px"
      />
    </>
  );
}

export default App;