import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AboutPage from './pages/AboutPage.tsx';
import WorkPage from './pages/WorkPage.tsx';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage.tsx';
import ChatAssistantPage from './pages/ChatAssistantPage.tsx';
import ChatFAB from './components/ChatFAB.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:id" element={<CaseStudyDetailPage />} />
        <Route path="/assistant" element={<ChatAssistantPage />} />
      </Routes>
      <ChatFAB />
    </BrowserRouter>
  </StrictMode>,
);
