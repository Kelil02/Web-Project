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
```
### 3. Frontend

Pyysin tekoälyä auttamaan myös käyttöliittymän animointien lisäämisessä. Animaatiot tekevät käyttöliittymästä elävämmän ja modernimman.

Rakensin yksisivuisen sovelluksen käyttämällä pelkkää HTML:ää, CSS:ää (oma dark mode -teema) ja vanilla JavaScriptiä. Käyttöliittymässä käyttäjä voi:

- Kellottaa sisään
- Lähettää poissaolopyynnön
- Tarkastella työvuoroja
- Lähettää ja lukea viestejä
- Lukea uutisvirtaa

Esimerkki lomakkeen lähetyksestä:
```js
document.getElementById('clockInForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // fetch('/api/clock-in', ...)
});
```

## 4. Tietokanta

Käytin SQLitea ja loin kolme taulua:

- `schedules`
- `leave_requests`
- `chat`

Ne alustetaan `db.js`-tiedostossa palvelimen käynnistyessä.

Esimerkki:
```js
db.run(`CREATE TABLE IF NOT EXISTS leave_requests (...);`);
```

## 5. Perusrakenne ja Arkkitehtuuri

Projektilla on selkeä kansiorakenne:

- `public/` – frontend-tiedostot (HTML, kuvat, skriptit)
- `index.js` – back-end-logiikka
- `db.js` – tietokannan määritys

Kaikki staattiset tiedostot jaetaan Expressin `express.static('public')` -kutsulla.

## 6. Toiminnallisuudet

Toteutin seuraavat ydintoiminnot:

- Kellotus (tallennetaan nimi, vuoro, päivämäärä)
- Poissaolopyyntöjen lähetys ja lomakkeen validointi
- Työvuorojen tarkastelu
- Chat (viestin lähetys ja aikaleiman näyttö)
- Uutisvirta (staattinen sisältö)

Kaikki lomakkeet käyttävät `fetch()`-funktiota tiedon lähettämiseen back-endille JSON-muodossa.

## 7. Koodin Laatu ja Dokumentointi

Nimesin muuttujat selkeästi ja lisäsin kommentteja koodin ymmärtämisen tueksi. Erottelin tietokannan määrityksen ja palvelimen logiikan eri tiedostoihin. Käytin myös `console.log()`-komentoja debuggaamiseen.

## 8. Testaus ja Virheenkäsittely

Testasin kaikki toiminnot käsin lomakkeiden kautta ja tarkistin tallennukset SQLite-tietokannasta Visual Studio Coden laajennuksella. Jos lomakkeen lähetys epäonnistuu, käyttöliittymä näyttää virheilmoituksen. Virheet logitetaan myös palvelimen konsoliin.

## 9. Käyttöliittymä ja Vuorovaikutus

Loin modernin, minimalistisen ja responsiivisen käyttöliittymän dark mode -teemalla. Lisäsin ikonit, navigointilinkit ja visuaalista ilmettä nykyaikaisilta verkkosivustoilta saadun inspiraation pohjalta. Käytössä on myös modaalikomponentti, jolla voi tarkastella työvuoron tarkempia tietoja.

---
