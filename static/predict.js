async function getDiagnosis(event) {
    event.preventDefault();
    
    // Get symptom inputs
    const symptoms = {
        fever: document.getElementById('fever').checked ? 1 : 0,
        cough: document.getElementById('cough').checked ? 1 : 0,
        headache: document.getElementById('headache').checked ? 1 : 0,
        sore_throat: document.getElementById('sore_throat').checked ? 1 : 0,
        fatigue: document.getElementById('fatigue').checked ? 1 : 0,
        runny_nose: document.getElementById('runny_nose').checked ? 1 : 0,
        muscle_pain: document.getElementById('muscle_pain').checked ? 1 : 0
    };

    const response = await fetch('/predict', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(symptoms)
    });
    const result = await response.json();
    document.getElementById('result').textContent = `Predicted Diagnosis: ${result.diagnosis}`;
}