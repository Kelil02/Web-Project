# Phase 2 - Basic Structure and Main Functionalities

## 1. Environment
Tein kehitystyön omalla paikallisella koneellani käyttäen Node.js:ää ja SQLite-tietokantaa. Käytin VS Codea koodin kirjoittamiseen ja testaamiseen. Sain apua tekoälyltä Dockerin käyttöönotossa, mutta en täysin ymmärtänyt sen toimintaa loppuun asti. Vaikka käytin Dockeria kehityksen alkuvaiheessa, päätin lopulta ajaa sovelluksen komennolla `npm start`, koska halusin välttää pysyvien tallennusvoluumien aiheuttamat ongelmat.

Tässä on kuva dockerista 

![image](https://github.com/user-attachments/assets/d9b1154a-d2c6-492c-a98d-657eedd6b7ec)

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

![image](https://github.com/user-attachments/assets/b7ae001d-7897-42e2-992d-6764785871cf)


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

Testasin kaikki toiminnot käsin lomakkeiden kautta ja tarkistin tallennukset SQLite-tietokannasta Visual Studio Coden laajennuksella. 

- Kellon sisäänkirjaus: testattu useilla nimillä ja vuoroilla.
- Poissaolopyynnön lähetys: testattu virheellisellä ja oikealla lomaketiedolla.
- Viestien lähetys chatissa: testattu useita kertoja.
- Työvuorojen tarkastelu ja modaalin toiminta: testattu mobiililla ja desktopilla.

Virheenkäsittely:
- Lomakkeiden lähetyksissä virheilmoitukset näytetään käyttöliittymässä.
- Palvelimen virheet logitetaan konsoliin (`console.error()`).
- Syötteet validoidaan ennen tallennusta (esim. tyhjiä kenttiä ei hyväksytä).

## 9. Käyttöliittymä ja Vuorovaikutus

Loin modernin, minimalistisen ja responsiivisen käyttöliittymän dark mode -teemalla. Lisäsin ikonit, navigointilinkit ja visuaalista ilmettä nykyaikaisilta verkkosivustoilta saadun inspiraation pohjalta.

---


## 10. Jatkokehitys – Vaihe 3

Vaiheessa 3 aion lisätä sovellukseen lisää ominaisuuksia kuten vaalean ja tumman tilan vaihtamisen (nyt käytössä on vain dark mode). Yritin jo tässä vaiheessa tehdä kirjautumis- ja rekisteröitymistoimintoja, mutta se osoittautui liian vaikeaksi ja olin lähellä menettää koko tietokannan kokeillessani sitä.

Haluan myös optimoida koodia ja toiminnallisuuksia paremmiksi, ja otan mielelläni sinun (opettaja) palautteen huomioon seuraavaa vaihetta varten.

---
