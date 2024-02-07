async function fetchData() {
    try {
      const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
  
      const data = await response.json();
      console.log(data);
      // Ajoutez ici le code pour traiter les données retournées
  
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  }