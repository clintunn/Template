import React, { useState } from 'react';

const TemplateForm = ({ onGenerateLetter }) => { //
const [userInputs, setUserInputs] = useState({
date: '',
sender: '',
recipient: '',
subject: '',
});

const [generatedLetter, setGeneratedLetter] = useState('');

const handleInputChange = (e) => {
setUserInputs({
    ...userInputs,
    [e.target.name]: e.target.value,
});
};

const handleGenerateLetter = async () => {
try {
    // Make a POST request to the backend API
    const response = await fetch('http://localhost:3001/generate-letter', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInputs }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate letter');
    }

    // Assuming the response is a PDF blob, you can handle it accordingly
    const pdfBlob = await response.blob();

    // Do something with the generated PDF, e.g., open it in a new tab
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
    } catch (error) {
    console.error('Error generating letter:', error);
    }
// Assuming fixedTemplate is the content of your EJS template
const fixedTemplate = `
    <p>Ref: ${userInputs.date}</p>
    <p>Sender: ${userInputs.sender}</p>
    <p>Recipient: ${userInputs.recipient}</p>
    <p>Subject: ${userInputs.subject}</p>
    <!-- Add more fields based on your EJS template -->
`;

// Set the generated letter in the state
setGeneratedLetter(fixedTemplate);

// Optionally, you can pass the generated letter to a parent component or perform other actions
// onGenerateLetter(fixedTemplate);// I could use this in the sense if i wanted to send the generated letter to somewhere, lets say my database
};

return (
<div>
    <h3>Enter Details:</h3>
    {/* Input fields for Date, Sender, Recipient, and Subject */}
    {/* Each input field has an associated label and onChange event handler */}
    {/* You can add more input fields as needed for your specific template */}
    <input
    type="text"
    name="date"
    placeholder="Ref Num"
    value={userInputs.date}
    onChange={handleInputChange}
    />
    <input
    type="text"
    name="sender"
    placeholder="Sender"
    value={userInputs.sender}
    onChange={handleInputChange}
    />
    <input
    type="text"
    name="recipient"
    placeholder="Recipient"
    value={userInputs.recipient}
    onChange={handleInputChange}
    />
    <input
    type="text"
    name="subject"
    placeholder="Subject"
    value={userInputs.subject}
    onChange={handleInputChange}
    />

    {/* Button to generate the letter */}
    <button onClick={handleGenerateLetter}>Generate Letter</button>

    {/* Render the generated letter on the client side */}
    <div>
    <h3>Preview:</h3>
    {/* Display the generated letter */}
    <div dangerouslySetInnerHTML={{ __html: generatedLetter }}></div>
    </div>
</div>
);
};

export default TemplateForm;
