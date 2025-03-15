document.getElementById('tax-prompt-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const prompt = document.getElementById('tax-prompt').value.trim();
    if (prompt === '') return;

    fetch('http://localhost:3000/api/tax-prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            const responsesDiv = document.getElementById('responses');
            responsesDiv.innerHTML = ''; // Clear previous responses

            // Loop through the conversation history and display each question and response
            data.conversationHistory.forEach(entry => {
                responsesDiv.innerHTML += `
                    <p><strong>You:</strong> ${entry.question}</p>
                    <p><strong>Bot:</strong> ${entry.answer}</p>
                    <hr>
                `;
            });

            document.getElementById('tax-prompt').value = ''; // Clear the input field
        }
    })
    .catch(error => console.error('Error:', error));
});

function clearPrompt() {
    document.getElementById('tax-prompt').value = '';
}