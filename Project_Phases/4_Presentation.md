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
- **Docker:** Ympäristön alustava&#x20;
- **Tumma/vaalea tila:** Tallennus selaimen localStorageen

## 🏙️ Kehitysprosessi

- Vaihe 1: Käyttötapausten ja projektisuunnitelman tekeminen
- Vaihe 2: Frontendin ja backendin rakentaminen, Docker-kokeilut
- Vaihe 3: Kirjautumisen ja rekisteröitymisen toteutus Passport.js\:lla, UI\:n parantaminen
- Testaus ja dokumentointi loppuvaiheessa ennen esitystä

## 🌟 Reflektointi ja jatkokehitys

**Mikä onnistui hyvin:**

- Frontend ja backend toimivat yhteen saumattomasti
- Kirjautuminen ja teemanvaihto toimivat hyvin

**Haasteet:**

- Dockerin käyttö oli vaikeaa alussa
- Session hallinta vaati paljon testaamista

**Jatkokehitysideoita:**

- Reaaliaikainen chat WebSocketeilla
- Profiilisivun lisäys työntekijöille
- Parempi uloskirjautumisen hallinta

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

