import Header from "../components/Header"
import Footer from "../components/Footer"
import styles from "../components/Register.module.css"
import React, {useState} from "react"//vai armazenar as imformaçoes
import Axios from "axios"
import Link from "next/link"// 

export default function Register(){


    const [values, setValues] = useState({name:'',  email:'',password:'', birth_at:'', level:'1', photo:'user.png'})

    const HandleInputChange = e => {
      const{name, value } =e.target
  
      setValues({...values,[name]:value})
      console.log(name,value)
    }
  
    const handleFormsubmit = e =>{
      e.preventDefault()

      Axios.post(`https://hcodelab-adonis.herokuapp.com/auths`, values)
      .then( res => {
        console.log("parabens dados cadastratdos",res)

      }).catch( err => console.log ("deu ruim", err))
    
    }


    return(

        <>
        <Header/>
        <main id={styles.register} className={styles.page}>
        <div className={styles["page-header"]}>
            <header>
                <h1>Cadastro</h1>
            </header>
            <hr className="italy" />
        </div>
        <section>
            <div className={styles.image}></div>
            <form onSubmit={handleFormsubmit} className={styles.form}>
                <div>
                    <div className={styles.fields}>
                        <div className={styles.field}>
                            <input type="text" name="name" id="name"  onChange={HandleInputChange} onFocus={HandleInputChange} />
                            <label htmlFor="name">Nome Completo</label>
                        </div>
                        <div className={styles.field}>
                            <input type="email" name="email" id="email" onChange={HandleInputChange} onFocus={HandleInputChange} />
                            <label htmlFor="email">E-mail</label>
                        </div>
                    </div>
                    <div className={styles.fields}>
                        <div className={styles.field}>
                            <input type="date" name="birth_at" id="birth_at" onChange={HandleInputChange} onFocus={HandleInputChange} />
                            <label htmlFor="birth">Data de Nascimento</label>
                        </div>
                        <div className={styles.field}>
                            <input type="password" name="password" id="password" onChange={HandleInputChange} onFocus={HandleInputChange} />
                            <label htmlFor="password">Senha</label>
                        </div>
                    </div>
                    <button type="submit">Entrar</button>
                </div>
                <p>Se você já possui uma conta, 
                    
                <Link href="/login">
               <a title="Cadastra-se">clique aqui</a>
               </Link>
              
                    
                para fazer o login.</p>
            </form>
        </section>
    </main>
        <Footer/>
        </>
    )
}