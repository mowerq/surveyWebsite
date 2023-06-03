import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import Header from "./components/Header"
import Footer from "./components/Footer";


const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff
`;

function App() {

  return (
    <div>
      <Header/>
      <AppContainer>
        <AccountBox />
        <Footer/>
      </AppContainer>
    </div>
    
  );
}

export default App;
