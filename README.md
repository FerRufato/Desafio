﻿# Desafio - API de Títulos em Atraso 📄

Este projeto foi desenvolvido como parte de um desafio técnico para a vaga de Desenvolvedora .NET. A proposta consiste na construção de uma API REST em C#/.NET para o cadastro e consulta de títulos em atraso, com cálculo de multa e juros, acompanhada de uma interface web desenvolvida com Angular.

---

## 🔧 Tecnologias utilizadas

### Backend (.NET)

- ASP.NET Core 8
- C#
- REST API
- Swagger (Swashbuckle)
- Testes de Integração
- Docker
- Docker Compose

### Frontend (Angular)

- Angular 17+
- TypeScript
- Reactive Forms
- Angular Standalone Components
- HTTPClient
- Estilo simples com CSS

---

## 🚀 Como rodar o projeto

### Requisitos

- .NET 8 SDK
- Node.js + Angular CLI
- Docker

### Com Docker (Recomendado)

```bash
docker-compose up --build
```

### Manualmente

**Backend:**

```bash
cd Desafio
 dotnet run
```

Acesse o Swagger: [http://localhost:5291/swagger](http://localhost:5291/swagger)

**Frontend:**

```bash
cd frontend
npm install
ng serve
```

Acesse o frontend: [http://localhost:4200](http://localhost:4200)

---

## ✅ Funcionalidades

### Backend

- Cadastro de título com uma ou mais parcelas
- Consulta de todos os títulos com:

  - Valor original (soma das parcelas)
  - Dias em atraso por parcela
  - Multa (% sobre o total)
  - Juros proporcionais ao atraso

- Atualização de título por número
- Exclusão de título por número

### Frontend

- Formulário reativo para inclusão de título
- Listagem dos títulos cadastrados
- Exclusão de título diretamente na interface
- Validações de campos obrigatórios

---

## 📆 Exemplo de requisição `POST /api/titulos`

```json
{
  "numeroTitulo": "300105",
  "nomeDevedor": "Beatriz Figueiredo",
  "cpfDevedor": "36925814700",
  "porcentagemJuros": 1.0,
  "porcentagemMulta": 2.0,
  "parcelas": [
    {
      "numeroParcela": 1,
      "dataVencimento": "2025-01-01",
      "valor": 150.0
    },
    {
      "numeroParcela": 2,
      "dataVencimento": "2025-02-01",
      "valor": 200.0
    }
  ]
}
```

---

## 📊 Exemplo de resposta `GET /api/titulos`

```json
[
  {
    "numeroTitulo": "300105",
    "nomeDevedor": "Beatriz Figueiredo",
    "quantidadeParcelas": 2,
    "valorOriginal": 350.0,
    "diasEmAtraso": 100,
    "valorAtualizado": 358.5
  }
]
```

> Cálculo: Valor Original + Multa (2%) + Juros proporcional por dias de atraso.

---

## 📅 Estrutura do projeto

```
Desafio/
├── Controllers/
│   └── TitulosController.cs
├── Models/
│   ├── Titulo.cs
│   └── Parcela.cs
├── Services/
│   └── TituloService.cs
├── Program.cs
├── Dockerfile
├── docker-compose.yml

frontend/
├── pages/
│   ├── listar-titulos/
│   ├── incluir-titulos/
│   └── editar-titulo/
├── services/
│   └── titulo.service.ts
├── interfaces/
│   └── titulo-resumo.ts
├── app.routes.ts
├── app.config.ts
```

---

## ✨ Extras implementados

- Frontend completo com Angular
- Testes de integração no backend
- Dockerfile e docker-compose para execução local
- Boas práticas de código: separação de camadas, injeção de dependência, regras de negócio isoladas

---

## ✍️ Autora

**Fernanda Rufato**
Desenvolvedora Full Stack Java e .NET
[GitHub](https://github.com/FerRufato)

---

## 📌 Observação Final

Este projeto utiliza armazenamento **em memória** para simplificação, conforme permitido no desafio. Em produção, recomendaria-se persistência em banco de dados.

> Repositório hospedado em: [https://github.com/FerRufato/Desafio](https://github.com/FerRufato/Desafio)
