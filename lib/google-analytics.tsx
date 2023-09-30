import Script from 'next/script'

const GoogleAnalytics = () => (
  <>
    <Script
      strategy="afterInteractive"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${
        process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
      }`}
    ></Script>
    <Script
      id="google-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `,
      }}
    ></Script>
  </>
)
export default GoogleAnalytics