let telaAtual = "apresentacao"; // apresentacao, login, produtor, consumidor, form, chat
let tela = "login"; // login, produtor, consumidor, form, chat
let tipoUsuario = ""; // produtor ou consumidor

// Produtos armazenados
let produtos = [];

// Elementos HTML
let inputUsuario, inputSenha, btnEntrar;
let btnProdutor, btnConsumidor;

let telaLogin, telaProdutor, telaConsumidor, telaForm, telaChat;

let btnNovoProduto, listaProdutosProdutor;
let btnSalvarProduto, formProduto;

let listaProdutosConsumidor, btnChat;

let areaChat, inputMensagem, btnEnviar;




function setup() {
  noCanvas();

  // Mapear telas
  telaApresentacao = select("#tela-apresentacao");
  telaLogin = select("#tela-login");
  telaProdutor = select("#tela-produtor");
  telaConsumidor = select("#tela-consumidor");
  telaForm = select("#tela-form");
  telaChat = select("#tela-chat");

  // Esconder todas menos a de apresentação
  telaApresentacao.show();
  telaLogin.hide();
  telaProdutor.hide();
  telaConsumidor.hide();
  telaForm.hide();
  telaChat.hide();

  // Botão "Iniciar"
  select("#btn-iniciar").mousePressed(() => {
    trocarTela("login");
  });

  // ... seu restante do setup ...

  telaApresentacao = select("#tela-apresentacao");

  // Mostrar só a tela de apresentação no início
  telaApresentacao.show();
  telaLogin.hide();
  telaProdutor.hide();
  telaConsumidor.hide();
  telaForm.hide();
  telaChat.hide();

  // Botão "Iniciar"
  select("#btn-iniciar").mousePressed(() => {
    trocarTela("login");
    function trocarTela(novaTela) {
  telaAtual = novaTela;

  telaApresentacao.hide();
  telaLogin.hide();
  telaProdutor.hide();
  telaConsumidor.hide();
  telaForm.hide();
  telaChat.hide();

  if (novaTela === "apresentacao") telaApresentacao.show();
  else if (novaTela === "login") telaLogin.show();
  else if (novaTela === "produtor") {
    telaProdutor.show();
    mostrarProdutosProdutor();
  }
  else if (novaTela === "consumidor") {
    telaConsumidor.show();
    mostrarProdutosConsumidor();
  }
  else if (novaTela === "form") {
    telaForm.show();
    formProduto.elt.reset();
  }
  else if (novaTela === "chat") {
    telaChat.show();
    areaChat.html("");
    carregarMensagensSimuladas();
  }
}

  });

  // ... resto do seu setup ...

  // Mapear telas
  telaLogin = select("#tela-login");
  telaProdutor = select("#tela-produtor");
  telaConsumidor = select("#tela-consumidor");
  telaForm = select("#tela-form");
  telaChat = select("#tela-chat");

  // Inputs login
  inputUsuario = select("#input-usuario");
  inputSenha = select("#input-senha");
  btnEntrar = select("#btn-entrar");
  btnEntrar.mousePressed(fazerLogin);

  btnProdutor = select("#btn-produtor");
  btnConsumidor = select("#btn-consumidor");
  btnProdutor.mousePressed(() => selecionarTipo("produtor"));
  btnConsumidor.mousePressed(() => selecionarTipo("consumidor"));

  // Produtor
  btnNovoProduto = select("#btn-novo-produto");
  btnNovoProduto.mousePressed(() => trocarTela("form"));
  listaProdutosProdutor = select("#lista-produtos-produtor");
  
selectAll(".btn-voltar").forEach(btn => {
  btn.mousePressed(() => {
    if (telaAtual === "form") {
      trocarTela("produtor");
    } else if (telaAtual === "chat") {
      trocarTela("consumidor");
    } else {
      trocarTela("login"); // Para casos como voltar do produtor ou consumidor
    }
  });
});


  // Form produto
  formProduto = select("#form-produto");
  formProduto.elt.addEventListener("submit", e => {
    e.preventDefault();
    salvarProduto();
  });

  // Consumidor
  listaProdutosConsumidor = select("#lista-produtos-consumidor");
  btnChat = select("#btn-chat");
  btnChat.mousePressed(() => trocarTela("chat"));

  // Chat
  areaChat = select("#area-chat");
  inputMensagem = select("#input-mensagem");
  btnEnviar = select("#btn-enviar");
  btnEnviar.mousePressed(enviarMensagem);

  carregarProdutos();
  atualizarInterface();
}

function selecionarTipo(tipo) {
  tipoUsuario = tipo;
  btnProdutor.style("background-color", tipo === "produtor" ? "#147a0c" : "#25d366");
  btnConsumidor.style("background-color", tipo === "consumidor" ? "#147a0c" : "#25d366");
}

function fazerLogin() {
  let usuario = inputUsuario.value().trim();
  let senha = inputSenha.value().trim();

  if (!usuario || !senha) {
    alert("Preencha usuário e senha");
    return;
  }

  if (!usuario.endsWith("@gmail.com")) {
    alert("E-mail deve terminar com @gmail.com");
    return;
  }

  if (tipoUsuario === "") {
    alert("Selecione Produtor ou Consumidor");
    return;
  }

  trocarTela(tipoUsuario);
}

function trocarTela(novaTela) {
  telaAtual = novaTela;

  telaLogin.hide();
  telaProdutor.hide();
  telaConsumidor.hide();
  telaForm.hide();
  telaChat.hide();

  if (novaTela === "login") telaLogin.show();
  else if (novaTela === "produtor") {
    telaProdutor.show();
    mostrarProdutosProdutor();
  }
  else if (novaTela === "consumidor") {
    telaConsumidor.show();
    mostrarProdutosConsumidor();
  }
  else if (novaTela === "form") {
    telaForm.show();
    formProduto.elt.reset();
  }
  else if (novaTela === "chat") {
    telaChat.show();
    areaChat.html("");
    carregarMensagensSimuladas();
  }
}

function carregarProdutos() {
  let dados = localStorage.getItem("produtos");
  if (dados) {
    produtos = JSON.parse(dados);
  } else {
    // Produtos iniciais
    produtos = [
      {
        nome: "Alface",
        preco: "R$ 2,00",
        beneficios: "Rico em fibras e vitaminas",
        receita: "Salada verde com azeite e limão",
        produtor: "João",
        imgUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80",
      },
      {
        nome: "Tomate",
        preco: "R$ 3,50",
        beneficios: "Fonte de licopeno, bom para o coração",
        receita: "Molho de tomate caseiro",
        produtor: "Maria",
        imgUrl: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=80",
      },
      {
        nome: "Cenoura",
        preco: "R$ 1,80",
        beneficios: "Rica em vitamina A, bom para a visão",
        receita: "Suco de cenoura com laranja",
        produtor: "Carlos",
        imgUrl: "https://images.unsplash.com/photo-1582515073490-dbbf82f4b525?auto=format&fit=crop&w=400&q=80",
      }
    ];
    salvarProdutosStorage();
  }
}

function salvarProdutosStorage() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function mostrarProdutosProdutor() {
  listaProdutosProdutor.html("");
  produtos.forEach((p, i) => {
    let card = createDiv();
    card.addClass("produto-card");

    let img = createImg(p.imgUrl || "", "Imagem do produto");
    img.parent(card);
    img.size(80, 80);

    let info = createDiv();
    info.addClass("produto-info");
    info.html(`
      <p><strong>Produto:</strong> ${p.nome}</p>
      <p><strong>Preço:</strong> ${p.preco}</p>
      <p><strong>Benefícios:</strong> ${p.beneficios}</p>
      <p><strong>Receita:</strong> ${p.receita}</p>
      <p><strong>Produtor:</strong> ${p.produtor}</p>
    `);
    info.parent(card);

    let btnExcluir = createButton("Excluir");
    btnExcluir.addClass("produto-excluir");
    btnExcluir.parent(card);
    btnExcluir.mousePressed(() => {
      produtos.splice(i, 1);
      salvarProdutosStorage();
      mostrarProdutosProdutor();
    });

    card.parent(listaProdutosProdutor);
  });
}

function mostrarProdutosConsumidor() {
  listaProdutosConsumidor.html("");
  produtos.forEach(p => {
    let card = createDiv();
    card.addClass("produto-card");

    let img = createImg(p.imgUrl || "", "Imagem do produto");
    img.parent(card);
    img.size(80, 80);

    let info = createDiv();
    info.addClass("produto-info");
    info.html(`
      <p><strong>Produto:</strong> ${p.nome}</p>
      <p><strong>Preço:</strong> ${p.preco}</p>
      <p><strong>Benefícios:</strong> ${p.beneficios}</p>
      <p><strong>Receita:</strong> ${p.receita}</p>
      <p><strong>Produtor:</strong> ${p.produtor}</p>
    `);
    info.parent(card);

    card.parent(listaProdutosConsumidor);
  });
}

function salvarProduto() {
  let nome = select("#input-nome").value().trim();
  let preco = select("#input-preco").value().trim();
  let beneficios = select("#input-beneficios").value().trim();
  let receita = select("#input-receita").value().trim();
  let produtor = select("#input-produtor").value().trim();
  let imgUrl = select("#input-img-url").value().trim();

  if (!nome || !preco) {
    alert("Nome e preço são obrigatórios.");
    return;
  }

  produtos.push({ nome, preco, beneficios, receita, produtor, imgUrl });
  salvarProdutosStorage();
  trocarTela("produtor");
}

function carregarMensagensSimuladas() {
  let mensagens = [
    { texto: "Olá! Em que posso ajudar?", remetente: "produtor" },
    { texto: "Gostaria de saber mais sobre o Alface.", remetente: "consumidor" },
    { texto: "Claro! É fresco e colhido hoje.", remetente: "produtor" }
  ];

  mensagens.forEach(m => adicionarMensagem(m.texto, m.remetente));
}

function adicionarMensagem(texto, remetente) {
  let div = createDiv(texto);
  div.addClass("mensagem");
  div.addClass(remetente);
  div.parent(areaChat);
  areaChat.elt.scrollTop = areaChat.elt.scrollHeight;
}

function enviarMensagem() {
  let msg = inputMensagem.value().trim();
  if (msg === "") return;
  adicionarMensagem(msg, "consumidor");
  inputMensagem.value("");
  // Simular resposta
  setTimeout(() => {
    adicionarMensagem("Obrigado pela mensagem! Direcionaremos a mensagem para o produtor responsável, logo responderemos.", "produtor");
  }, 1000);
}

function atualizarInterface() {
  // Controla visual das telas - já feito no trocarTela()
}
