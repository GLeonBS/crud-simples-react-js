import client from "../db.js"

export const getUsers = (_, res) => {
    const query = "SELECT * FROM usuarios";
    
    client.query(query, (err, results) => {
        if(err) return res.json(err);
        
        res.status(200).json(results.rows);
    })
}

export const addUser = (req, res) => {
    
    const query = "INSERT INTO usuarios (nome, email, fone, data_nascimento) VALUES ($1, $2, $3, $4)";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento
    ];

    client.query(query, values, (err) => {
        if(err) return res.json(err);

        res.status(200).json("Usuário adicionado com sucesso!");
    });
};

export const updateUser = (req, res) => {
    const query = "UPDATE usuarios SET nome = $1, email = $2, fone = $3, data_nascimento = $4 WHERE id = $5";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];
    

    client.query(query, [...values, req.params.id], (err) => {
        if(err) return res.json(err);

        res.status(200).json("Usuário atualizado com sucesso!");
    });
}

export const deleteUser = (req, res) => {
    const query = "DELETE FROM usuarios WHERE id = $1";

    client.query(query, [req.params.id], (err) => {
        if(err) return res.json(err);

        res.status(200).json("Usuário deletado com sucesso!");
    });
}