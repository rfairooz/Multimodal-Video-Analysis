![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23323330.svg?style=for-the-badge&logo=typescript&logoColor=%23F7DF1E)
![Google Gemini](https://img.shields.io/badge/gemini-%23c4b1d8.svg?style=for-the-badge&logo=googlegemini&logoColor=%235c89e1)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
<br/>
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

## ClipMind - A Multimodal Video Analysis Web App

Clone the repo, install node and node packages, run the development server:

```bash
git clone "url"
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### First Approach

1. Pipeline: offloading all video processing and conversational RAG on gemini (model: 2.0 flash)
   <img width="943" alt="image" src="https://github.com/user-attachments/assets/fb21a186-8eea-450a-bbbb-ff36ade8df2c" />

2. Resources Used

- Followed [Google Gemini's docs](https://ai.google.dev/gemini-api/docs/video-understanding) specifically this project [Video-to-Learning App](https://aistudio.google.com/u/1/apps/bundled/video-to-learning-app?showPreview=true). Used their youtube link parser to validate user link and set up a preview.
- To locally persist chat history in session without reuploading the video, referred to: [Docs](https://ai.google.dev/api/generate-content) [Forum](https://discuss.ai.google.dev/t/what-is-the-best-way-to-persist-chat-history-into-file/3804/7)

### Demo

### What's Next?
