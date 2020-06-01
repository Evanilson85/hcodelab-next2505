import Header from "../components/Header"
import Footer from "../components/Footer"
import styles from "../components/Login.module.css";
import React, {useState} from "react"//vai armazenar as imformaçoes
import Link from "next/link"// 
import axios from "axios"// ele que vai fazer o requeste com adonis
import { Cookies } from "react-cookie" // retornar com cookied

export default function Login(){

  const [values, setValues] = useState({email: '',password:''})
  const cookies = new Cookies()
  let [token, setToken] = useState(cookies.get("token")|| null)


  const HandleInputChange = e => {
    const{name, value } =e.target

    setValues({...values,[name]:value})
  }

  const handleFormsubmit = e =>{
    e.preventDefault()
    
    axios.post("https://hcodelab-adonis.herokuapp.com/auths", values)
    .then(
      (res)=>{
        const tokenData = res.data.token
        cookies.set("token", tokenData)
        console.log("usuario autenticado!")
        alert("Usuario atorizado! vamos para o admin")
        window.location.href=("/admin")
      }
    )
    .catch(err => alert("deu ruim por favor registre", err.message))
  }

  return (
    <>
      <Header/>

      <main id={styles.login} className={styles.page}>
        <div className={styles["page-header"]}>
          <header>
            <h1>Login</h1>
          </header>
          <hr className="italy" />
        </div>
        <section>
          <div className={styles.image}></div>
          <form onSubmit={handleFormsubmit} className={styles.form}>
            <div>
              <div className={styles.fields}>
                <div className={styles.field}>
                  <input type="email" name="email" id="email" onChange={HandleInputChange} onFocus={HandleInputChange} />
                  <label htmlFor="email">E-mail</label>
                </div>
                <div className={styles.field}>
                  <input type="password" name="password" id="password" onChange={HandleInputChange} onFocus={HandleInputChange} />
                  <label htmlFor="password">Senha</label>
                </div>
              </div>
              <div className={styles.actions}>
                <button type="submit">Entrar</button>
                <a href="#">Esqueci a senha</a>
              </div>
            </div>
            <p>
              Você ainda não tem conta,
              <Link href="register">
               <a title="register">clique aqui</a>
               </Link>
              
              e cadastre-se.
            </p>
          </form>
        </section>
      </main>
      <Footer/>
    </>
  );
}
