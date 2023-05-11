import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import Header from "./components/Header"
import Footer from "./components/Footer";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      <Header/>
      <AccountBox />
      <Footer/>
    </AppContainer>
  );
}

export default App;
