// Roupas do Henrique Ravi separadas por clima
const guardaRoupa = {
    superior: [
        { nome: "Body Regata Amarelo", clima: "calor", img: "https://via.placeholder.com/150/f1c40f/ffffff?text=Regata" },
        { nome: "Camisa Polo de Algodão", clima: "calor", img: "https://via.placeholder.com/150/0284c7/ffffff?text=Polo" },
        { nome: "Body Manga Longa Fina", clima: "ameno", img: "https://via.placeholder.com/150/34495e/ffffff?text=Manga+Longa" },
        { nome: "Camiseta de Algodão Doce", clima: "ameno", img: "https://via.placeholder.com/150/9b59b6/ffffff?text=Camiseta" },
        { nome: "Casaco de Lã com Touca", clima: "frio", img: "https://via.placeholder.com/150/e74c3c/ffffff?text=Casaco+La" },
        { nome: "Jaqueta Acolchoada", clima: "frio", img: "https://via.placeholder.com/150/2c3e50/ffffff?text=Jaqueta" }
    ],
    inferior: [
        { nome: "Short Jeans Leve", clima: "calor", img: "https://via.placeholder.com/150/2980b9/ffffff?text=Short+Jeans" },
        { nome: "Tapa Fralda de Tecido", clima: "calor", img: "https://via.placeholder.com/150/2ecc71/ffffff?text=Tapa+Fralda" },
        { nome: "Calça Jeans Macia", clima: "ameno", img: "https://via.placeholder.com/150/34495e/ffffff?text=Calca+Jeans" },
        { nome: "Calça de Moletom Leve", clima: "ameno", img: "https://via.placeholder.com/150/95a5a6/ffffff?text=Moletom" },
        { nome: "Calça de Lã Forrada", clima: "frio", img: "https://via.placeholder.com/150/16a085/ffffff?text=Calca+La" },
        { nome: "Calça Termo-Flanelada", clima: "frio", img: "https://via.placeholder.com/150/d35400/ffffff?text=Termica" }
    ],
    calcado: [
        { nome: "Sandalinha Macia", clima: "calor", img: "https://via.placeholder.com/150/e67e22/ffffff?text=Sandalia" },
        { nome: "Pé Descalço / Meia Leve", clima: "calor", img: "https://via.placeholder.com/150/cbd5e1/000000?text=Meia+Leve" },
        { nome: "Tênis de Tecido", clima: "ameno", img: "https://via.placeholder.com/150/ffffff/333333?text=Tenis" },
        { nome: "Sapatinho de Pano", clima: "ameno", img: "https://via.placeholder.com/150/f39c12/ffffff?text=Sapatinho" },
        { nome: "Bota Forrada com Meia Grossa", clima: "frio", img: "https://via.placeholder.com/150/7f8c8d/ffffff?text=Bota" },
        { nome: "Pantufa Quentinha", clima: "frio", img: "https://via.placeholder.com/150/8e44ad/ffffff?text=Pantufa" }
    ]
};

let climaAtual = 'calor';

// Elementos HTML
const btnCombinar = document.getElementById('btn-combinar');
const txtSuperior = document.getElementById('peca-superior');
const txtInferior = document.getElementById('peca-inferior');
const txtCalcado = document.getElementById('peca-calcado');

const imgSuperior = document.getElementById('img-superior');
const imgInferior = document.getElementById('img-inferior');
const imgCalcado = document.getElementById('img-calcado');

const botoesClima = document.querySelectorAll('.btn-clima');
const formPeca = document.getElementById('form-peca');

// Trocar de Clima
botoesClima.forEach(btn => {
    btn.onclick = () => {
        botoesClima.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        climaAtual = btn.dataset.clima;
        gerarCombinacao();
    };
});

function sortearItemPorClima(lista, clima) {
    const itensFiltrados = lista.filter(item => item.clima === clima);
    if (itensFiltrados.length === 0) {
        return { nome: "Sem peças cadastradas", img: null };
    }
    const indice = Math.floor(Math.random() * itensFiltrados.length);
    return itensFiltrados[indice];
}

function atualizarPecaUI(elementoTxt, elementoImg, item) {
    elementoTxt.textContent = item.nome;
    if (item.img) {
        elementoImg.src = item.img;
        elementoImg.style.display = 'block';
    } else {
        elementoImg.style.display = 'none';
    }
}

function gerarCombinacao() {
    const itemSup = sortearItemPorClima(guardaRoupa.superior, climaAtual);
    const itemInf = sortearItemPorClima(guardaRoupa.inferior, climaAtual);
    const itemCal = sortearItemPorClima(guardaRoupa.calcado, climaAtual);

    atualizarPecaUI(txtSuperior, imgSuperior, itemSup);
    atualizarPecaUI(txtInferior, imgInferior, itemInf);
    atualizarPecaUI(txtCalcado, imgCalcado, itemCal);
}

// Cadastrar peça
formPeca.onsubmit = (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome-peca').value.trim();
    const categoria = document.getElementById('categoria-peca').value;
    const clima = document.getElementById('clima-peca').value;
    const img = document.getElementById('url-imagem').value.trim();

    if (nome && categoria && clima) {
        guardaRoupa[categoria].push({
            nome: nome,
            clima: clima,
            img: img || null
        });

        alert(`Peça "${nome}" adicionada com sucesso!`);
        formPeca.reset();
        
        if (clima === climaAtual) {
            gerarCombinacao();
        }
    }
};

btnCombinar.onclick = gerarCombinacao;

// Inicializa no carregamento da página
gerarCombinacao();