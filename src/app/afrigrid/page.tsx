import { readFile } from 'fs/promises';

export default async function AfriGridPage() {
  let pdfBase64 = '';
  try {
    const pdfBuffer = await readFile('/home/z/my-project/download/AfriGrid-Hackathon-2026.pdf');
    pdfBase64 = pdfBuffer.toString('base64');
  } catch (e) {
    return <div style={{color:'red',padding:40}}>PDF not found</div>;
  }

  return (
    <html>
      <body style={{margin:0,padding:0,background:'#0a0f1a'}}>
        <iframe
          src={`data:application/pdf;base64,${pdfBase64}`}
          style={{width:'100vw',height:'100vh',border:'none'}}
          title="AfriGrid PDF"
        />
      </body>
    </html>
  );
}
