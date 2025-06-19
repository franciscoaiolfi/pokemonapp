# Pokédex App

    Este projeto foi desenvolvido com Ionic + Angular usando a PokeAPI para listar Pokémons e exibir seus detalhes.

    Adotei o padrão de **componentes standalone**, evitando o uso de módulos tradicionais para maior modularidade.  

    Implementei a navegação entre páginas com o Angular Router e rotas dinâmicas via `/details/:name`.  

    Utilizei `Observables` nos services, seguindo a abordagem reativa do Angular com `HttpClient`.  

    Todas as respostas da API são tipadas com `interfaces` para garantir segurança e clareza no código. 

    A aplicação é construída com **estilo mobile first**, mas ajustada com `@media` queries para telas maiores.  
    
    Evitei o uso de `any` e priorizei boas práticas como separação de responsabilidades e nomes semânticos.  

    Implementei paginação manual com controle de `offset` e `limit`, e estrutura de card com imagem oficial.  

    Incluí tratamento para botão de voltar funcional mesmo em acessos diretos à rota de detalhes.  
    
    O código foi escrito com clareza, foco em legibilidade e organização por contexto (pages, models, services).



# ✅ Entregas concluídas com sucesso
    ✅ 1	Tela principal com nome e imagem do Pokémon
    ✅ 2	Layout funcional e organizado com ion-grid e ion-card
    ✅ 3	Navegação para tela de detalhes (/details/:name)
    ✅ 3.1	Tela de detalhes com +6 descrições 
    ✅ Boas práticas	Commits organizados, estrutura modular, sem uso de any
    ✅ README.md	Dentro do limite de 10 frases explicando decisões técnicas
    ✅ Paginação	Implementada via offset e limit com botões Next/Previous
    ✅ Injeção de dependência	PokemonService injetado por @Injectable()
    ✅ Responsividade	Mobile first + media queries para desktop
    ✅ Tipagem estrita	Uso de interfaces para todas as respostas da API



# 🟡 Parcialmente ou com oportunidade de melhoria
    🟡 Responsividade no desktop
    🟡 README com mídia


# ❌ Ainda falta implementar:
    ❌ Favoritos
    ❌ Testes unitários
    ❌ Documentação técnica extra
    ❌ WebHooks