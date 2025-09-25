'use client'

import { useEffect } from 'react'
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

// Import components
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  // Universal CTA tracking function
  const trackCTAClick = (ctaName: string, ctaType: string, additionalData: Record<string, any> = {}) => {
    const eventData = {
      event_category: 'cta_click',
      event_label: ctaName,
      cta_type: ctaType,
      page_url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      timestamp: new Date().toISOString(),
      ...additionalData
    };

    // Track with Umami analytics
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track('cta-click', eventData);
    }

    // Log to console for debugging
    console.info(`CTA clicked: ${ctaName} (${ctaType})`, eventData);
  };

  useEffect(() => {
    const webhookUrl = 'https://n8n.techkanna.com/webhook/c8973ea3-9f48-4328-be57-9e095e42964e/chat'
    createChat({
      webhookUrl,
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        `Hi, I'm Senthilkannan's AI assistant, answering on his behalf. I'll speak in first person to keep things natural. I can walk you through his projects, skills, and journey as a full stack web developer. What would you like to check out first?`,
      ],
      i18n: {
        en: {
          title: 'Hi there! 👋',
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
          closeButtonTooltip: ''
        },
      },
      enableStreaming: true,
    });

    // Track n8n chat button clicks with Umami
    const trackChatButtonClick = () => {
      trackCTAClick('chat-button', 'chat-widget', {
        widget_type: 'n8n-chat'
      });
    };

    let eventListenerAttached = false;
    // Wait for n8n chat to be fully loaded and find the chat button
    const setupChatButtonTracking = () => {

      const attachEventListener = (button: HTMLElement) => {
        if (!eventListenerAttached) {
          button.addEventListener('click', trackChatButtonClick);
          eventListenerAttached = true;
          console.info('Chat button event listener attached');
        }
      };

      const findChatButton = (): HTMLElement | null => {
        // Use the specific class name for n8n chat toggle button
        const button: HTMLElement | null = document.querySelector('.chat-window-toggle');
        if (button) {
          console.info('Found n8n chat button');
          return button;
        }
        return null;
      };

      // Try to find the button immediately
      const chatButton = findChatButton();

      if (chatButton) {
        attachEventListener(chatButton);
      }
    };

    // Setup tracking after a short delay to ensure n8n chat is loaded
    setTimeout(setupChatButtonTracking, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      <Navigation trackCTAClick={trackCTAClick} />
      <Hero trackCTAClick={trackCTAClick} />
      <About />
      <Projects trackCTAClick={trackCTAClick} />
      <Skills />
      <Experience />
      <Contact trackCTAClick={trackCTAClick} />
      <Footer />
    </div>
  )
}
