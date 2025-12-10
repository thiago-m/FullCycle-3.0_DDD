export default {
    transformIgnorePatterns: [
        "node_modules/(?!uuid)"
    ],
    clearMocks: true,
    coverageProvider: "v8",
    transform: {
        "^.+\.(t|j)sx?$": ["@swc/jest"],
    }
}