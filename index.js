import express from "express"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())

const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MC"
})


// GET - Buscar todos os filmes
app.get("/all-tasks", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_FelipeLorenzo"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)

            return response.status(500).json({
                message: "Erro ao buscar os filmes"
            })
        }

        response.json(data)
    })
})


// POST - Criar filme
app.post("/create-task", (request, response) => {

    const {
        titulo_filme,
        genero,
        duracao,
        classificacao_etaria
    } = request.body

    const insertCommand = `
        INSERT INTO filmes_FelipeLorenzo
        (titulo_filme, genero, duracao, classificacao_etaria)
        VALUES (?, ?, ?, ?)
    `

    database.query(
        insertCommand,
        [
            titulo_filme,
            genero,
            duracao,
            classificacao_etaria
        ],
        (error, data) => {

            if (error) {
                console.log(error)

                return response.status(500).json({
                    message: "Erro ao criar o filme",
                    error: error.message
                })
            }

            response.status(201).json({
                message: "Filme criado com sucesso!",
                id: data.insertId
            })
        }
    )
})


// DELETE - Apagar filme
app.delete("/delete-task/:id", (request, response) => {

    const { id } = request.params

    const deleteCommand = `
        DELETE FROM filmes_FelipeLorenzo
        WHERE id = ?
    `

    database.query(
        deleteCommand,
        [id],
        (error, data) => {

            if (error) {
                console.log(error)

                return response.status(500).json({
                    message: "Erro ao apagar o filme"
                })
            }

            if (data.affectedRows === 0) {
                return response.status(404).json({
                    message: "Filme não encontrado"
                })
            }

            response.json({
                message: "Filme apagado com sucesso!"
            })
        }
    )
})


// PUT - Atualizar filme
app.put("/update-task/:id", async (request, response) => {

    const { id } = request.params

    const {
        titulo_filme,
        genero,
        duracao,
        classificacao_etaria
    } = request.body

    try {

        const updateCommand = `
            UPDATE filmes_FelipeLorenzo
            SET
                titulo_filme = ?,
                genero = ?,
                duracao = ?,
                classificacao_etaria = ?
            WHERE id = ?
        `

        const [data] = await database.promise().query(
            updateCommand,
            [
                titulo_filme,
                genero,
                duracao,
                classificacao_etaria,
                id
            ]
        )

        if (data.affectedRows === 0) {
            return response.status(404).json({
                message: "Filme não encontrado"
            })
        }

        response.json({
            message: "Filme atualizado com sucesso!"
        })

    } catch (error) {

        console.log(error)

        response.status(500).json({
            message: "Erro ao atualizar o filme",
            error: error.message
        })
    }
})


// GET - Página inicial
app.get("/", (request, response) => {
    response.json({
        message: "Servidor funcionando!"
    })
})


// Iniciar servidor
app.listen(3333, () => {
    console.log("Servidor On.")
})