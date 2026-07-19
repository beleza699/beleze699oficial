const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

function lerBanco(){
    return JSON.parse(
        fs.readFileSync("./database.json", "utf8")
    );
}

function salvarBanco(dados){
    fs.writeFileSync(
        "./database.json",
        JSON.stringify(dados, null, 2)
    );
}


// TESTE CADASTRO USUARIO
app.post("/api/usuarios", (req,res)=>{

    let banco = lerBanco();

    const usuario = {
        id: Date.now(),
        nome: req.body.nome,
        email: req.body.email
    };


    banco.usuarios.push(usuario);

    salvarBanco(banco);


    res.json({
        mensagem:"Usuário salvo!",
        usuario
    });

});


app.get("/api/usuarios",(req,res)=>{

    let banco = lerBanco();

    res.json(banco.usuarios);

});


app.listen(PORT,()=>{
    console.log("Servidor rodando na porta 3000");
});
