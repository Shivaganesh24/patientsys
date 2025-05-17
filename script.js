document.getElementById('patientForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const age = parseInt(document.getElementById('age').value.trim());
  const symptoms = document.getElementById('symptoms').value.trim();

  if (!name || !age || !symptoms) {
    alert('❗ Please fill out all fields.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age, symptoms })
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Patient data submitted!');
      document.getElementById('patientForm').reset();
    } else {
      alert('❌ Error: ' + data.message);
    }
  } catch (error) {
    console.error('❌ Fetch error:', error);
    alert('❌ Could not submit data. Make sure the backend is running.');
  }
});
