import fs from 'fs';

const root = 'D:/Tasks/October/Thomas-ultimatepetanque/Ultimate-Petanque';
const langButtons = `      <div class="lang-switch" role="group" aria-label="Language">
        <button type="button" data-lang="fr" class="active">FR</button>
        <button type="button" data-lang="en">EN</button>
        <button type="button" data-lang="es">ES</button>
        <button type="button" data-lang="de">DE</button>
        <button type="button" data-lang="th">TH</button>
        <button type="button" data-lang="ar">AR</button>
        <button type="button" data-lang="it">IT</button>
        <button type="button" data-lang="nl">NL</button>
      </div>`;

const oldButtons = `      <div class="lang-switch">
        <button type="button" data-lang="fr" class="active" onclick="setLang('fr')">FR</button>
        <button type="button" data-lang="en" onclick="setLang('en')">EN</button>
      </div>`;

const styleBlock = `  <style>
    body { margin: 0; font-family: system-ui, sans-serif; background: #F8FAFC; color: #0F172A; }
    body.lang-fr [lang="en"], body.lang-en [lang="fr"] { display: none !important; }
  </style>
`;

function patchShared(html) {
  html = html.replace(/\r\n/g, '\n');
  if (!html.includes(oldButtons)) throw new Error('lang switch not found');
  html = html.replace(styleBlock, '');
  html = html.replace(oldButtons, langButtons);
  html = html.replaceAll('ultimate.petanque.app@gmail.com', 'thomas@ultimatepetanque.app');
  html = html.replace(
    '  <script src="js/site.js"></script>',
    '  <script src="js/dict.js"></script>\n  <script src="js/site.js"></script>\n  <script src="js/analytics.js"></script>'
  );
  return html;
}

const privacyLaw = `
    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(37,99,235,0.1)">⚖️</div>
        <div class="section-title" lang="fr">Loi applicable et autorités</div>
        <div class="section-title" lang="en">Applicable law and authorities</div>
      </div>
      <div class="section-content" lang="fr">Ultimate Petanque est édité depuis le Québec (Canada). Cette politique est régie par la Loi sur la protection des renseignements personnels dans le secteur privé du Québec, telle que modifiée par la Loi 25, et par la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) du Canada. Si notre réponse ne vous satisfait pas, vous pouvez saisir la Commission d'accès à l'information du Québec (cai.gouv.qc.ca) ou le Commissariat à la protection de la vie privée du Canada (priv.gc.ca). Si vous résidez dans l'Union européenne, l'Espace économique européen, la Suisse ou le Royaume-Uni, vous conservez les droits que vous accorde le RGPD (ou son équivalent britannique) et vous pouvez saisir l'autorité de protection des données de votre pays : vos données sont transférées et conservées au Canada, que la Commission européenne reconnaît comme offrant un niveau de protection adéquat pour les organisations commerciales.</div>
      <div class="section-content" lang="en">Ultimate Petanque is published from Quebec, Canada. This policy is governed by Quebec's Act respecting the protection of personal information in the private sector, as amended by Law 25, and by Canada's Personal Information Protection and Electronic Documents Act (PIPEDA). If our answer does not satisfy you, you may contact the Commission d'accès à l'information du Québec (cai.gouv.qc.ca) or the Office of the Privacy Commissioner of Canada (priv.gc.ca). If you live in the European Union, the European Economic Area, Switzerland or the United Kingdom, you keep the rights the GDPR (or its UK equivalent) gives you and may contact your national data protection authority: your data is transferred to and stored in Canada, which the European Commission recognises as providing an adequate level of protection for commercial organisations.</div>
    </div>
`;

const privacyNew = `
    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(22,163,74,0.1)">📍</div>
        <div class="section-title" lang="fr">Géolocalisation GPS et proximité</div>
        <div class="section-title" lang="en">GPS geolocation and proximity</div>
      </div>
      <div class="section-content" lang="fr">À l'ouverture, votre position peut être comparée à la ville du profil pour proposer une mise à jour après un déplacement de plus de 50 km, ou si la ville enregistrée est une province ou un État alors que le GPS indique une autre ville. Rien n'est enregistré sans votre accord. Le GPS sert à chercher des équipiers proches, aux alertes de terrain actif (rayon de 1 à 300 km, choisi par vous, calculé sur le téléphone) et aux filtres de distance de l'accueil (5 à 300 km). Si vous activez l'alerte push de terrain actif, l'application envoie une position approximative (arrondie à environ 1 km) et votre langue, à chaque ouverture et toutes les 5 minutes tant qu'elle est ouverte. Vous pouvez refuser la géolocalisation dans les réglages du téléphone.</div>
      <div class="section-content" lang="en">On open, your position can be compared with the profile city to offer an update after a move of more than 50 km, or when the saved city is a province or state while GPS names another city. Nothing is saved without your agreement. GPS is used to find nearby teammates, for active-court alerts (a radius of 1 to 300 km, chosen by you, calculated on the phone) and for the home distance filters (5 to 300 km). If you turn on the active-court push alert, the app sends an approximate position (rounded to about 1 km) and your language, on each open and every 5 minutes while it stays open. You can refuse geolocation in the phone settings.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(124,58,237,0.1)">⚖️</div>
        <div class="section-title" lang="fr">Langue de l'arbitre IA</div>
        <div class="section-title" lang="en">AI Referee language</div>
      </div>
      <div class="section-content" lang="fr">La question posée à l'arbitre IA et la langue choisie sont envoyées au modèle pour produire la réponse. La question n'est pas conservée : seul un compteur quotidien par compte est enregistré. Le règlement officiel de la FIPJP n'existe qu'en français et en anglais. Pour les six autres langues, la réponse est une traduction de ce texte anglais, avec les mêmes numéros d'articles, et n'ajoute aucune règle.</div>
      <div class="section-content" lang="en">The question asked of the AI Referee and the chosen language are sent to the model to produce the answer. The question is not kept: only a daily counter per account is stored. The official FIPJP rules exist only in French and English. For the other six languages, the answer is a translation of that English text, with the same article numbers, and it adds no rule.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(15,118,110,0.1)">🌐</div>
        <div class="section-title" lang="fr">Langues de l'interface</div>
        <div class="section-title" lang="en">Interface languages</div>
      </div>
      <div class="section-content" lang="fr">L'application propose le français, l'anglais, l'espagnol, l'allemand, le thaï, l'arabe, l'italien et le néerlandais. Afficher un libellé traduit n'envoie ni n'enregistre aucune donnée personnelle nouvelle. La langue choisie reste sur l'appareil. Choisir l'italien ou le néerlandais enregistre le même code de langue que les autres langues. Une phrase plus longue qui n'est pas encore traduite reste en anglais.</div>
      <div class="section-content" lang="en">The app offers French, English, Spanish, German, Thai, Arabic, Italian and Dutch. Showing a translated label does not send or store any new personal data. The language you picked stays on the device. Choosing Italian or Dutch stores the same language code as the other languages. A longer sentence that is not translated yet stays in English.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(37,99,235,0.1)">🔗</div>
        <div class="section-title" lang="fr">Expiration et révocation des partages</div>
        <div class="section-title" lang="en">Share expiry and revocation</div>
      </div>
      <div class="section-content" lang="fr">Les demandes de partage expirent automatiquement après 7 jours. Le destinataire reçoit un rappel après 24 h puis 72 h. Sans réponse, la demande est refusée et l'expéditeur peut la renvoyer (3 renvois maximum). Lors de la révocation d'un partage accepté, les statistiques et l'ELO synchronisés chez le destinataire sont annulés. Le destinataire perd immédiatement l'accès au match partagé. Aucune donnée personnelle supplémentaire n'est collectée pour cette fonction.</div>
      <div class="section-content" lang="en">Share requests expire automatically after 7 days. The recipient gets a reminder after 24 h and again after 72 h. With no answer, the request is declined and the sender may resend it (3 resends at most). When an accepted share is revoked, the stats and ELO synced to the recipient are cancelled. The recipient immediately loses access to the shared match. No additional personal data is collected for this feature.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(14,165,233,0.1)">📷</div>
        <div class="section-title" lang="fr">Appareil photo et photos</div>
        <div class="section-title" lang="en">Camera and photos</div>
      </div>
      <div class="section-content" lang="fr">Quand vous touchez « Prendre une photo » (profil, joueur, terrain, club, carte de fédération ou de club, lot de boules, affiche de tournoi), l'application ouvre l'appareil photo du téléphone. L'autorisation peut être retirée dans les réglages. Rien ne quitte le téléphone tant que vous n'avez pas validé la photo. Elle est alors envoyée dans votre espace de stockage et supprimée avec l'élément concerné ou avec votre compte.</div>
      <div class="section-content" lang="en">When you tap "Take a photo" (profile, player, court, club, federation or club card, boules set, tournament poster), the app opens the phone camera. The permission can be withdrawn in the phone settings. Nothing leaves the phone until you confirm the photo. It is then sent to your storage and deleted with the related item or with your account.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(147,51,234,0.1)">🏁</div>
        <div class="section-title" lang="fr">Saisons ELO</div>
        <div class="section-title" lang="en">ELO seasons</div>
      </div>
      <div class="section-content" lang="fr">Chaque année civile est une saison ELO. En fin de saison, nous archivons pour chaque joueur l'ELO final, l'ELO pic, le rang final, les ELO par rôle (tireur, pointeur, milieu), le nombre de matchs et de victoires. Ces archives alimentent le palmarès et les récompenses ELO, et peuvent apparaître dans les classements publics si le profil est public. L'ELO (global et par rôle) est ensuite compressé de 25 % vers 1000 pour la saison suivante. Cette compression s'applique à tous les joueurs de la même façon. Les archives restent tant que le compte existe.</div>
      <div class="section-content" lang="en">Each calendar year is an ELO season. At season end we archive, for each player, the final ELO, the peak ELO, the final rank, the ELO per role (shooter, pointer, middle), and the match and win counts. These archives feed the record and the ELO awards, and can appear in public rankings if the profile is public. ELO (global and per role) is then compressed 25% towards 1000 for the next season. This compression applies to every player in the same way. Archives stay as long as the account exists.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(180,83,9,0.1)">⏱️</div>
        <div class="section-title" lang="fr">Heure de tournoi dans À venir</div>
        <div class="section-title" lang="en">Tournament hour in Upcoming</div>
      </div>
      <div class="section-content" lang="fr">La section À venir lit l'heure de début déjà enregistrée avec le tournoi pour l'afficher, puis retire la carte une fois cette heure passée. Aucune heure supplémentaire n'est enregistrée.</div>
      <div class="section-content" lang="en">The Upcoming section reads the start hour already stored with the tournament in order to display it, then removes the card once that hour has passed. No extra time is stored.</div>
    </div>
`;

const oldAdsFr = `L'application affiche des bannières publicitaires et des interstitiels via Google AdMob. Les publicités sont supprimées pour les utilisateurs Premium (achat in-app ou code promo). Aucune donnée personnelle n'est partagée avec les réseaux publicitaires au-delà des identifiants publicitaires standards de l'appareil.`;
const newAdsFr = `L'application affiche des bannières publicitaires et des interstitiels via Google AdMob. Un partenaire Or actif peut remplacer la bannière AdMob par sa propre bannière « Sponsor Or ». S'il n'y a ni partenaire Or ni publicité disponible, l'emplacement se replie sans bandeau vide. Une bannière chargée occupe uniquement son emplacement. Les publicités sont supprimées pour les utilisateurs Premium (achat in-app ou code promo). Aucune donnée personnelle n'est partagée avec les réseaux publicitaires au-delà des identifiants publicitaires standards de l'appareil.`;
const oldAdsEn = `The app displays banner ads and interstitials via Google AdMob. Ads are removed for Premium users (in-app purchase or promo code). No personal data is shared with advertising networks beyond the device standard advertising identifiers.`;
const newAdsEn = `The app displays banner ads and interstitials via Google AdMob. An active Gold partner may replace the AdMob banner with their own "Gold Sponsor" banner. If there is neither a Gold partner nor an available ad, the slot collapses with no empty strip. A loaded banner occupies only its slot. Ads are removed for Premium users (in-app purchase or promo code). No personal data is shared with advertising networks beyond the device standard advertising identifiers.`;

let privacy = fs.readFileSync(root + '/privacy-policy.html', 'utf8');
privacy = patchShared(privacy);
privacy = privacy.replace('<body class="lang-fr" data-page="privacy">', '<body class="lang-fr" data-page="privacy" data-title-fr="Politique de confidentialité — Ultimate Petanque" data-title-en="Privacy Policy — Ultimate Petanque">');
privacy = privacy.replace('Date d\'entrée en vigueur : 2026-03-20', 'Date d\'entrée en vigueur : 2026-11-06');
privacy = privacy.replace('Effective date: 2026-03-20', 'Effective date: 2026-11-06');
privacy = privacy.replace('Mise à jour : mai 2026', 'Mise à jour : novembre 2026');
privacy = privacy.replace('Updated: May 2026', 'Updated: November 2026');
if (!privacy.includes(oldAdsFr)) throw new Error('ads fr missing');
privacy = privacy.replace(oldAdsFr, newAdsFr);
privacy = privacy.replace(oldAdsEn, newAdsEn);
const introEnd = privacy.indexOf('<!-- Data Collected -->');
if (introEnd < 0) throw new Error('intro marker missing');
privacy = privacy.slice(0, introEnd) + privacyLaw + '\n    ' + privacy.slice(introEnd);
const changesMark = privacy.indexOf('<!-- Changes -->');
if (changesMark < 0) throw new Error('changes marker missing');
privacy = privacy.slice(0, changesMark) + privacyNew + '\n    ' + privacy.slice(changesMark);
fs.writeFileSync(root + '/privacy-policy.html', privacy);

const termsLawFr = `Ces conditions sont régies par les lois de la province de Québec et par les lois fédérales du Canada qui y sont applicables, sans égard aux règles de conflit de lois. Tout litige relatif à l'application relève de la compétence exclusive des tribunaux du district judiciaire de Montréal (Québec, Canada). Si vous utilisez l'application en tant que consommateur résidant ailleurs, cette clause ne vous prive pas des droits impératifs que la loi de votre pays de résidence vous accorde.`;
const termsLawEn = `These terms are governed by the laws of the Province of Quebec and the federal laws of Canada applicable therein, without regard to conflict-of-law rules. Any dispute relating to the app falls under the exclusive jurisdiction of the courts of the judicial district of Montreal (Quebec, Canada). If you use the app as a consumer residing elsewhere, this clause does not deprive you of the mandatory rights granted to you by the law of your country of residence.`;

const consumer = `
    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(16,185,129,0.1)">🛒</div>
        <div class="section-title" lang="fr">Droits du consommateur</div>
        <div class="section-title" lang="en">Consumer rights</div>
      </div>
      <div class="section-content" lang="fr">Au Québec, la Loi sur la protection du consommateur s'applique aux achats effectués dans l'application. Les achats intégrés sont traités par Google Play ou l'App Store d'Apple : les remboursements suivent la politique de la boutique utilisée. Rien dans ces conditions ne limite les garanties légales prévues par cette loi.</div>
      <div class="section-content" lang="en">In Quebec, the Consumer Protection Act applies to purchases made in the app. In-app purchases are processed by Google Play or the Apple App Store: refunds follow the policy of the store used. Nothing in these terms limits the legal warranties provided by that Act.</div>
    </div>
`;

const termsNew = `
    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(147,51,234,0.1)">🏁</div>
        <div class="section-title" lang="fr">Parcours terminé</div>
        <div class="section-title" lang="en">Ended journey</div>
      </div>
      <div class="section-content" lang="fr">Quand vous enregistrez votre classement final, Mon parcours affiche ce résultat (Champion, Finaliste, 3e place ou Parcours terminé) à la place de « En attente ». Le bouton flottant « Nouveau match » disparaît pour ne plus recouvrir la barre de phases. Vous pouvez rouvrir ce classement avec « Modifier mon classement ». Le tournoi lui-même reste ouvert pour les autres joueurs.</div>
      <div class="section-content" lang="en">When you save your final place, My Journey shows that result (Champion, Finalist, 3rd place or Journey ended) instead of "Waiting". The floating "New match" button goes away so it no longer covers the phase bar. You can reopen that place with "Edit my ranking". The tournament itself stays open for the other players.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(245,158,11,0.1)">🏆</div>
        <div class="section-title" lang="fr">Filtre de classement</div>
        <div class="section-title" lang="en">Ranking filter</div>
      </div>
      <div class="section-content" lang="fr">Dans Mon palmarès, le filtre Classement est placé au-dessus du filtre Compétition. « Podium uniquement » en est le premier choix. Les places 1er, 2e, 3e, demi-finale, quart de finale, 1/8 de finale et éliminé en poules n'y apparaissent que si vous les avez enregistrées. Choisir une place ne modifie aucun résultat.</div>
      <div class="section-content" lang="en">In My Achievements, the Ranking filter sits above the Competition filter. "Podium only" is its first choice. The places 1st, 2nd, 3rd, semi-final, quarter-final, round of 16 and eliminated in groups appear there only after you have saved them. Choosing a place does not change any result.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(15,118,110,0.1)">🌐</div>
        <div class="section-title" lang="fr">Libellés traduits</div>
        <div class="section-title" lang="en">Translated labels</div>
      </div>
      <div class="section-content" lang="fr">Les boutons, les rangs et les libellés courts s'affichent en espagnol, allemand, thaï, arabe, italien et néerlandais. Une phrase plus longue qui n'est pas encore traduite reste en anglais. Aucune donnée nouvelle n'est enregistrée.</div>
      <div class="section-content" lang="en">Buttons, ranks and short labels are shown in Spanish, German, Thai, Arabic, Italian and Dutch. A longer sentence that is not translated yet stays in English. No new data is stored.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(124,58,237,0.1)">⚖️</div>
        <div class="section-title" lang="fr">Langue de l'arbitre IA</div>
        <div class="section-title" lang="en">AI Referee language</div>
      </div>
      <div class="section-content" lang="fr">L'arbitre IA répond dans la langue choisie dans l'application : français, anglais, espagnol, allemand, thaï, arabe, italien ou néerlandais. Le règlement officiel de la FIPJP n'existe qu'en français et en anglais. Pour les six autres langues, la réponse est une traduction de ce texte anglais, avec les mêmes numéros d'articles, et n'ajoute aucune règle.</div>
      <div class="section-content" lang="en">The AI Referee answers in the language chosen in the app: French, English, Spanish, German, Thai, Arabic, Italian or Dutch. The official FIPJP rules exist only in French and English. For the other six languages, the answer is a translation of that English text, with the same article numbers, and it adds no rule.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(180,83,9,0.1)">⏱️</div>
        <div class="section-title" lang="fr">Tournois dans À venir</div>
        <div class="section-title" lang="en">Tournaments in Upcoming</div>
      </div>
      <div class="section-content" lang="fr">La section À venir de l'accueil affiche l'heure de début enregistrée pour le premier jour du tournoi. Elle ne reprend pas l'heure fictive de midi portée par la date. Une fois cette heure passée, le tournoi n'y figure plus : il est En cours. Aucune donnée nouvelle n'est enregistrée.</div>
      <div class="section-content" lang="en">The Upcoming section on Home shows the start hour saved for the tournament's first day. It does not use the placeholder noon carried by the date. Once that hour has passed, the tournament is no longer listed there: it is In progress. No new data is stored.</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon" style="background:rgba(147,51,234,0.1)">🏁</div>
        <div class="section-title" lang="fr">Saisons ELO et fin de saison</div>
        <div class="section-title" lang="en">ELO seasons and season end</div>
      </div>
      <div class="section-content" lang="fr">Chaque année civile constitue une saison ELO. À la fin d'une saison, votre ELO final, votre pic, votre rang et vos ELO par rôle sont archivés, puis votre ELO (global et par rôle) est compressé de 25 % vers 1000 pour la saison suivante. Cette compression fait partie du fonctionnement du classement : elle n'est ni une sanction ni une perte de points à contester, et elle s'applique à tous les joueurs de la même façon. Les archives de saison sont conservées tant que votre compte existe.</div>
      <div class="section-content" lang="en">Each calendar year is an ELO season. At the end of a season your final ELO, peak, rank and role ELOs are archived, then your ELO (global and per role) is compressed 25% towards 1000 for the next season. This compression is part of how the ranking works: it is neither a penalty nor a loss of points to contest, and it applies to all players in the same way. Season archives are kept as long as your account exists.</div>
    </div>
`;

let terms = fs.readFileSync(root + '/terms-of-service.html', 'utf8');
terms = patchShared(terms);
terms = terms.replace('<body class="lang-fr" data-page="terms">', '<body class="lang-fr" data-page="terms" data-title-fr="Conditions Générales d\'Utilisation — Ultimate Petanque" data-title-en="Terms of Use — Ultimate Petanque">');
terms = terms.replace('Date d\'entrée en vigueur : 2026-03-20', 'Date d\'entrée en vigueur : 2026-11-06');
terms = terms.replace('Effective date: 2026-03-20', 'Effective date: 2026-11-06');
terms = terms.replace('Mise à jour : mai 2026', 'Mise à jour : novembre 2026');
terms = terms.replace('Updated: May 2026', 'Updated: November 2026');
if (!terms.includes('Ces conditions sont régies par le droit français.')) throw new Error('french law missing');
terms = terms.replace('Ces conditions sont régies par le droit français.', termsLawFr);
terms = terms.replace('These terms are governed by French law.', termsLawEn);
const publicItems = terms.indexOf('<!-- Public Items -->');
if (publicItems < 0) throw new Error('public items missing');
terms = terms.slice(0, publicItems) + consumer + '\n    ' + terms.slice(publicItems);
const contact = terms.indexOf('<!-- Contact -->');
if (contact < 0) throw new Error('contact missing');
terms = terms.slice(0, contact) + termsNew + '\n    ' + terms.slice(contact);
const oldPremium = `Les utilisateurs peuvent supprimer les publicités via un achat intégré unique (8,99 $CAD) sur Google Play ou Apple App Store, ou en utilisant un code promo valide. Le statut Premium est lié au compte utilisateur et synchronisé sur tous les appareils.`;
const newPremium = `Les utilisateurs peuvent supprimer les publicités via un achat intégré unique (8,99 $CAD) sur Google Play ou Apple App Store, ou en utilisant un code promo valide. Sans Premium, un partenaire Or actif peut remplacer AdMob par sa bannière sponsor. Le statut Premium est lié au compte utilisateur et synchronisé sur tous les appareils.`;
if (!terms.includes(oldPremium)) throw new Error('premium fr missing');
terms = terms.replace(oldPremium, newPremium);
fs.writeFileSync(root + '/terms-of-service.html', terms);
console.log('patched');
