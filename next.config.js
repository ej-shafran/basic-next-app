module.exports = () => ({
  redirects: () => [
    {
      source: "/api",
      destination: "http://localhost:3000/api",
      permanent: true
    }
  ]
})
