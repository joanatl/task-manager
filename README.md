# 📌 Task Manager

Task Manager is a project developed with the goal of helping users organize their tasks efficiently and intuitively. Built with **React + TypeScript** on the frontend, and **Node.js + Express + MongoDB** on the backend, the system uses **JWT-based authentication** and features a **responsive design with TailwindCSS**.

---

## 📂 Estrutura do Projeto

```
./
├── front-end/       # Aplicação cliente (Vite + React + TS + TailwindCSS)
│   ├── src/         # Código-fonte do frontend
│   ├── public/      # Arquivos estáticos
│   ├── vite.config.ts
│   ├── package.json
│   └── .env
│
├── back-end/        # API (Node.js + Express + MongoDB + JWT)
│   ├── src/         # Código-fonte do backend
│   ├── tsconfig.json
│   ├── package.json
│   └── .env
```

---

## 🚀 Tecnologias

### Frontend
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [TailwindCSS](https://tailwindcss.com/)  

### Backend
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/)  
- [JWT (JSON Web Token)](https://jwt.io/)  

---

## ⚙️ Pré-requisitos

- Node.js >= 18  
- MongoDB rodando localmente ou em um serviço como [MongoDB Atlas](https://www.mongodb.com/atlas)  
- Gerenciador de pacotes (npm, yarn ou pnpm)

---

## 🔧 Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/task-manager.git
cd task-manager
```

### 2. Configurar variáveis de ambiente

#### Backend (`./back-end/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=sua_chave_secreta
```

#### Frontend (`./front-end/.env`)
```env
VITE_API_URL=http://localhost:5000
```

### 3. Instalar dependências

Frontend:
```bash
cd front-end
npm install
```

Backend:
```bash
cd back-end
npm install
```

### 4. Rodar o projeto

#### Backend
```bash
cd back-end
npm run dev
```

#### Frontend
```bash
cd front-end
npm run dev
```

O frontend ficará disponível em: **http://localhost:5173**  
A API ficará em: **http://localhost:5000**

---

## 🔒 Autenticação

- O sistema utiliza **JWT** para autenticação.  
- Usuários podem se registrar e fazer login.  
- As rotas protegidas exigem envio do token no header `Authorization: Bearer <token>`.

---

## 📌 Funcionalidades

- Registro e login de usuários  
- Criação, edição e exclusão de tarefas  
- Visualização de tarefas em lista  
- Rotas protegidas com autenticação JWT  
- Design responsivo com TailwindCSS  

---

## 📜 Licença

Este projeto está sob a licença MIT.  
