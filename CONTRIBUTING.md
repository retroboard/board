🎉🎊 Obrigado por dedicar um tempo para contribuir com o projeto! 🎉🎊

## Guia para mensagens de commits
Mensagens de commit ajudaram a entender de forma rápida o objetivo de determinada mudança. 

Para ajudar a seguirmos essa lógica, estamos usando algumas dicas presentes nas fontes listadas abaixo:
- [Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
- [Conventional Commits](https://github.com/conventional-commits/conventionalcommits.org/blob/master/CONTRIBUTING.md)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)

### Formato da mensagem

```<tipo> (<número da issue>): <assunto>```

Exemplo:

```packaging: update dependences versions to fix Audit vulnerabilities```


#### Tipo

* **ci:** alterações no script de configuração do CI

* **fix:** correção de um bug

* **feat:** uma nova funcionalidade ou recurso

* **reafctor:** uma alteração de código que não corrige nem adiciona uma funcionalidade 

* **style:** alterações de código como - remoção de espaço, formatação etc. que não afetam o significaod do código

* **test:** adição de testes ausentes ou corrigindo existentes

* **perf:** mudanças de código que melhoram performance

* **packaging:** para alterações que envolvam mudanças no package.json e afins


#### Número da issue

Caso o commit esteja associado a alguma issue existente o número da issue deverá ser adicionado na mensagem.

Exemplo:

```packaging (#8): update dependences versions to fix Audit vulnerabilities```

#### Assunto

O assunto contém uma descrição sucinta da alteração realizada .

* use termos no imperativo
* não utilize pontuação para finalizar o assunto
* utilize o corpo do commit para detalhas *o que* e *porque*
* mensagens de commit assim como o código do projeto devem ser escritos em inglês.

