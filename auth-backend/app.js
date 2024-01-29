// server/app.js
const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const userRoutes = require('./routes/userRoutes')

const app = express();
// const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.post('/Users/signup', (req, res) => {
//   // Your signup logic here
//   res.send('Signup successful');
// });

app.use('/users', userRoutes);
require('./connection');

const server = require('http').createServer(app);
const PORT = 3001;
server,{
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST']
    }
};

app.post('/generate-letter', async (req, res) => {
  const { userInputs } = req.body;

  try {
    // Load the fixed template
    const templatePath = path.join(__dirname, 'templates', 'letter_template.ejs');
    const letterHTML = await renderTemplate(templatePath, userInputs);

    // Generate PDF using Puppeteer
    const pdfBuffer = await generatePDF(letterHTML);

    // Return the generated PDF
    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating letter:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function renderTemplate(templatePath, userInputs) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, userInputs, (err, str) => {
      if (err) {
        console.error('Error rendering EJS template:', err);
        reject(err);
      } else {
        resolve(str);
      }
    });
  });
}

async function generatePDF(htmlContent) { //This function generates the pdf for the letter
  const browser = await puppeteer.launch();// waits for puppeteer to lunch
  const page = await browser.newPage(); // waits for the browser to open a new page

  await page.setContent(htmlContent); // waits for the page to be fully loaded
  const pdfBuffer = await page.pdf(); // 

  await browser.close();

  return pdfBuffer;
}

app.listen(PORT, () => {
  console.log("listening to port", PORT)
});
