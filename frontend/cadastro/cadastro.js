const formFilme = document.querySelector("#form-filme")

async function cadastrarFilme(event) {
    event.preventDefault()

    const novoFilme = {
        titulo_filme: document.querySelector("#titulo_filme").value,
        genero: document.querySelector("#genero").value,
        duracao: Number(document.querySelector("#duracao").value),
        classificacao_etaria: Number(document.querySelector("#classificacao_etaria").value)
    }

    try {
        // Rota corrigida de acordo com o seu backend (/create-task)
        const resposta = await fetch("https://filmes-atividade-backend.vercel.app/create-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoFilme)
        })

        if (resposta.ok) {
            alert("Filme cadastrado com sucesso!")
            window.location.href = "../index.html"
        } else {
            const erro = await resposta.json().catch(() => null)
            alert(`Erro ao cadastrar: ${erro ? erro.message : 'Verifique os dados enviados.'}`)
        }
    } catch (error) {
        console.error("Erro na requisição:", error)
        alert("Erro de conexão com o servidor.")
    }
}

formFilme.addEventListener("submit", cadastrarFilme)