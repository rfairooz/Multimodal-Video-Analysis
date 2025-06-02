![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23323330.svg?style=for-the-badge&logo=typescript&logoColor=%23F7DF1E)
![Google Gemini](https://img.shields.io/badge/gemini-%23c4b1d8.svg?style=for-the-badge&logo=googlegemini&logoColor=%235c89e1)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
<br/>
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Vercel](https://img.shields.io/badge/vercel-%23323330.svg?style=for-the-badge&logo=vercel&logoColor=%23FFFFFF)

## ClipMind - A Multimodal Video Analysis Web App

### Try it out: [ClipMind](https://clip-mind-red.vercel.app/)

### Run Locally
Clone the repo, install node and node packages, run the development server:

Make sure to have .env like the following: 

```bash
GEMINI_API_KEY=`YOUR API KEY`
```

```bash
git clone `url`
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
- To hyperlink timestamps and control the video player, I parsed the stamps from model response and used a lightweight version of the [YT iFrame API](https://medium.com/@mihauco/youtube-iframe-api-without-youtube-iframe-api-f0ac5fcf7c74)

### [Demo](https://youtu.be/gKlFwMip1S8?si=_T9B80X8UFjTakDg)
<img src="https://pitch-assets-ccb95893-de3f-4266-973c-20049231b248.s3.eu-west-1.amazonaws.com/bc3f7110-8142-4c44-b171-b47aa3a2fd1c?pitch-bytes=321757&pitch-content-type=image%2Fpng" alt="Demo Screenshot" width="80%" />

### What's Next?
- Custom RAG to replace the Gemini work: user query and video embeddings, store in DB
- Try out other LLM models, compare performance
- Add auth and chat history for users
