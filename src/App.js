import { useEffect, useState } from "react";
import { GlobalStyles } from "./GlobalStyles";
// import Feed from "./pages/Feed";
import Router from "./routes";
import { api } from "./services/api";
import { signIn } from "./services/security";

function App() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //executar o login hard code
  useEffect(()=>{

    const doSignIn = async () => {
      try{
          const response = await api.post("/sessions", {
            email: "jsa@gmail.com",
            password: "102030"
          });
          signIn(response.data);
        } catch (error){
        console.error(error);        
        setError(true);

        } finally{
          setLoading(false);
        }
      }

      doSignIn();
      
  }, []);

  return (
    <>
      <GlobalStyles />
      {
        loading ? "Carregando valores..." :
          error ? "Ops, Aconteceu deu errado" :
          <Router />
      }
    </>
  );
}

export default App;
