'use client';

import React, { type ReactNode } from 'react';

/* ─── Color Palette (One Dark theme) ─── */
const C = {
  keyword: '#C678DD',
  string: '#98C379',
  comment: '#5C6370',
  fn: '#61AFEF',
  number: '#D19A66',
  operator: '#56B6C2',
  type: '#E5C07B',
  plain: '#ABB2BF',
  variable: '#E06C75',
  property: '#E06C75',
  tag: '#E06C75',
  attr: '#D19A66',
  punct: '#ABB2BF',
  bool: '#D19A66',
  builtin: '#E5C07B',
  decorator: '#E06C75',
  command: '#61AFEF',
  flag: '#D19A66',
  success: '#98C379',
  arrow: '#56B6C2',
};

/* ─── Token Types ─── */
type TokenType = 'keyword' | 'string' | 'comment' | 'fn' | 'number' | 'operator' | 'type' | 'variable' | 'property' | 'tag' | 'attr' | 'punct' | 'bool' | 'builtin' | 'decorator' | 'command' | 'flag' | 'success' | 'arrow' | 'plain';

interface Token {
  type: TokenType;
  value: string;
}

/* ─── Tokenizer Helpers ─── */
function tokenize(code: string, patterns: [RegExp, TokenType][]): Token[] {
  const tokens: Token[] = [];
  let remaining = code;

  while (remaining.length > 0) {
    let matched = false;
    for (const [regex, type] of patterns) {
      const match = regex.exec(remaining);
      if (match && match.index === 0) {
        tokens.push({ type, value: match[0] });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Append to last plain token or create new one
      if (tokens.length > 0 && tokens[tokens.length - 1].type === 'plain') {
        tokens[tokens.length - 1].value += remaining[0];
      } else {
        tokens.push({ type: 'plain', value: remaining[0] });
      }
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

/* ─── Python Highlighter ─── */
function highlightPython(code: string): Token[] {
  const patterns: [RegExp, TokenType][] = [
    // Comments
    [/#.*$/m, 'comment'],
    // Triple-quoted strings
    [/"""[\s\S]*?"""|'''[\s\S]*?'''/, 'string'],
    // f-strings and regular strings
    [/f"(?:[^"\\]|\\.)*"|f'(?:[^'\\]|\\.)*'/, 'string'],
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, 'string'],
    // Decorators
    [/@\w+/, 'decorator'],
    // Keywords
    [/\b(import|from|class|def|return|if|elif|else|for|while|try|except|finally|with|as|yield|async|await|lambda|pass|break|continue|raise|in|not|and|or|is|None|True|False|global|nonlocal|assert|del)\b/, 'keyword'],
    // Builtins
    [/\b(print|len|range|type|str|int|float|list|dict|set|tuple|open|super|isinstance|hasattr|getattr|setattr|enumerate|zip|map|filter|sorted|reversed|any|all|min|max|abs|round|input|format|property|staticmethod|classmethod)\b/, 'builtin'],
    // Bool
    [/\b(True|False|None)\b/, 'bool'],
    // Numbers
    [/\b\d+\.?\d*(?:e[+-]?\d+)?\b/, 'number'],
    // Function calls
    [/\b([a-zA-Z_]\w*)\s*(?=\()/, 'fn'],
    // Property access after dot
    [/\.(?:[a-zA-Z_]\w*)/, 'property'],
    // Operators
    [/[=+\-*/%<>!&|^~]+/, 'operator'],
    // Punctuation
    [/[()[\]{},:;]/, 'punct'],
  ];
  return tokenize(code, patterns);
}

/* ─── TypeScript Highlighter ─── */
function highlightTypeScript(code: string): Token[] {
  const patterns: [RegExp, TokenType][] = [
    // Comments
    [/\/\/.*$/m, 'comment'],
    [/\/\*[\s\S]*?\*\//, 'comment'],
    // Strings
    [/`(?:[^`\\]|\\.)*`/, 'string'],
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, 'string'],
    // Keywords
    [/\b(import|from|export|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|typeof|instanceof|in|of|class|extends|implements|interface|type|enum|async|await|yield|void|delete|keyof|readonly|declare|namespace|module|as|is|asserts)\b/, 'keyword'],
    // Types
    [/\b(string|number|boolean|any|never|unknown|null|undefined|object|void|Promise|Record|Partial|Required|Readonly|Pick|Omit|Exclude|Extract|NonNullable|ReturnType|InstanceType|Array|Map|Set)\b/, 'type'],
    // Bool
    [/\b(true|false|null|undefined)\b/, 'bool'],
    // Decorators
    [/@\w+/, 'decorator'],
    // Numbers
    [/\b\d+\.?\d*(?:e[+-]?\d+)?\b/, 'number'],
    // Function calls
    [/\b([a-zA-Z_]\w*)\s*(?=\()/, 'fn'],
    // Property access after dot
    [/\.(?:[a-zA-Z_]\w*)/, 'property'],
    // Type annotations (the colon before types)
    [/:\s*/, 'operator'],
    // Operators
    [/[=+\-*/%<>!&|^~?]+/, 'operator'],
    // Punctuation
    [/[()[\]{},;]/, 'punct'],
  ];
  return tokenize(code, patterns);
}

/* ─── Bash Highlighter ─── */
function highlightBash(code: string): Token[] {
  const patterns: [RegExp, TokenType][] = [
    // Comments
    [/#.*$/m, 'comment'],
    // Success markers
    [/✓/, 'success'],
    // Arrows/continuation
    [/→|\\$/, 'arrow'],
    // Prompt
    [/\$/, 'operator'],
    // Flags
    [/\s--?[a-zA-Z][\w-]*/, 'flag'],
    // Strings
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, 'string'],
    // Commands
    [/\b(harchos|brew|pip|npm|terraform|curl|echo|export|cd|ls|cat|mkdir|rm|cp|mv|chmod|docker|git|kubectl|helm)\b/, 'command'],
    // URLs/paths
    [/(?:https?:\/\/|\/)[\w./-]+/, 'string'],
    // Numbers
    [/\b\d+\.?\d*\b/, 'number'],
    // Key-value pairs
    [/\b[A-Z_]+=/, 'variable'],
    // Operators
    [/[=+\-*/%<>!&|^~]+/, 'operator'],
    // IDs
    [/\bwrk-[a-f0-9]+\b/, 'variable'],
  ];
  return tokenize(code, patterns);
}

/* ─── HCL Highlighter ─── */
function highlightHCL(code: string): Token[] {
  const patterns: [RegExp, TokenType][] = [
    // Comments
    [/#.*$/m, 'comment'],
    [/\/\/.*$/m, 'comment'],
    // Strings
    [/"(?:[^"\\]|\\.)*"/, 'string'],
    // Keywords
    [/\b(resource|data|provider|terraform|variable|output|locals|module|required_providers|source|version|for_each|count|lifecycle|create_before_destroy|prevent_destroy|ignore_changes|depends_on|default|description|type|value|nullable|sensitive|validation|condition|error_message)\b/, 'keyword'],
    // Bool
    [/\b(true|false|null)\b/, 'bool'],
    // Numbers
    [/\b\d+\.?\d*\b/, 'number'],
    // Block types (terraform, resource, data, etc.)
    [/\b([a-zA-Z_]\w*)\s*(?=\{)/, 'keyword'],
    // Identifiers after resource/data type
    [/"[a-zA-Z_]\w*"/, 'type'],
    // Property names
    [/\b([a-zA-Z_]\w*)\s*(?==)/, 'property'],
    // Operators
    [/[=+\-*/%<>!&|^~?:]+/, 'operator'],
    // Punctuation
    [/[()[\]{},.]/, 'punct'],
  ];
  return tokenize(code, patterns);
}

/* ─── Token to JSX ─── */
function tokensToJSX(tokens: Token[]): ReactNode[] {
  return tokens.map((token, i) => {
    const color = C[token.type] || C.plain;
    return (
      <span key={i} style={{ color }} className={token.type === 'comment' ? 'italic' : undefined}>
        {token.value}
      </span>
    );
  });
}

/* ─── Main Component ─── */
interface SyntaxHighlighterProps {
  code: string;
  language: 'python' | 'typescript' | 'bash' | 'hcl';
  className?: string;
}

export default function SyntaxHighlighter({ code, language, className }: SyntaxHighlighterProps) {
  let tokens: Token[];
  switch (language) {
    case 'python':
      tokens = highlightPython(code);
      break;
    case 'typescript':
      tokens = highlightTypeScript(code);
      break;
    case 'bash':
      tokens = highlightBash(code);
      break;
    case 'hcl':
      tokens = highlightHCL(code);
      break;
    default:
      tokens = [{ type: 'plain', value: code }];
  }

  return (
    <code className={className}>
      {tokensToJSXY(tokens)}
    </code>
  );
}

/** Inline version — returns span elements */
function tokensToJSXY(tokens: Token[]): ReactNode[] {
  return tokens.map((token, i) => {
    const color = C[token.type] || C.plain;
    return (
      <span key={i} style={{ color }} className={token.type === 'comment' ? 'italic' : undefined}>
        {token.value}
      </span>
    );
  });
}
