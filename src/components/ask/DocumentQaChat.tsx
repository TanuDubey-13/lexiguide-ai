import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  MessageCircle,
  FileText,
  Sparkles,
  Bookmark,
  Layers,
  Trash2,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { QAMessage, LegalDocument } from '../../types/legal';
import { askDocument } from '../../services/aiService';
import { DemoModeBadge } from '../common/DemoModeBadge';

interface DocumentQaChatProps {
  document: LegalDocument;
  initialMessages?: QAMessage[];
  prefilledQuery?: string;
}

export const DocumentQaChat: React.FC<DocumentQaChatProps> = ({
  document,
  initialMessages = [],
  prefilledQuery = '',
}) => {
  const [messages, setMessages] = useState<QAMessage[]>(initialMessages);
  const [inputText, setInputText] = useState<string>(prefilledQuery);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What happens if I terminate early?',
    'Who is responsible for repairs?',
    'When is the security deposit returned?',
    'Can the rent be increased?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (prefilledQuery) {
      setInputText(prefilledQuery);
    }
  }, [prefilledQuery]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: QAMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiMsg = await askDocument(userMsg.text, document.id);
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error asking document:', err);
      const errorMsg: QAMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Unable to retrieve answer from document. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[700px] max-h-[85vh] bg-white rounded-3xl border border-[#E2E8F0] shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-[#0B1F33] text-white px-5 py-4 border-b border-[#1E3A5F] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#1B365D] text-[#C49A3A]">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base tracking-wide">Ask your documents</h2>
              {document.isDemo && (
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-400 text-amber-950">
                  DEMO
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
              <FileText className="w-3.5 h-3.5 text-[#C49A3A]" />
              <span className="font-mono text-white/90">{document.name}</span>
              <span>•</span>
              <span>{document.pageCount} pages</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DemoModeBadge compact />
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors text-xs flex items-center gap-1"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Suggested Questions Pills */}
      <div className="px-5 py-3 bg-[#FAF9F5] border-b border-[#E2E8F0] overflow-x-auto">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold uppercase tracking-wider text-[#64748B] flex items-center gap-1 flex-shrink-0 text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-[#C49A3A]" />
            Suggested:
          </span>
          <div className="flex items-center gap-2 flex-nowrap">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white hover:bg-[#102A43] text-[#102A43] hover:text-white border border-[#CBD5E1] font-medium text-xs transition-all shadow-subtle flex-shrink-0 active:scale-95 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#FDFBF7]">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#64748B] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#102A43]/5 flex items-center justify-center text-[#102A43]">
              <Sparkles className="w-6 h-6 text-[#C49A3A]" />
            </div>
            <h3 className="text-base font-bold text-[#102A43]">
              Ask anything about "{document.name}"
            </h3>
            <p className="text-xs sm:text-sm max-w-sm">
              Inquire about notice deadlines, refund rules, repair liabilities, or early termination penalties.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {suggestedQuestions.slice(0, 2).map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#102A43] bg-white px-3 py-2 rounded-xl border border-[#CBD5E1] hover:border-[#102A43] transition-all"
                >
                  <span>{q}</span>
                  <ArrowRight className="w-3 h-3 text-[#C49A3A]" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {msg.sender === 'user' ? (
                <div className="max-w-xl bg-[#102A43] text-white p-4 rounded-2xl rounded-tr-xs shadow-subtle space-y-1">
                  <div className="text-sm font-medium">{msg.text}</div>
                  <div className="text-[10px] text-white/60 text-right">{msg.timestamp}</div>
                </div>
              ) : (
                <div className="max-w-2xl bg-white border border-[#E2E8F0] rounded-2xl rounded-tl-xs shadow-card p-5 space-y-4">
                  {/* AI Badge */}
                  <div className="flex items-center justify-between border-b border-[#F1EFE9] pb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-[#102A43] text-white">
                        <Sparkles className="w-3.5 h-3.5 text-[#C49A3A]" />
                      </div>
                      <span className="font-bold text-[#102A43]">LexiGuide AI</span>
                    </div>
                    <span className="text-[10px] text-[#94A3B8]">{msg.timestamp}</span>
                  </div>

                  {/* Plain Language Answer */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                      Answer
                    </span>
                    <p className="text-sm text-[#102A43] leading-relaxed">
                      {msg.text}
                    </p>
                  </div>

                  {/* Grounded Source Reference from uploaded demo document */}
                  {msg.sourceReference && (
                    <div className="bg-[#FAF9F5] rounded-xl p-3.5 border border-[#E2E8F0] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#102A43] flex items-center gap-1.5">
                          <Bookmark className="w-3.5 h-3.5 text-[#C49A3A]" />
                          Source reference from the uploaded demo document:
                        </span>
                        <span className="text-[11px] font-mono font-medium text-[#64748B] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                          Page {msg.sourceReference.page} • {msg.sourceReference.clauseTitle}
                        </span>
                      </div>
                      <p className="text-xs font-serif text-[#334E68] italic border-l-2 border-[#C49A3A] pl-2.5 my-1">
                        "{msg.sourceReference.textSnippet}"
                      </p>
                    </div>
                  )}

                  {/* Related Sections */}
                  {msg.relatedSections && msg.relatedSections.length > 0 && (
                    <div className="pt-2 border-t border-[#F1EFE9] flex items-center gap-2 text-xs text-[#64748B]">
                      <Layers className="w-3.5 h-3.5 text-[#102A43]" />
                      <span className="font-semibold text-[11px] uppercase tracking-wider">
                        Related sections:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.relatedSections.map((sec) => (
                          <span
                            key={sec}
                            className="bg-[#F1EFE9] text-[#102A43] px-2 py-0.5 rounded text-[11px] font-medium"
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start max-w-lg">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl rounded-tl-xs p-4 shadow-subtle flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#C49A3A] animate-spin" />
              <span className="text-xs font-medium text-[#64748B]">
                Synthesizing response and locating source references...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t border-[#E2E8F0]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about this document..."
            disabled={isLoading}
            className="flex-1 bg-[#FAF9F5] border border-[#CBD5E1] focus:border-[#102A43] text-sm text-[#102A43] placeholder-[#94A3B8] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#102A43]/15 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white text-sm font-semibold shadow-sm transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer active:scale-95"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-[#C49A3A]" />
            <span className="hidden sm:inline">Ask</span>
          </button>
        </form>
        <p className="text-[11px] text-[#94A3B8] mt-2 text-center">
          Answers are generated from the uploaded document text. Verify with a legal professional.
        </p>
      </div>
    </div>
  );
};
