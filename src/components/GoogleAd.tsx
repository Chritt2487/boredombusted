import { useEffect, useState } from 'react';

interface GoogleAdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}

const GoogleAd = ({ slot, format = 'auto', style }: GoogleAdProps) => {
  const [adError, setAdError] = useState<boolean>(false);

  useEffect(() => {
    const loadAd = async () => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log('Ad push attempted for slot:', slot);
      } catch (error) {
        console.log('Non-critical ad loading error:', error);
        setAdError(true);
      }
    };

    // Add error event listener for ad failures
    const handleError = (e: Event) => {
      if (
        e.target instanceof HTMLScriptElement && 
        e.target.src.includes('pagead2.googlesyndication.com')
      ) {
        console.log('Non-critical Google AdSense script error - this is normal in development');
        e.preventDefault();
      }
    };

    window.addEventListener('error', handleError, true);
    loadAd();

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError, true);
    };
  }, [slot]);

  if (adError) {
    return null; // Don't render anything if there's an error
  }

  return (
    <div className="google-ad-container my-4" style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...style,
        }}
        data-ad-client="ca-pub-5174694572308934"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAd;