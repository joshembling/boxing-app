module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://boxing.joshembling.co.uk/:path*',
            },
        ]
    },
}
