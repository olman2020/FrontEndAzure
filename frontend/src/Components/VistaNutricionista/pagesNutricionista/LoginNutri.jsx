import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../../styleCss/LoginCliente.css';
import BarraNav from '../../Barra';
import md5 from "md5";


function LoginNutri({ url, img, register, rutathen,id }) {
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert,setshowAlert]=useState(false)
  const navigate = useNavigate();
  //captura el cambio del estado del
  const changeGmail = (e) => {
    setGmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

    
   

 //envio de la informacion para ser revisada
  const sendInfo = async (data) => {
    try {
      const url="https://apinutritecbd.azurewebsites.net/Nutricionista/validarnutricionista"
      const response= await axios.post(url, {
        correoelectronico: data.gmail,   
        contrasena: md5(data.password)
      });
      
      if(response.data!=="NO"){
        localStorage.setItem('cedula',response.data)
        alert('Usuario valido ')
        navigate('/nutricionista/vistasecundaria')
      }
      else{
        alert('La contraseña o el usuario no es valido por favor registrate')
        setGmail("")
        setPassword("")
      }
        
      }
        
      catch (error) {
        console.error(error)
    }}
  ;

  return (
    <div>
      <BarraNav />
     
      <div className="container-login-cliente">
      
        <div className="container-img">
          <img className="img-login" src={img} alt="imagen" />
        </div>
        <form className="container-form" onSubmit={handleSubmit(sendInfo)}>
          <div className="icon">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="div-gmail">
            <i className="fa-sharsp fa-solid fa-envelope"></i>
            <input
              
              type="text"
              className="input-gmail"
              name="gmail"
              onChange={changeGmail}
              {...formRegister("gmail", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format"
                }
              })}
            />
            <label>Email</label>
            {errors.gmail && <span>{errors.gmail.message}</span>}
          </div>
          <div className="div-password">
            <i className="fa-solid fa-lock"></i>
            <input
            
              type="password"
              className="input-password"
              name="password"
              onChange={changePassword}
              {...formRegister("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters"
                }
              })}
            />
            <label>Password</label>
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="icons-application">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook facebook"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
          <div className="pregunta-registro">
            <a className="a-pregunta" href={register}>Don't have an account?</a>
          </div>
          <div className="button-login-div">
            <button className="button-login" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginNutri;
