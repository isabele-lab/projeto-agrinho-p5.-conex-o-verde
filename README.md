# projeto-agrinho-p5.-conex-o-verde
Este projeto visa conectar produtores rurais a consumidores urbanos por meio de uma plataforma interativa. Com login por perfis, produtores podem cadastrar e gerenciar alimentos com descrições, preços e imagens, além de interagir via chat. Consumidores visualizam os produtos. A interface é responsiva e usa armazenamento local.

Capítulo X – Implementação do Projeto
Introdução
Este capítulo descreve de forma detalhada a implementação do projeto, desenvolvido com a biblioteca p5.js. O objetivo da aplicação é possibilitar a interação entre produtores rurais e consumidores urbanos, promovendo o cadastro e a visualização de alimentos, bem como a comunicação entre os usuários. A estrutura do código foi organizada de forma modular, com foco na separação de funcionalidades por perfis de acesso e no uso de armazenamento local para persistência dos dados.

Desenvolvimento
1. Estrutura Geral do Código
O sistema é controlado pela variável tela, que define a interface exibida em cada momento do uso, podendo representar as telas de login, cadastro, listagem de produtos, ou chat. A variável tipoUsuario identifica se o usuário logado é produtor ou consumidor, direcionando-o para a interface correspondente. Os produtos são armazenados em um array chamado produtos, composto por objetos contendo atributos como nome, preço, benefícios à saúde, receita e imagem.

2. Inicialização: Função setup()
A função setup() é responsável por criar e configurar os elementos de interface como campos de entrada e botões, utilizando os métodos createInput() e createButton() da p5.js. Esta função também verifica a existência de dados no localStorage, recuperando os produtos cadastrados previamente. Os botões recebem funções associadas para realizar o login, salvar produtos, ou navegar entre as telas.

3. Renderização da Interface: Função draw()
A função draw() executa continuamente o desenho da interface gráfica de acordo com o valor atual da variável tela. Para cada tela, são renderizados elementos como caixas de texto, botões e seções de produtos com as respectivas informações. São utilizados comandos gráficos da biblioteca p5.js, como text(), rect(), fill() e image(), a fim de construir uma interface visualmente acessível e funcional, com estética semelhante a um aplicativo mobile.

4. Cadastro de Produtos: Função salvarProduto()
Esta função é acionada pelo botão de "Salvar", permitindo ao produtor inserir um novo alimento no sistema. Os valores fornecidos pelo usuário são coletados dos campos de entrada e armazenados como um objeto dentro do array produtos. Após a inserção, os dados são convertidos para o formato JSON e armazenados localmente através do localStorage, assegurando a persistência das informações.

5. Exclusão de Produtos: Função excluirProduto(index)
A função de exclusão permite ao produtor remover produtos específicos da lista. Ao ser acionada, ela remove o item indicado pelo índice com o método splice() e atualiza o localStorage. A interface é atualizada em seguida para refletir as alterações.

6. Exibição de Produtos: Função mostrarProdutos()
Esta função percorre o array produtos e exibe os dados de cada item na tela, incluindo imagem (ou ilustração), nome, preço, benefícios e receita. Para o produtor, também são exibidos botões de exclusão associados a cada item. O layout é organizado com elementos gráficos desenhados diretamente via p5.js, simulando uma vitrine virtual.

7. Comunicação entre Usuários: Chat Simulado
O sistema de chat é representado por um array de mensagens, onde cada mensagem é armazenada com o texto e o remetente. A interface diferencia visualmente as mensagens conforme o perfil do usuário (produtor ou consumidor). Há também uma área de entrada de texto e botão para enviar mensagens. A rolagem automática e a atualização da interface garantem uma experiência fluida de conversação simulada.

8. Navegação entre Telas
A navegação é controlada por botões como "Voltar", "Logout" e "Postar mais produtos", que alteram o valor da variável tela. A cada transição de tela, os elementos de entrada são ocultados ou exibidos seletivamente, evitando sobreposição de interfaces e mantendo o foco do usuário na funcionalidade ativa.

Conclusão

A implementação do projeto resultou em uma aplicação funcional e didática, que simula a interação entre campo e cidade por meio da troca direta entre produtores e consumidores. O uso da biblioteca p5.js permitiu o desenvolvimento de uma interface gráfica intuitiva, responsiva e visualmente amigável. A estrutura modular do código, associada ao armazenamento local, garante que os dados inseridos sejam preservados e acessíveis a cada nova execução. Dessa forma, o projeto cumpre seu propósito de ilustrar, de forma interativa, uma solução tecnológica para aproximar o produtor rural do consumidor urbano.

