const token = "SEU_TOKEN";
const owner = "beleza699";
const repo = "NOME_DO_REPOSITORIO";
const arquivo = "database.json";


async function salvarJSON(novoDado){

const url =
`https://api.github.com/repos/${owner}/${repo}/contents/${arquivo}`;


// pegar arquivo atual

let resposta = await fetch(url,{
headers:{
Authorization:`Bearer ${token}`
}
});


let dadosArquivo = await resposta.json();


let conteudo = 
atob(dadosArquivo.content);


let banco = JSON.parse(conteudo);


// adicionar

banco.usuarios.push(novoDado);


// converter novamente

let novoConteudo =
btoa(JSON.stringify(banco,null,2));


// enviar atualização

await fetch(url,{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({

message:"Atualizando banco JSON",

content:novoConteudo,

sha:dadosArquivo.sha

})

});


console.log("Salvo no GitHub!");

}


salvarJSON({
nome:"Maria",
email:"teste@email.com"
});
