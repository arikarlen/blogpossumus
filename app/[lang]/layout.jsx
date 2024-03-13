import "../../styles/index.css";
import Header from "../../components/commons/header";
import Footer from "../../components/commons/footer/footer";

export default async function RootLayout({ children, params }) {
  return (
    <html lang={params.lang}>
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}

                            gtag('consent', 'update', {
                                'analytics_storage': 'granted'
                            });

                            gtag('js', new Date());

                            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                                page_path: window.location.pathname,
                            });
                            gtag('create', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                                'cookieDomain': 'none'
                              });
                            `,
          }}
        />
        <script
          type="text/javascript"
          src="https://widget.clutch.co/static/js/widget.js"
          async
        ></script>
      </head>
      <body>
        <main className="pt-16">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
