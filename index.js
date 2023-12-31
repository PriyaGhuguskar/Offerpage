const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 8080

const app = express()
app.use(cors());
app.use(express.json());

app.use(express.static('public'));



app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log(formData);

    fetchExternalAPI(formData)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

async function fetchExternalAPI(formData) {
    try {
        const response = await fetch("https://forms.maakeetoo.com/formapi/367", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Code": "BQUH7K8YDCEQMV03XL9RHHJYD",
                credentials: 'include'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to fetch external API: ${response.statusText}`);
        }
    } catch (error) {
        throw error;
    }
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});