module.exports = {
    "presets": [
        "@babel/preset-env",
        ["@babel/preset-typescript", { jsxPragma: "h" }], // Add jsxPragma here
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-transform-react-jsx',
        {
            "runtime": "automatic",
            "importSource": "preact"
        }],
    ]

}