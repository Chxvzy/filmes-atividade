const baseUrl = "https://filmes-atividade-backend.vercel.app";
const formFilme = document.querySelector("#form-filme");
const tituloPagina = document.querySelector("#titulo-pagina");
const btnSubmit = document.querySelector("#btn-submit");

const urlParams = new URLSearchParams(window.location.search);
const filmeId = urlParams.get("id");

if (filmeId) {
    tituloPagina.textContent = "Editar Filme";
    btnSubmit.textContent = "Atualizar Filme";
    carregarDadosFilme(filmeId);
}

async function carregarDadosFilme(id) {
    try {
        const resposta = await fetch(`${baseUrl}/all-tasks`);
        const filmes = await resposta.json();
        const filme = filmes.find((item) => item.id == id);

        if (filme) {
            document.querySelector("#titulo_filme").value = filme.titulo_filme;
            document.querySelector("#genero").value = filme.genero;
            document.querySelector("#duracao").value = filme.duracao;
            document.querySelector("#classificacao_etaria").value = filme.classificacao_etaria;
        } else {
            alert("Filme não encontrado.");
            window.location.href = "../index.html";
        }
    } catch (error) {
        console.error("Erro ao buscar filme:", error);
    }
}

async function salvarFilme(event) {
    event.preventDefault();

    const novoFilme = {
        titulo_filme: document.querySelector("#titulo_filme").value,
        genero: document.querySelector("#genero").value,
        duracao: Number(document.querySelector("#duracao").value),
        classificacao_etaria: Number(document.querySelector("#classificacao_etaria").value)
    };

    const endpoint = filmeId ? `${baseUrl}/update-task/${filmeId}` : `${baseUrl}/create-task`;
    const metodo = filmeId ? "PUT" : "POST";

    try {
        const resposta = await fetch(endpoint, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoFilme)
        });

        if (resposta.ok) {
            alert(filmeId ? "Filme atualizado com sucesso!" : "Filme cadastrado com sucesso!");
            window.location.href = "../index.html";
        } else {
            const erro = await resposta.json().catch(() => null);
            alert(`Erro na operação: ${erro ? erro.message : 'Verifique os dados.'}`);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro de conexão com o servidor.");
    }
}

formFilme.addEventListener("submit", salvarFilme);