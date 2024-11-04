import { useEffect, useState } from 'react';
import { initiateLogin, checkQRResult } from '@/hooks/auth';

export default function LoginPage() {
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    const fetchQRCode = async () => {
      const result = await initiateLogin();
      setQrCode(result.text); 
    };

    fetchQRCode();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {qrCode ? <img src={`data:image/png;base64,${qrCode}`} alt="Login QR Code" /> : <p>Loading QR Code...</p>}
    </div>
  );
}
