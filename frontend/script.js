async function buscarFilmes() {
    try {
        // Aponta para a rota correta que traz os filmes do banco
        const resposta = await fetch("http://localhost:3333/all-tasks")
        const filmes = await resposta.json()
        const sectionFilmes = document.querySelector(".filmes")
        
        sectionFilmes.innerHTML = "" // Limpa o container antes de popular

        filmes.forEach((filme) => {
            // Mapeia para os nomes exatos das colunas do banco de dados
            sectionFilmes.innerHTML += `
                <div>
                    <h2>${filme.titulo_filme}</h2>
                    <p><strong>Gênero:</strong> ${filme.genero}</p>
                    <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                    <p><strong>Classificação indicativa:</strong> ${filme.classificacao_etaria > 0 ? filme.classificacao_etaria + ' anos' : 'Livre'}</p>
                </div>
            `
        })
    } catch (error) {
        console.error("Erro ao carregar filmes:", error)
    }
}

buscarFilmes()