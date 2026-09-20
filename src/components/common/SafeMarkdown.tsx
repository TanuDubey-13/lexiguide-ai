import React from 'react';

interface SafeMarkdownProps {
  content: string;
  className?: string;
}

/**
 * Parses inline formatting (bold, italic, code, page citations) into safe React elements.
 * Never uses dangerouslySetInnerHTML.
 */
function renderInline(text: string): React.ReactNode[] {
  // Regex tokenizes:
  // 1. Bold: **text** or __text__
  // 2. Inline code: `text`
  // 3. Page citations: [Page X] or [Pages X, Y]
  // 4. Italic: *text* or _text_
  const tokenRegex = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[Page(?:s)?\s+[\d,\s-]+\]|\*[^*]+\*|_[^_]+_)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold: **text** or __text__
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-[#0B1F33]">
          {inner}
        </strong>
      );
    }

    // Inline Code: `text`
    if (part.startsWith('`') && part.endsWith('`')) {
      const inner = part.slice(1, -1);
      return (
        <code key={index} className="px-1.5 py-0.5 mx-0.5 rounded bg-[#F1EFE9] text-xs font-mono text-[#0B1F33] border border-[#E2E8F0]">
          {inner}
        </code>
      );
    }

    // Page Citations: [Page 1]
    if (part.startsWith('[Page') && part.endsWith(']')) {
      const pageStr = part.slice(1, -1);
      return (
        <span
          key={index}
          className="inline-flex items-center mx-1 px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 font-mono text-[11px] font-semibold align-baseline shadow-xs"
        >
          {pageStr}
        </span>
      );
    }

    // Italic: *text* or _text_
    if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic text-[#334E68]">
          {inner}
        </em>
      );
    }

    // Plain text
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * Safe, zero-dependency Markdown renderer for legal responses.
 * Renders paragraphs, bullet points, bold headers, and page citations
 * into authentic React components without dangerously injecting HTML.
 */
export const SafeMarkdown: React.FC<SafeMarkdownProps> = ({ content, className = '' }) => {
  if (!content) return null;

  const rawLines = content.split('\n');

  // Group lines into blocks: 'p' (paragraph), 'ul' (unordered list), 'ol' (ordered list), or 'h' (heading)
  type Block =
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    | { type: 'h'; level: number; text: string }
    | { type: 'p'; text: string };

  const blocks: Block[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let currentParagraphLines: string[] = [];

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      const text = currentParagraphLines.join(' ').trim();
      if (text) {
        blocks.push({ type: 'p', text });
      }
      currentParagraphLines = [];
    }
  };

  const flushList = () => {
    if (currentList && currentList.items.length > 0) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  for (const rawLine of rawLines) {
    const trimmed = rawLine.trim();

    // Empty line indicates block boundary
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    // Headings: #, ##, ###
    const hMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (hMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'h',
        level: hMatch[1].length,
        text: hMatch[2],
      });
      continue;
    }

    // Unordered list item: starts with *, -, or •
    const ulMatch = trimmed.match(/^[*•-]\s+(.*)$/);
    if (ulMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(ulMatch[1]);
      continue;
    }

    // Ordered list item: starts with 1., 2., etc.
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(olMatch[2]);
      continue;
    }

    // Regular text line
    flushList();
    currentParagraphLines.push(trimmed);
  }

  flushParagraph();
  flushList();

  return (
    <div className={`space-y-3 text-sm text-[#102A43] ${className}`}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'h') {
          const headingClass =
            block.level === 1
              ? 'text-base font-bold text-[#0B1F33] pt-2 pb-1 border-b border-[#E2E8F0]'
              : block.level === 2
              ? 'text-sm font-bold text-[#0B1F33] pt-1.5 pb-0.5'
              : 'text-xs font-bold uppercase tracking-wider text-[#334E68] pt-1';
          return (
            <div key={bIdx} className={headingClass}>
              {renderInline(block.text)}
            </div>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={bIdx} className="space-y-2 pl-1 my-2">
              {block.items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49A3A] mt-2 flex-shrink-0" />
                  <span className="flex-1">{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={bIdx} className="space-y-2 pl-1 my-2">
              {block.items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="font-mono text-xs font-bold text-[#C49A3A] mt-0.5 flex-shrink-0 w-4">
                    {iIdx + 1}.
                  </span>
                  <span className="flex-1">{renderInline(item)}</span>
                </li>
              ))}
            </ol>
          );
        }

        // Paragraph
        return (
          <p key={bIdx} className="leading-relaxed">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
};
