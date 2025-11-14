const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/api/health', (req, res) => res.json({status: "ok"}))
app.get('/api', (req, res) => res.send("Hello from Node.js backend"))

app.listen(PORT, () => console.log(`Backend running on ${PORT}`))
