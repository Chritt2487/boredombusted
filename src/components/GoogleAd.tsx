import { useEffect } from 'react';

interface GoogleAdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}

const GoogleAd = ({ slot, format = 'auto', style }: GoogleAdProps) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log('Ad push attempted');
    } catch (error) {
      console.error('Error loading Google Ad:', error);
    }
  }, []);

  return (
    <div className="google-ad-container my-4" style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...style,
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAd;