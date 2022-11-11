import "../styles/globals.css"
import "../styles/nprogress.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/700.css"

import { AnimatedLogo } from "ui/base/AnimatedLogo"
import { AuthProvider } from "@ctx/auth/AuthProvider"
const BackToTopButton = dynamic(
    () =>
        import("@components/BackToTopButton").then(
            (mod) => mod.BackToTopButton,
        ),
    {
        ssr: false,
    },
)
import { GAScripts } from "common/analytics/GAScripts"
import { Hydrate, QueryClientProvider } from "react-query"
import { KBarProvider } from "kbar"
import { Layout } from "@components/layout/Layout"
import { PageLoader } from "ui/base/PageLoader"
import { SEO } from "@components/SEO"
import { Searchbox } from "@components/search/Searchbox"
import { SideNavProvider } from "@ctx/SideNavProvider"
import { Toaster } from "react-hot-toast"
import { queryClient } from "@util/queryClient"
import Head from "next/head"
import dynamic from "next/dynamic"
import type { AppProps } from "next/app"

const App = ({
    Component,
    pageProps,
}: AppProps<{ dehydratedState: unknown }>) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" type="image/png" href="/images/favicon.png" />
            </Head>
            <SEO title="Corehalla" image="/images/og/main-og.jpg" />
            <GAScripts />
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <AuthProvider>
                        <KBarProvider actions={[]} options={{}}>
                            <SideNavProvider>
                                <PageLoader>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm">
                                            Loading...
                                        </span>
                                        <AnimatedLogo size={32} />
                                    </div>
                                </PageLoader>
                                <Toaster />
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                                <Searchbox />
                                <BackToTopButton />
                            </SideNavProvider>
                        </KBarProvider>
                    </AuthProvider>
                </Hydrate>
            </QueryClientProvider>
        </>
    )
}

export default App
