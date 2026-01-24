# DDD - Projeto Exemplo

Este repositório contém um exemplo de aplicação organizada seguindo princípios de DDD (Domain-Driven Design).

**Este README explica como instalar dependências, construir o projeto e executar os testes localmente.**

**Pré-requisitos**
- Node.js v16+ (recomendado v18+)
- npm (vem com o Node.js)

**Instalação**
Abra um terminal na raiz do projeto e execute:

```powershell
npm install
```

Isso instalará dependências de produção e de desenvolvimento.

**Comandos úteis**
- Instalar dependências: `npm install`
- Compilar (transpilar) com SWC para `dist`: `npm run build`
- Verificar compilação TypeScript (sem gerar arquivos): `npm run tsc`
- Executar testes (faz uma verificação TypeScript antes de rodar o Jest): `npm run test`

Exemplos (PowerShell):

```powershell
# Instalar dependências
npm install

# Rodar todos os testes
npm run test

# Rodar compilação para dist
npm run build
```

**Executando um único teste**
Você pode executar um único arquivo de teste usando o Jest diretamente. Exemplo:

```powershell
npx jest src/domain/customer/entity/customer.spec.ts
```

Ou usando o script de teste do npm (passando o caminho após `--`):

```powershell
npm run test -- src/domain/customer/entity/customer.spec.ts
```

**Observações**
- O script `test` já executa `npm run tsc --noEmit` antes de chamar o `jest`, garantindo que os tipos TypeScript estejam corretos.
- Banco de dados/infraestrutura: alguns testes de repositório podem usar SQLite em memória via dependências; não é necessário configurar serviços externos para os testes incluídos.

Se quiser que eu execute os testes aqui agora, posso rodar `npm run test` e compartilhar o resultado.


## Executando dentro do Dev Container (.devcontainer)

Se o repositório já contém um diretório `.devcontainer`, você pode abrir a pasta no VS Code dentro do container (ambiente reproduzível):

- Instale a extensão Dev Containers (Remote - Containers) no VS Code se ainda não tiver.
- Abra o Command Palette e execute **Dev Containers: Reopen in Container** (ou **Remote-Containers: Reopen Folder in Container**).
- Aguarde o build do container terminar; o VS Code abrirá uma janela conectada ao container.

Dentro do terminal do container, rode os mesmos comandos do host:

```powershell
npm install
npm run test
npm run build
```

Observações:
- O container pode já instalar extensões e ferramentas definidas em `.devcontainer/devcontainer.json`.

Se quiser que eu execute os testes aqui agora, posso rodar `npm run test` e compartilhar o resultado.
