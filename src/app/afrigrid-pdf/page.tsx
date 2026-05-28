export default function AfriGridPDF() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, background: '#0a0f1a' }}>
      <iframe
        src="/api/afrigrid-pdf"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="AfriGrid PDF"
      />
    </div>
  );
}
