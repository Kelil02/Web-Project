# Phase 4 – Projektin esittely

## 🔖 Projektin nimi

PLIVM - Yrityksen sisäinen portaali työntekijöille

## 📄 Projektin yleiskuvaus

Tämä projekti on yrityksen sisäinen työtila, jossa työntekijät voivat tarkistaa työvuorot, hakea poissaoloja, seurata yrityksen tavoitteita ja keskustella muiden kanssa chatissa. Kohderyhmänä ovat yrityksen työntekijät ja johto.

## 🔍 Käyttötapausten yhteenveto

| Käyttötapaus                        | Toteutettu (Kyllä/Ei) | Demo / Lisähuomiot                                     |
| ----------------------------------- | --------------------- | ------------------------------------------------------ |
| Työvuoron tarkistaminen             | Kyllä                 | Työvuorot näkyvät aikataulusivulla                     |
| Poissaolopyynnön jättäminen         | Kyllä                 | Lomake ja oma taulukko lähetetyille pyynnöille         |
| Viestin lähettäminen esimiehelle    | Kyllä                 | Chat-toiminto käytettävissä                            |
| Yrityksen tavoitteiden seuraaminen  | Kyllä                 | Edistymisnäyttö uutisosiosta                           |
| Kellon sisään- ja uloskirjautuminen | Osittain              | Sisäänkirjautuminen toimii, uloskirjaus yksinkertainen |

## 🛠️ Tekninen toteutus

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Tietokanta:** SQLite
- **Autentikointi:** Passport.js ja bcrypt salasanan hajautukseen
- **Docker:** Ympäristön alustava käyttö
- **Tumma/vaalea tila:** Tallennus selaimen localStorageen

## 🏙️ Kehitysprosessi

- Vaihe 1: Käyttötapausten ja projektisuunnitelman tekeminen
- Vaihe 2: Frontendin ja backendin rakentaminen, Docker-kokeilut
- Vaihe 3: Kirjautumisen ja rekisteröitymisen toteutus Passport.js:lla, UI:n parantaminen
- Testaus ja dokumentointi loppuvaiheessa ennen esitystä

## 🧠 Tärkeät lisätoiminnot ja turvallisuus

### 1. Viestien lähetys vain olemassa oleville käyttäjille
- Kun käyttäjä lähettää viestin, palvelin tarkistaa vastaanottajan nimen tietokannasta.
- Jos vastaanottajaa ei löydy `users`-taulusta, viestiä ei voi lähettää ja käyttäjälle näytetään virheilmoitus.
- Tämä estää viestien lähettämisen olemattomille käyttäjille ja pitää tiedot siistinä.

### 2. Työvuorojen ja chatin näkyvyys vain kirjautuneille käyttäjille
- `/api/schedule` ja `/api/chat` reiteillä käytetään `ensureAuthenticated`-middlewarea.
- Tämä tarkistaa, että käyttäjä on kirjautunut sisään ennen kuin tiedot palautetaan.
- Jos käyttäjä ei ole kirjautunut, palvelin palauttaa virheen (401 Unauthorized).
- Tämä varmistaa, että vain valtuutetut käyttäjät voivat nähdä ja käyttää sovelluksen ydintoimintoja.

### 3. Frontendin suojaukset
- Chatissa lähettäjän nimi (`sender`) täytetään automaattisesti kirjautuneen käyttäjän perusteella.
- Käyttäjä ei voi itse syöttää tai muuttaa omaa lähettäjänimeään lomakkeessa.

---

## 🌟 Reflektointi ja jatkokehitys

**Mikä onnistui hyvin:**

- Frontend ja backend toimivat yhteen saumattomasti.
- Kirjautuminen ja teemanvaihto toimivat hyvin.
- Käyttöoikeudet ja käyttäjätarkistukset toteutettiin ammattimaisesti.

**Haasteet:**

- Dockerin käyttö oli vaikeaa alussa.
- Session hallinta ja Passportin integrointi vaativat paljon testausta.

**Jatkokehitysideoita:**

- Reaaliaikainen chat WebSocketeilla.
- Profiilisivun lisäys työntekijöille.
- Parempi uloskirjautumisen hallinta ja ilmoitukset.

---

## 📈 Työtuntiloki

| Päivä     | Tunnit | Tehtävä                              |
| --------- | ------ | ------------------------------------ |
| 15.3.2025 | 4h     | Käyttötapausten ja suunnitelman teko |
| 16.3.2025 | 2h     | Suunnittelun jatkaminen              |
| 22.3.2025 | 1h     | Suunnitelman viimeistely             |
| 26.3.2025 | 4h     | Frontendin ja Dockerin aloitus       |
| 27.3.2025 | 3h     | Backend-kehitys                      |
| 28.3.2025 | 3h     | Frontendin valmistuminen             |
| 29.3.2025 | 2h     | Backendin jatkokehitys               |
| 1.4.2025  | 5h     | Backend valmis                       |
| 2.4.2025  | 2h     | Vaihe 2 viimeistely                  |
| 5.4.2025  | 3h     | Vaihe 2 viimeistely jatkuu           |
| 7.4.2025  | 4h     | Vaihe 2 päätös                       |
| 10.4.2025 | 3h     | UI-parannukset                       |
| 13.4.2025 | 2h     | Tumma/vaalea tila                    |
| 15.4.2025 | 4h     | Kehitystyö jatkuu                    |
| 19.4.2025 | 3h     | Optimointi ja virheenkorjaukset      |
| 22.4.2025 | 2h     | Testaus                              |
| 24.4.2025 | 2h     | Dokumentointi                        |
| 27.4.2025 | 2h     | Loppuviimeistely                     |

**Yhteensä:** 51 tuntia

video esittely 
**https://drive.google.com/file/d/1Zs_LrDiOF1jEUfeY_1yHiBQK-wMjE8dq/view?usp=sharing**
