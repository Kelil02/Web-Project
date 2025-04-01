# Phase 2 - Basic Structure and Main Functionalities

## 1. Environment
Tein kehitystyön omalla paikallisella koneellani käyttäen Node.js:ää ja SQLite-tietokantaa. Käytin VS Codea koodin kirjoittamiseen ja testaamiseen. Sain apua tekoälyltä Dockerin käyttöönotossa, mutta en täysin ymmärtänyt sen toimintaa loppuun asti. Vaikka käytin Dockeria kehityksen alkuvaiheessa, päätin lopulta ajaa sovelluksen komennolla `npm start`, koska halusin välttää pysyvien tallennusvoluumien aiheuttamat ongelmat.

## 2. Backend
Käytin Node.js:ää ja Expressiä back-end-kehykseksi. Rakensin REST API -rajapinnan seuraaville toiminnoille:

- Kellon sisään- ja uloskirjautuminen
- Poissaolopyyntöjen lähetys ja haku
- Työvuorojen katselu
- Viestien lähetys ja haku chatissa

Esimerkki:
```js
app.post('/api/clock-in', (req, res) => {
  const { employee, shift, date } = req.body;
  // tallennetaan tietokantaan
});

## 3. Frontend
*(Frontend technology.)*

## 4. Database
*(Database technology.)*

## 5. Basic Structure and Architecture
*(Description of the basic structure.)*

## 6. Functionalities
*(List of functionalities implemented.)*

## 7. Code Quality and Documentation
*(Code documentation details.)*

## 8. Testing and Error Handling
*(Testing and error handling documentation.)*

## 9. User Interface and Interaction
*(Document your UI and interactions clearly.)*
