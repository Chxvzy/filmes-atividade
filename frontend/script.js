async function buscarFilmes() {
    try {
        const resposta = await fetch("https://filmes-atividade-backend.vercel.app/all-tasks")
        const filmes = await resposta.json()
        const sectionFilmes = document.querySelector(".filmes")
        
        sectionFilmes.innerHTML = ""

        filmes.forEach((filme) => {
            sectionFilmes.innerHTML += `
                <div class="card-filme">
                    <h2>${filme.titulo_filme}</h2>
                    <p><strong>Gênero:</strong> ${filme.genero}</p>
                    <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                    <p><strong>Classificação indicativa:</strong> ${filme.classificacao_etaria > 0 ? filme.classificacao_etaria + ' anos' : 'Livre'}</p>
                    <button onclick="deletarFilme(${filme.id})" class="btn-deletar">Excluir</button>
                </div>
            `
        })
    } catch (error) {
        console.error("Erro ao carregar filmes:", error)
    }
}

async function deletarFilme(id) {
    // Confirmação antes de apagar
    const confirmacao = confirm("Tem certeza que deseja apagar este filme?")
    if (!confirmacao) return

    try {
        const resposta = await fetch(`https://filmes-atividade-backend.vercel.app/delete-task/${id}`, {
            method: "DELETE"
        })

        if (resposta.ok) {
            alert("Filme excluído com sucesso!")
            buscarFilmes() // Recarrega a lista atualizada
        } else {
            const erro = await resposta.json().catch(() => null)
            alert(`Erro ao excluir: ${erro ? erro.message : 'Não foi possível apagar'}`)
        }
    } catch (error) {
        console.error("Erro ao apagar filme:", error)
        alert("Erro de conexão ao tentar excluir.")
    }
}

buscarFilmes()