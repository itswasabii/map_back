// src/components/AdSenseAd.js
import React, { useEffect } from 'react';

const AdSenseAd = ({ adClient, adSlot, adTest = "on" }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="adsense-ad">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-adtest={adTest}
      ></ins>
    </div>
  );
};

export default AdSenseAd;
