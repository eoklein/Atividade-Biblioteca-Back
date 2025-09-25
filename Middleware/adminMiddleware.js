export function verifyUser(req,res,next){
    console.log("passei no middleware");

    const headers = req.headers;

    const auth= req.headers.authorization;

 
    if(!auth.startsWith("Basic ")){
        return res.status(401).json({mensagem: "token precisa ser basic"});

    }

    const conteudo_do_token = auth.split("");

    console.log(conteudo_do_token);

    const usuario = texto_descriptografado.slip(":")[0];  
}