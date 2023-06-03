import React, { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import Swal from 'sweetalert2';

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await api.get("/api/auth/allUsers");
      const user = response.data.find(
        (user) => user.email === email
      );
      if (user) {
        Swal.fire({
          title: "Error!",
          text: "This email already exists!",
          icon: "error",
          confirmButtonText: 'Okay'
        })
      } else {
        const fullName = name.split(" ");
        if (password1 !== password2) {
          Swal.fire({
            title: "Error!",
            text: "Passwords are not the same!",
            icon: "error",
            confirmButtonText: 'Okay'
          })
        }else{
          const newUser = {
            lastName: fullName.pop(),
            firstName: fullName.join(),
            email: email,
            phoneNumber: "",
            userType: "student",
            password: password1,

          };

          await api.post("/api/auth/register", newUser);
          Swal.fire({
            title: "Good Job!",
            text: "You have signed up successfully!",
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          navigate("/");
        }
        

        
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSignUp}>
        <Input 
          type="text" 
          placeholder="Full Name"
          value={name}
          onChange={(e) => {setName(e.target.value)}} />
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}/>
        <Input 
          type="password" 
          placeholder="Password" 
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}/>
        <Input 
          type="password" 
          placeholder="Password" 
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton onClick={handleSignUp} type="submit">Sign Up</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
      </MutedLink>
      <BoldLink href="#" onClick={switchToSignin}>
        Signin
      </BoldLink>
    </BoxContainer>
  );
}