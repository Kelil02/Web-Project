# Vaihe 3

### 1.1 dark and light mode

- Lisätty teeman vaihtopainike, jolla käyttäjä voi vaihtaa vaalean ja tumman tilan välillä.
- Käyttäjän valinta tallennetaan paikallisesti `localStorage`-muistiin.
- CSS-muuttujien käyttö helpottaa teemojen hallintaa.

### 1.2 (Kirjautuminen ja Rekisteröityminen)

- Integroitu käyttäjätunnistautuminen **Passport.js**-kirjastolla ja **passport-local** -strategialla.
- Salasanat tallennetaan turvallisesti **bcrypt**-kirjaston avulla hajautettuna.
- Kaikille pääsivuille lisätty toimivat **Kirjautuminen**- ja **Rekisteröityminen**-modaalit.
- Onnistunut kirjautuminen näyttää käyttäjänimen sivun yläreunassa (`#userNameDisplay`).
- Kirjautuminen ulos tyhjentää session ja palauttaa käyttäjän.
- Autentikoinnin tila tarkistetaan dynaamisesti `/auth/status`-rajapinnan avulla.

### 1.3 (UI) parannukset

- Kaikki HTML-sivut (`main.html`, `leave.html`, `schedule.html`, `news.html`) modernisoitiin ja yhtenäistettiin.
- Lisätty animaatioita painikkeisiin, modaaleihin ja hover-efekteihin.
- Yhtenäiset navigointipalkit kaikilla sivuilla.
- Kirjautumisen ja rekisteröitymisen modaaleihin lisätty sulkeutumisanimaatiot ja pehmeät siirtymät.

### 1.4 Istunnon jatkuvuus sivujen välillä

- Kirjautunut käyttäjä pysyy kirjautuneena siirtyessään sivulta toiselle.

### 1.5 Yleinen koodin optimointi

- Jaettiin selkeästi frontend (`script.js`) ja backend (`index.js`) toiminnot.
- Parannettu validointia ja virheenkäsittelyä käyttäjätoiminnoissa.
- Siistitty kansiorakenne ja selkeytetty tiedostojen järjestystä.

---

## 2. Päivitetty

### Backend

- **Node.js** + **Express**
- **Passport.js** autentikointiin
- **SQLite** tietokanta
- Salasanat hajautettu **bcrypt**-kirjastolla
- Istunnonhallinta **express-session**-kirjastolla

### Frontend

- **HTML**, **CSS**
- **Vanilla JavaScript** interaktiivisuuteen
- Teeman vaihto tallennetaan **localStorage**en
- Modaaleilla parannettu käyttökokemus

### Tietokantataulut

- `users`
- `schedules`
- `leave_requests`
- `chat_messages`
- `news`
- `news_reactions`

---

## 3. Testaus ja validointi

| Ominaisuus                                  | Testin tulos               |
| ------------------------------------------- | -------------------------- |
| Kirjautuminen oikeilla tiedoilla            | Onnistui                   |
| Kirjautuminen väärillä tiedoilla            | Virheilmoitus näkyy        |
| Rekisteröityminen uudella käyttäjänimellä   | Onnistui                   |
| Rekisteröityminen olemassa olevalla nimellä | Virheilmoitus              |
| Teeman vaihto (vaalea/tumma)                | Toimii ja muistaa valinnan |
| Poissaolopyynnön jättäminen (kirjautuneena) | Onnistui                   |
| Työvuorojen tarkastelu (kirjautuneena)      | Onnistui                   |
| Uutisvirran lukeminen (julkinen)            | Onnistui                   |
| Viestien lähettäminen ja vastaanotto        | Onnistui                   |
| Istunnon jatkuvuus sivuilla                 | Onnistui                   |

---

Login ja signup otettin tästä.

https://github.com/jaredhanson/passport.git

