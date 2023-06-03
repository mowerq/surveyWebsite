import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import api from "../../api/axiosConfig";
import Swal from 'sweetalert2';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await api.get("/api/auth/allUsers");
      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        if (localStorage.getItem('theme') === null) {
          localStorage.setItem('theme', 'light');
        }
        navigate("/dashboard", {state: {user: user}});
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid email or password!",
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton onClick={handleLogin} type="submit">Login</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">Don't have an account? </MutedLink>
      <BoldLink href="#" onClick={switchToSignup}>
        Sign Up
      </BoldLink>
    </BoxContainer>
  );
}