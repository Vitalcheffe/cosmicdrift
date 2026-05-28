import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';

// This is a page that redirects to download
export default function DownloadPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0a0f1a',
      color: '#f1f5f9',
      fontFamily: 'sans-serif',
      gap: '20px'
    }}>
      <h1 style={{color: '#22c55e', fontSize: '2rem'}}>AFRIGRID PDF</h1>
      <p>Tech Hub Africa Hackathon 2026</p>
      <a 
        href="/api/afrigrid-pdf"
        download="AfriGrid-Hackathon-2026.pdf"
        style={{
          background: '#22c55e',
          color: '#000',
          padding: '15px 40px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}
      >
        📥 DOWNLOAD PDF
      </a>
      <p style={{color: '#64748b', fontSize: '0.9rem'}}>10 pages | 60 KB | PDF 1.4</p>
    </div>
  );
}
