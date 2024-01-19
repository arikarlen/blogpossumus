import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="es">
            <Head>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
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
                <script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js" async></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
