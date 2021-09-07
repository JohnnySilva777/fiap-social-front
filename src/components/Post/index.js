import { CardComent, CardPost } from "./styles";
import imgProfile from "../../assets/profile.png";
import { useEffect, useState } from "react";
import { getUser } from "../../services/security";
import { format } from "date-fns";
import { api } from "../../services/api";

function Comments(data) {
    return (
        data.dataFromParent.map((comm) =>
        <CardComent key={comm.id}>
            <header>
                <img src={imgProfile} />                
                <p>{format(new Date(comm.createdAt), "hh:mm:ss dd/MM/yyyy")}</p>                                         
            </header>   
            <p>Commt:{comm.description}</p>
        </CardComent>
        )
    );
}

function Post({data}) {
    const[comentarios, setComentarios] = useState("");
    const [comentario, setComentario] = useState("");
    const [showComents, setShowComents] = useState(false);
    const toggleComents = () => setShowComents(!showComents);
    const [isLoading, setIsLoading] = useState(false);
    let signedUser = getUser();

    const handleComentario = (event) => {
        setComentario(event.target.value);
    };

    const handleSubmit = async (e) => {

        setIsLoading(true);        
        try{
            
            await api.post(`/questions/${data.id}/answers`, {
                description: comentario//
            })
        } catch(error){    
        } finally{
            setIsLoading(false);
        }
        setComentarios(c => [...c, comentario]);
        setComentario(""); 

        loadCommt();
    }

    let comments = comentarios.filter(c => c.QuestionId == data.id);//

    const loadCommt = async () => {
        try {
            const response = await api.get("/answers");

            setComentarios(response.data);
        } catch (error) {//
            console.error(error);
            alert("Erro ao buscar comentário.. ");
        }
    }
    useEffect(() => {         
        loadCommt();
    }, [comentarios]);


    return (
        <CardPost >
            <header>
                <img src={imgProfile} />
                <div>

                    <p>por {signedUser.studentId === data.Student.id ? "Você " : data.Student.name}</p>

                    <span>em {format(new Date(data.created_at), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <main>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                {data.image && <img src={data.image} alt="Imagem do post" />}
                <footer>
                    {data.Categories.map((cat, idx) => <p key={idx}>{cat.description}</p>)}
                </footer>
            </main>
            <footer>
                <h3 onClick={toggleComents} id="h3_comment" value={comments}>
                    {comments.length === 0 ? "Seja o primeiro a comentar":
                    `${comments.length} Comentário${comments.length > 1 ? "s" : '' }`
                    }
                </h3>
                {showComents && (
                    <>
                        <Comments value={comentarios} dataFromParent = {comentarios.filter(c => c.QuestionId == data.id)} />             
                    </>                    
                )}
                <div>
                    <input id="input_comentario" type="text" value = {comentario} onChange={handleComentario}  name="comentario" onKeyUp={handleComentario}  placeholder="Comente este post" />
                    <button onClick={handleSubmit} disabled={comentario.length<10}>Enviar</button>
                </div>
            </footer>
        </CardPost>
    );
}


export default Post;