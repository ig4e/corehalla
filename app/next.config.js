const BRAWLHALLA_WIKI_URL = "https://brawlhalla.fandom.com/wiki/Brawlhalla_Wiki"
const COREHALLA_DISCORD_URL = "https://discord.com/invite/eD248ez"
const COREHALLA_GITHUB_URL = "https://github.com/djobbo/corehalla"
const COREHALLA_TWITTER_URL = "https://twitter.com/Corehalla"

// TODO: remove this when upgrading to next@13.1+
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")([
    "bhapi",
    "ui",
    "logger",
    "common",
    "db",
    "web-parser",
    "server",
])

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // TODO: uncomment this when upgrading to next@13.1+
    // transpilePackages: [
    //     "bhapi",
    //     "ui",
    //     "logger",
    //     "common",
    //     "db",
    //     "web-parser",
    //     "server",
    // ],
    images: {
        domains: ["cdn.discordapp.com", "www.brawlhalla.com"],
    },
    async redirects() {
        return [
            {
                source: "/wiki",
                destination: BRAWLHALLA_WIKI_URL,
                permanent: true,
            },
            {
                source: "/discord",
                destination: COREHALLA_DISCORD_URL,
                permanent: true,
            },
            {
                source: "/github",
                destination: COREHALLA_GITHUB_URL,
                permanent: true,
            },
            {
                source: "/twitter",
                destination: COREHALLA_TWITTER_URL,
                permanent: true,
            },
            {
                source: "/stats/me",
                destination: "/",
                permanent: true,
            },
            {
                source: "/rankings",
                destination: "/rankings/1v1",
                permanent: true,
            },
            {
                source: "/leaderboard/:path*",
                destination: "/rankings",
                permanent: true,
            },
            {
                source: "/p/:path*",
                destination: "/stats/player/:path*",
                permanent: true,
            },
            {
                source: "/c/:path*",
                destination: "/stats/clan/:path*",
                permanent: true,
            },
        ]
    },
}

module.exports = withTM(nextConfig)
