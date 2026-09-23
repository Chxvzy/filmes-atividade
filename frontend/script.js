const baseUrl = "https://filmes-atividade-backend.vercel.app";

// --- Controle do Tema (Dark/Light Mode) ---
const btnTheme = document.querySelector("#btn-theme");
const currentTheme = localStorage.getItem("theme") || "dark";

document.documentElement.setAttribute("data-theme", currentTheme);
atualizarTextoBotaoTema(currentTheme);

btnTheme.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    atualizarTextoBotaoTema(theme);
});

function atualizarTextoBotaoTema(theme) {
    btnTheme.textContent = theme === "dark" ? "Modo Claro" : "Modo Escuro";
}

// --- Buscar e Exibir Filmes ---
async function buscarFilmes() {
    try {
        const resposta = await fetch(`${baseUrl}/all-tasks`);
        const filmes = await resposta.json();
        const sectionFilmes = document.querySelector(".filmes");
        
        sectionFilmes.innerHTML = "";

        filmes.forEach((filme) => {
            const classif = filme.classificacao_etaria > 0 ? `${filme.classificacao_etaria} anos` : 'Livre';
            
            sectionFilmes.innerHTML += `
                <article class="card-filme">
                    <div class="card-info">
                        <div class="card-header">
                            <h2>${filme.titulo_filme}</h2>
                            <span class="badge-age">${classif}</span>
                        </div>
                        <div class="card-details">
                            <p class="info-item"><strong>Gênero:</strong> ${filme.genero}</p>
                            <p class="info-item"><strong>Duração:</strong> ${filme.duracao} min</p>
                        </div>
                    </div>
                    <div class="acoes">
                        <a href="cadastro/cadastro.html?id=${filme.id}" class="btn-editar">Editar</a>
                        <button onclick="deletarFilme(${filme.id})" class="btn-deletar">Excluir</button>
                    </div>
                </article>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar filmes:", error);
    }
}

async function deletarFilme(id) {
    if (!confirm("Tem certeza de que deseja excluir este filme?")) return;

    try {
        const resposta = await fetch(`${baseUrl}/delete-task/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            buscarFilmes();
        } else {
            alert("Erro ao excluir o filme.");
        }
    } catch (error) {
        console.error("Erro ao excluir filme:", error);
    }
}

buscarFilmes();