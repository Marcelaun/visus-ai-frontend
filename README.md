# VisusAI - Web Client (React)

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-Design-007FFF?style=for-the-badge&logo=mui&logoColor=white)

**Link para acessar online a plataforma:** [(https://visus-ai-frontend.vercel.app/)]

Interface web moderna e responsiva para a plataforma VisusAI, focada na usabilidade para profissionais de saúde e acessibilidade para pacientes.

## 🎨 Destaques de UX/UI

* **Fluxo Duplo de Login:** Áreas distintas para Profissionais (Email/Senha) e Pacientes (CPF/Data de Nascimento).
* **Visualização de Dados:** Gráficos de barras para probabilidades de diagnóstico e galeria interativa de exames.
* **Feedback Visual:** Uso de *Skeletons* para carregamento e *Toasts* para feedback de ações (sucesso/erro), eliminando telas travadas.
* **SPA (Single Page Application):** Navegação fluida sem recarregamento de página.

## 🔧 Stack Tecnológica

* **Framework:** React.js + Vite
* **Estilização:** Material UI (MUI) + CSS Modules
* **Http Client:** Axios (Configurado com Interceptors para Tokens e tratamento de CORS)
* **Deploy:** Vercel (CI/CD automático)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar localmente
npm run dev
