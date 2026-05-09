import {StrictMode, lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import ChatFAB from './components/ChatFAB.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';

import { ErrorBoundary } from './components/ErrorBoundary.tsx';

// Lazy-load all sub-pages so their heavy dependencies (Spline, etc.) 
// are only downloaded when the user actually navigates to them.
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'));
const WorkPage = lazy(() => import('./pages/WorkPage.tsx'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage.tsx'));
const ChatAssistantPage = lazy(() => import('./pages/ChatAssistantPage.tsx'));
const InsightsPage = lazy(() => import('./pages/InsightsPage.tsx'));
const InsightDetailPage = lazy(() => import('./pages/InsightDetailPage.tsx'));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-[#3A0F63] border-t-transparent rounded-full animate-spin" />
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
          <ScrollToTop />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:id" element={<CaseStudyDetailPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<InsightDetailPage />} />
              <Route path="/assistant" element={<ChatAssistantPage />} />
            </Routes>
          </Suspense>
          <ChatFAB />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);
