// Pentelei Shlemko

// Módulo 1 & Módulo 2
const nomeBiblioteca = "Biblioteca do Bairro";
const morada = "Rua Principal, nº 10";
let livrosDisponiveis = 1250;

console.log("=== MÓDULO 1 ===");
console.log("Bem-vindo à Biblioteca do Bairro!");
console.log("Anos desde a abertura (1987):", 2026 - 1987);

console.log("\n=== MÓDULO 2 ===");
livrosDisponiveis -= 3;
console.log("Livros após 3 empréstimos:", livrosDisponiveis);
console.log(`A ${nomeBiblioteca} tem ${livrosDisponiveis} livros disponíveis.`);
console.log("Tipo de 'nomeBiblioteca':", typeof nomeBiblioteca);
console.log("Tipo de 'morada':", typeof morada);
console.log("Tipo de 'livrosDisponiveis':", typeof livrosDisponiveis);
console.log("Nome em maiúsculas:", nomeBiblioteca.toUpperCase());

// Módulo 3
console.log("\n=== MÓDULO 3 ===");
const dia = "quarta";
const hora = 14;
let estadoBiblioteca;

if (dia === "domingo") {
    estadoBiblioteca = "Fechada";
} else if (dia === "sábado") {
    if (hora >= 10 && hora < 13) {
        estadoBiblioteca = "Aberta";
    } else {
        estadoBiblioteca = "Fechada";
    }
} else {
    if (hora >= 9 && hora < 19) {
        estadoBiblioteca = "Aberta";
    } else {
        estadoBiblioteca = "Fechada";
    }
}

console.log(`Estado (${dia}, ${hora}h):`, estadoBiblioteca);

// Módulo 4
console.log("\n=== MÓDULO 4 ===");
function calcularMulta(dias) {
    if (dias <= 15) {
        return 0;
    }
    return (dias - 15) * 0.50;
}

function estaAberta(diaSemana, horaAtual) {
    if (diaSemana === "domingo") return false;
    if (diaSemana === "sábado") return horaAtual >= 10 && horaAtual < 13;
    return horaAtual >= 9 && horaAtual < 19;
}

function formatarEuros(valor) {
    return `${valor.toFixed(2).replace(".", ",")} €`;
}

function mensagemMulta(dias) {
    const multa = calcularMulta(dias);
    if (multa === 0) {
        return "Sem multa";
    }
    return `Multa a pagar: ${formatarEuros(multa)}`;
}

console.log("Multa para 20 dias:", mensagemMulta(20));
console.log("Biblioteca aberta na terça às 10h?", estaAberta("terça", 10));

// Módulo 5
console.log("\n=== MÓDULO 5 ===");
const livros = ["Os Maias", "Mensagem", "A Sibila", "Os Lusíadas", "Aparição"];
livros.push("Memorial do Convento", "Ensaio sobre a Cegueira");
console.log("Total de livros na lista:", livros.length);

console.log("Lista numerada de livros:");
livros.forEach((tituloLivro, indice) => {
    console.log(`${indice + 1}. ${tituloLivro}`);
});

const livrosLongos = livros.filter(titulo => titulo.length > 10);
console.log("Livros com mais de 10 letras:", livrosLongos);

const livrosMaiusculas = livros.map(titulo => titulo.toUpperCase());
console.log("Títulos em maiúsculas:", livrosMaiusculas);

// Módulo 6
console.log("\n=== MÓDULO 6 ===");
let catalogo = [
    { titulo: "Os Maias", autor: "Eça de Queirós", ano: 1888, disponivel: true },
    { titulo: "Mensagem", autor: "Fernando Pessoa", ano: 1934, disponivel: false },
    { titulo: "A Sibila", autor: "Agustina Bessa-Luís", ano: 1954, disponivel: true },
    { titulo: "Os Lusíadas", autor: "Luís de Camões", ano: 1572, disponivel: true },
    { titulo: "Memorial do Convento", autor: "José Saramago", ano: 1982, disponivel: false },
    { titulo: "Aparição", autor: "Vergílio Ferreira", ano: 1959, disponivel: true }
];

for (const l of catalogo) {
    console.log(`${l.titulo} — ${l.autor} (${l.ano})`);
}

const totalDisponiveis = catalogo.filter(l => l.disponivel).length;
console.log("Livros disponíveis:", totalDisponiveis);

let antigo = catalogo[0];
for (const l of catalogo) {
    if (l.ano < antigo.ano) {
        antigo = l;
    }
}
console.log(`O livro mais antigo é "${antigo.titulo}" (${antigo.ano}).`);

function emprestar(titulo) {
    const livro = catalogo.find(l => l.titulo === titulo);
    if (!livro) return "Livro não encontrado.";
    if (!livro.disponivel) return "Já está emprestado.";
    livro.disponivel = false;
    return "Emprestado!";
}

console.log(emprestar("Harry Potter"));
console.log(emprestar("Mensagem"));
console.log(emprestar("Os Maias"));
console.log(emprestar("Os Maias"));
console.log("Disponíveis agora:", catalogo.filter(l => l.disponivel).length);

// Funções auxiliares de armazenamento (Módulo 3 & Módulo 6 - localStorage seguro)
function ler(chave, porOmissao) {
    const texto = localStorage.getItem(chave);
    if (texto === null) return porOmissao;
    try {
        return JSON.parse(texto);
    } catch {
        return porOmissao;
    }
}

function guardar(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
        return true;
    } catch (erro) {
        console.warn("Não foi possível guardar:", erro.name);
        return false;
    }
}

// Módulo 7
const lista = document.querySelector("#lista-livros");
const resumo = document.querySelector("#resumo-catalogo");
let favoritos = ler("favoritos", []);

function mostrarLivros(listaLivros) {
    lista.replaceChildren();

    for (const l of listaLivros) {
        const item = document.createElement("li");
        item.textContent = `${l.titulo} — ${l.autor} (${l.ano})`;

        if (!l.disponivel) {
            item.classList.add("indisponivel");
            item.append(" — emprestado");
        }

        // Módulo 9
        const botaoFav = document.createElement("button");
        botaoFav.textContent = favoritos.includes(l.titulo) ? "Guardado" : "Guardar";
        botaoFav.addEventListener("click", () => {
            if (favoritos.includes(l.titulo)) {
                favoritos = favoritos.filter(t => t !== l.titulo);
            } else {
                favoritos.push(l.titulo);
            }
            guardar("favoritos", favoritos);
            atualizar();
        });

        item.append(" ", botaoFav);
        lista.append(item);
    }

    const n = listaLivros.filter(l => l.disponivel).length;
    resumo.textContent = `${listaLivros.length} livros, ${n} disponíveis`;
}

// Módulo 8
const pesquisa = document.querySelector("#pesquisa");
const botaoDisponiveis = document.querySelector("#so-disponiveis");
let soDisponiveis = false;

function atualizar() {
    const texto = pesquisa.value.trim().toLowerCase();
    let res = catalogo.filter(l => l.titulo.toLowerCase().includes(texto));

    if (soDisponiveis) {
        res = res.filter(l => l.disponivel);
    }

    mostrarLivros(res);

    if (!res.length) {
        lista.textContent = "Nenhum livro encontrado.";
    }
}

pesquisa.addEventListener("input", atualizar);

botaoDisponiveis.addEventListener("click", () => {
    soDisponiveis = !soDisponiveis;
    atualizar();
});

const form = document.querySelector("#inscricao");
const mensagem = document.querySelector("#mensagem");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();

    if (nome === "" || !email.includes("@")) {
        mensagem.textContent = "Preencha o nome e um e-mail válido.";
        return;
    }

    mensagem.textContent = `Obrigado, ${nome}! Inscrição feita.`;
});

// Módulo 9
async function carregarLivros() {
    try {
        const resposta = await fetch("livros.json");
        catalogo = await resposta.json();
        atualizar();
    } catch {
        lista.textContent = "Erro ao carregar o catálogo.";
    }
}

carregarLivros();

// --- Exercício 07: O tema que se lembra ---
const botaoTema = document.querySelector("#tema");

function aplicarTema() {
    const guardado = localStorage.getItem("tema");
    const sistema = matchMedia("(prefers-color-scheme: dark)").matches;
    const escuro = guardado ? guardado === "escuro" : sistema;

    document.body.classList.toggle("escuro", escuro);
    botaoTema.setAttribute("aria-pressed", escuro);
}

botaoTema.addEventListener("click", () => {
    const escuro = !document.body.classList.contains("escuro");
    localStorage.setItem("tema", escuro ? "escuro" : "claro");
    aplicarTema();
});

aplicarTema();

// --- Exercício 03: Contador de visitas ---
const contador = document.querySelector("#contador");
const recomecar = document.querySelector("#recomecar");

const visitas = Number(localStorage.getItem("visitas")) + 1;
localStorage.setItem("visitas", visitas);
contador.textContent = `É a ${visitas}.ª vez que nos visitas`;

recomecar.addEventListener("click", () => {
    localStorage.removeItem("visitas");
    contador.textContent = "Contador reposto.";
});

// --- Exercício 05: Ficha do leitor ---
guardar("biblioteca:leitor", {
    nome: "Ana",
    cartao: "BB-1042",
    generos: ["Romance", "Policial"],
});

const leitor = ler("biblioteca:leitor", null);
const saudacao = document.querySelector("#saudacao");
const listaGeneros = document.querySelector("#listaGeneros");

saudacao.textContent = `Olá, ${leitor?.nome ?? "visitante"}`;

listaGeneros.replaceChildren();
for (const genero of leitor?.generos ?? []) {
    const li = document.createElement("li");
    li.textContent = genero;
    listaGeneros.append(li);
}

// --- Exercício 08: A lista de leitura que fica ---
let leitura = ler("biblioteca:leitura", []);

const formLeitura = document.querySelector("#form-leitura");
const inputLeitura = document.querySelector("#novo-livro-leitura");
const ulLeitura = document.querySelector("#lista-leitura");

function mostrarLeitura(listaAtual) {
    ulLeitura.replaceChildren();

    listaAtual.forEach((livro, indice) => {
        const li = document.createElement("li");
        li.dataset.indice = indice;
        li.style.cursor = "pointer";

        const span = document.createElement("span");
        span.textContent = livro.titulo;
        if (livro.lido) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.6";
        }

        const btnSubir = document.createElement("button");
        btnSubir.textContent = "↑";
        btnSubir.dataset.acao = "subir";

        const btnDescer = document.createElement("button");
        btnDescer.textContent = "↓";
        btnDescer.dataset.acao = "descer";

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.dataset.acao = "remover";

        li.append(span, " ", btnSubir, " ", btnDescer, " ", btnRemover);
        ulLeitura.append(li);
    });
}

function atualizarLeitura() {
    guardar("biblioteca:leitura", leitura);
    mostrarLeitura(leitura);
}

formLeitura.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const titulo = inputLeitura.value.trim();
    if (!titulo) return;

    leitura.push({ titulo, lido: false });
    inputLeitura.value = "";
    atualizarLeitura();
});

ulLeitura.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button");
    const li = evento.target.closest("li");
    if (!li) return;

    const i = Number(li.dataset.indice);

    if (!botao) {
        leitura[i].lido = !leitura[i].lido;
    } else if (botao.dataset.acao === "remover") {
        leitura.splice(i, 1);
    } else if (botao.dataset.acao === "subir" && i > 0) {
        [leitura[i - 1], leitura[i]] = [leitura[i], leitura[i - 1]];
    } else if (botao.dataset.acao === "descer" && i < leitura.length - 1) {
        [leitura[i + 1], leitura[i]] = [leitura[i], leitura[i + 1]];
    }

    atualizarLeitura();
});

mostrarLeitura(leitura);

// --- Exercício 09: Um aviso por visita (sessionStorage) ---
const CHAVE_AVISO = "biblioteca:aviso-fechado";
const faixaAviso = document.querySelector("#faixa-aviso");
const btnFecharAviso = document.querySelector("#fechar-aviso");

if (sessionStorage.getItem(CHAVE_AVISO) !== "sim") {
    faixaAviso.hidden = false;
}

btnFecharAviso.addEventListener("click", () => {
    faixaAviso.hidden = true;
    sessionStorage.setItem(CHAVE_AVISO, "sim");
});

// --- Exercício 10: Dois separadores, uma lista ---
window.addEventListener("storage", (evento) => {
    if (evento.key === "biblioteca:leitura") {
        leitura = ler("biblioteca:leitura", []);
        mostrarLeitura(leitura);
    }

    if (evento.key === "tema") {
        aplicarTema();
    }
});

// --- Exercício 11: Últimas pesquisas ---
const CHAVE_PESQUISAS = "biblioteca:pesquisas";
const SETE_DIAS = 7 * 24 * 60 * 60 * 1000;
const boxPesquisas = document.querySelector("#ultimas-pesquisas");

function lerPesquisas() {
    const caixa = ler(CHAVE_PESQUISAS, null);
    if (!caixa || caixa.versao !== 1) return [];
    if (Date.now() - caixa.guardadoEm > SETE_DIAS) {
        localStorage.removeItem(CHAVE_PESQUISAS);
        return [];
    }
    return caixa.dados;
}

function mostrarUltimasPesquisas() {
    const termos = lerPesquisas();
    boxPesquisas.replaceChildren();
    if (!termos.length) return;

    boxPesquisas.append("Recentes: ");
    for (const termo of termos) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = termo;
        btn.addEventListener("click", () => {
            pesquisa.value = termo;
            atualizar();
        });
        boxPesquisas.append(btn, " ");
    }
}

function registarPesquisa(termo) {
    const limpo = termo.trim();
    if (!limpo) return;
    const antigas = lerPesquisas().filter((t) => t.toLowerCase() !== limpo.toLowerCase());
    const dados = [limpo, ...antigas].slice(0, 5);
    guardar(CHAVE_PESQUISAS, { versao: 1, guardadoEm: Date.now(), dados });
    mostrarUltimasPesquisas();
}

pesquisa.addEventListener("change", () => registarPesquisa(pesquisa.value));
mostrarUltimasPesquisas();