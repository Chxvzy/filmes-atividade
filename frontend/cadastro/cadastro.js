const baseUrl = "https://filmes-atividade-backend.vercel.app";

const formFilme = document.querySelector("#form-filme");
const tituloPagina = document.querySelector("#titulo-pagina");
const btnSubmit = document.querySelector("#btn-submit");
const btnTheme = document.querySelector("#btn-theme");

// Seleção do banner da esquerda
const bannerTitulo = document.querySelector("#banner-titulo");
const bannerDescricao = document.querySelector("#banner-descricao");

// --- Controle do Tema ---
const currentTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);
btnTheme.checked = currentTheme === "light";

btnTheme.addEventListener("change", () => {
    const theme = btnTheme.checked ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
});

// --- Identifica se é Edição ou Cadastro ---
const urlParams = new URLSearchParams(window.location.search);
const filmeId = urlParams.get("id");

if (filmeId) {
    // --- MODO EDIÇÃO ---
    if (tituloPagina) tituloPagina.textContent = "Editar Filme";
    if (btnSubmit) btnSubmit.textContent = "Atualizar Filme";
    if (bannerTitulo) bannerTitulo.textContent = "Editar Filme";
    if (bannerDescricao) bannerDescricao.textContent = "Atualize as informações do filme para manter sua coleção em dia.";

    carregarDadosFilme(filmeId);
} else {
    // --- MODO CADASTRO ---
    if (tituloPagina) tituloPagina.textContent = "Cadastrar Novo Filme";
    if (btnSubmit) btnSubmit.textContent = "Cadastrar Filme";
    if (bannerTitulo) bannerTitulo.textContent = "Cadastre um Filme";
    if (bannerDescricao) bannerDescricao.textContent = "Preencha os dados do formulário para adicionar um novo filme ao catálogo.";
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
        console.error("Erro ao carregar dados do filme:", error);
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
            alert(`Erro no processamento: ${erro ? erro.message : 'Verifique os dados enviados.'}`);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Falha de conexão com o servidor.");
    }
}

formFilme.addEventListener("submit", salvarFilme);