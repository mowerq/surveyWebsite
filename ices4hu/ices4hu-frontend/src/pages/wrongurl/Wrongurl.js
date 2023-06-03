import React from 'react'
import { useNavigate } from 'react-router-dom'

const Wrongurl = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h1 onClick={() => {navigate("/");}} style={{color:"#ffffff", marginTop:"0px", background:"rgb(156, 106, 200)", height:"100vh", display:'flex', justifyContent:'center', paddingTop:"100px"}}>{`Sorry, There is no such url :(`}<br></br>You can click anywhere to go to Login Page</h1>
    </div>
  )
}

export default Wrongurl