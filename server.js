const express = require('express');
const { execFile } = require('child_process');

const app = express();
const port = 3000;

app.get('/portfolio', (req, res) => {
    const year = req.query.year;

    if (!year) {
        return res.status(400).send('Year parameter is required');
    }

    execFile('python', ['portfolio_management.py', year], (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return res.status(500).send(`Error executing Python script: ${error.message}`);
        }

        if (stderr) {
            console.error(`Python script error: ${stderr}`);
            return res.status(500).send(`Python script error: ${stderr}`);
        }

        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
