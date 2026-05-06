// Printable-style study cheat sheets. Each: { id, title, subtitle, icon, sections[] }
// Section types: heading | paragraph | rule | table | grid | example

const CHEATSHEETS = [

// ══════════════════════════════════════════════════════════════
{
  id: "verb-tenses",
  title: "Verb Tense Endings",
  subtitle: "Past, imperfect, future, conditional — at a glance",
  icon: "⏱",
  sections: [
    { type:"heading", text:"① Past — Passato Prossimo" },
    { type:"paragraph", text:"Auxiliary (avere or essere) + past participle. The ending of the participle tells you which verb group it came from:" },
    { type:"table", headers:["Verb ends in","Participle","Example"], rows:[
      ["-ARE","-ATO","parlare → parl**ato**"],
      ["-ERE","-UTO","credere → cred**uto**"],
      ["-IRE","-ITO","dormire → dorm**ito**"],
    ]},
    { type:"example", it:"Ho parlato italiano.", en:"I spoke Italian." },
    { type:"rule", text:"Most verbs use AVERE. MOTION / CHANGE-OF-STATE verbs use ESSERE (andare, venire, tornare, partire, arrivare, nascere, morire, stare, essere, rimanere, piacere). With essere, the participle agrees: **andato** (m.) / **andata** (f.) / **andati** (m.pl.) / **andate** (f.pl.)." },

    { type:"heading", text:"② Imperfect — Imperfetto" },
    { type:"paragraph", text:"'I used to / I was ___ing.' Built from the stem + one of three ending sets:" },
    { type:"table", headers:["Group","io","tu","lui/lei","noi","voi","loro"], rows:[
      ["-ARE","-avo","-avi","-ava","-avamo","-avate","-avano"],
      ["-ERE","-evo","-evi","-eva","-evamo","-evate","-evano"],
      ["-IRE","-ivo","-ivi","-iva","-ivamo","-ivate","-ivano"],
    ]},
    { type:"example", it:"Parlavo italiano ogni giorno.", en:"I used to speak Italian every day." },
    { type:"rule", text:"**essere** is irregular: ero, eri, era, eravamo, eravate, erano." },

    { type:"heading", text:"③ Future — Futuro Semplice" },
    { type:"paragraph", text:"All three groups share the **SAME endings**. Just change the stem:" },
    { type:"table", headers:["Group","Stem","+ endings"], rows:[
      ["-ARE","parler-","ò, ai, à, emo, ete, anno"],
      ["-ERE","prender-","ò, ai, à, emo, ete, anno"],
      ["-IRE","partir-","ò, ai, à, emo, ete, anno"],
    ]},
    { type:"example", it:"Parlerò italiano in Italia.", en:"I will speak Italian in Italy." },
    { type:"rule", text:"**Memory trick:** the io form always ends in **-ò** (with accent). If you see that accent, it's future." },
    { type:"paragraph", text:"Irregular future stems (endings same, stem changes):" },
    { type:"grid", items:[
      ["essere","sar-"],["avere","avr-"],["andare","andr-"],["dovere","dovr-"],
      ["potere","potr-"],["sapere","sapr-"],["vedere","vedr-"],["vivere","vivr-"],
      ["venire","verr-"],["volere","vorr-"],["bere","berr-"],["fare","far-"],
      ["stare","star-"],["dare","dar-"],["rimanere","rimarr-"],["tenere","terr-"],
    ]},

    { type:"heading", text:"④ Conditional — Condizionale" },
    { type:"paragraph", text:"'I would ___.' Same stem as future + different endings:" },
    { type:"table", headers:["io","tu","lui/lei","noi","voi","loro"], rows:[
      ["-ei","-esti","-ebbe","-emmo","-este","-ebbero"],
    ]},
    { type:"example", it:"Vorrei un caffè, per favore.", en:"I would like a coffee, please." },
    { type:"rule", text:"**Vorrei** (I would like) is the most-used conditional form. Always polite — use it when ordering." },
  ]
},

// ══════════════════════════════════════════════════════════════
{
  id: "adjective-agreement",
  title: "Adjective Agreement",
  subtitle: "M/F × S/P — the four forms",
  icon: "🎨",
  sections: [
    { type:"paragraph", text:"Every Italian adjective must match the GENDER and NUMBER of the noun it describes. This is called **concordanza**." },

    { type:"heading", text:"Two main types" },
    { type:"table", headers:["Type","M. sing.","F. sing.","M. pl.","F. pl."], rows:[
      ["**-o / -a**  (most)","-o","-a","-i","-e"],
      ["**-e**  (in -e)","-e","-e","-i","-i"],
    ]},

    { type:"heading", text:"-o / -a examples" },
    { type:"grid", items:[
      ["alto","alta"],["alti","alte"],
      ["italiano","italiana"],["italiani","italiane"],
    ]},

    { type:"heading", text:"-e examples (2 forms only)" },
    { type:"grid", items:[
      ["grande","grandi"],["interessante","interessanti"],
      ["francese","francesi"],["felice","felici"],
    ]},

    { type:"rule", text:"**Hard C/G rule:** adjectives in -co/-ca / -go/-ga add **h** before -i/-e to keep the hard sound. → bianchi, lunghi, simpatici, stanchi." },

    { type:"heading", text:"BELLO — behaves like the article" },
    { type:"paragraph", text:"Before a noun, **bello** follows the same rules as il/lo/la:" },
    { type:"table", headers:["Like article","Bello form","Example"], rows:[
      ["il","bel","bel ragazzo"],
      ["lo / l'","bell'","bell'uomo"],
      ["la","bella","bella ragazza"],
      ["i","bei","bei libri"],
      ["gli","begli","begli amici"],
      ["le","belle","belle case"],
    ]},

    { type:"heading", text:"BUONO — shortens before singular nouns" },
    { type:"grid", items:[
      ["buon giorno","(m.s.)"],
      ["buon'amica","(f.s. before vowel)"],
      ["buona sera","(f.s.)"],
    ]},

    { type:"heading", text:"Colors that NEVER change" },
    { type:"grid", items:[
      ["blu","dark blue"],["viola","purple"],
      ["rosa","pink"],["beige","beige"],
    ]},
  ]
},

// ══════════════════════════════════════════════════════════════
{
  id: "articles-contractions",
  title: "Articles & Contractions",
  subtitle: "il/lo/la + preposition mashups",
  icon: "🧩",
  sections: [
    { type:"heading", text:"Definite articles — 'the'" },
    { type:"table", headers:["","Masculine","Feminine"], rows:[
      ["Singular","**il** ragazzo / **lo** studente / **l'** amico","**la** ragazza / **l'** amica"],
      ["Plural","**i** ragazzi / **gli** studenti / **gli** amici","**le** ragazze / **le** amiche"],
    ]},
    { type:"rule", text:"**lo / gli** before: s+consonant (studente, sport), z (zio), gn, ps, y.  **il / i** before most other consonants.  **l' / gli** / **l' / le** before vowels." },

    { type:"heading", text:"Indefinite articles — 'a/an'" },
    { type:"grid", items:[
      ["un ragazzo","(m. normal)"],
      ["uno studente","(m. before s+cons/z)"],
      ["una ragazza","(f.)"],
      ["un'amica","(f. before vowel)"],
    ]},

    { type:"heading", text:"Preposition contractions" },
    { type:"paragraph", text:"DI + article = partitive ('some'). The others = contracted prepositions." },
    { type:"table", headers:["prep +","il","lo","l'","la","i","gli","le"], rows:[
      ["di","del","dello","dell'","della","dei","degli","delle"],
      ["a","al","allo","all'","alla","ai","agli","alle"],
      ["da","dal","dallo","dall'","dalla","dai","dagli","dalle"],
      ["in","nel","nello","nell'","nella","nei","negli","nelle"],
      ["su","sul","sullo","sull'","sulla","sui","sugli","sulle"],
    ]},
    { type:"rule", text:"**con / per / tra / fra** never contract. 'col' is old-school — avoid." },
    { type:"example", it:"Vado al bar. / Vorrei del vino. / Sono nella stanza.", en:"I go to the bar / I'd like some wine / I'm in the room." },
  ]
},

// ══════════════════════════════════════════════════════════════
{
  id: "tricky-pairs",
  title: "Tricky Pairs",
  subtitle: "One English word, two Italian verbs",
  icon: "⚖️",
  sections: [
    { type:"heading", text:"sapere vs conoscere" },
    { type:"table", headers:["","meaning","typical use"], rows:[
      ["**sapere**","know a FACT / HOW","+che (So che è vero) / +inf. (So cucinare)"],
      ["**conoscere**","know a PERSON / PLACE","+noun (Conosco Marco / Conosco Roma)"],
    ]},

    { type:"heading", text:"essere vs stare" },
    { type:"table", headers:["","for","example"], rows:[
      ["**essere**","identity, nationality, permanent qualities","Sono americano. / È alta."],
      ["**stare**","health, mood, temporary state, location 'right now'","Come stai? / Sto bene. / Sto a casa."],
    ]},

    { type:"heading", text:"guardare vs vedere" },
    { type:"grid", items:[
      ["guardare","actively LOOK AT (you choose to)"],
      ["vedere","passively SEE (your eyes perceive)"],
    ]},
    { type:"example", it:"Guardo la TV. / Ci vediamo domani!", en:"I watch TV. / See you tomorrow!" },

    { type:"heading", text:"ascoltare vs sentire" },
    { type:"grid", items:[
      ["ascoltare","actively LISTEN TO"],
      ["sentire","HEAR (passive) / FEEL / SMELL"],
    ]},

    { type:"heading", text:"parlare vs dire" },
    { type:"grid", items:[
      ["parlare","the ACT of speaking"],
      ["dire","the CONTENT said (say, tell)"],
    ]},
    { type:"example", it:"Parlo italiano. / Come si dice 'hello'?", en:"I speak Italian. / How do you say 'hello'?" },

    { type:"heading", text:"portare vs prendere" },
    { type:"grid", items:[
      ["portare","BRING (toward someone)"],
      ["prendere","TAKE (for yourself) / ORDER"],
    ]},
    { type:"example", it:"Mi porta il conto? / Prendo un caffè.", en:"Can you bring me the check? / I'll have a coffee." },

    { type:"heading", text:"tempo vs volta" },
    { type:"grid", items:[
      ["tempo","time (duration / weather)"],
      ["volta","time (an occasion / instance)"],
    ]},
    { type:"example", it:"Non ho tempo. / È la prima volta.", en:"I don't have time. / It's the first time." },

    { type:"heading", text:"The five words for 'SO'" },
    { type:"table", headers:["word","flavor","when"], rows:[
      ["**allora**","conversational","Starting a sentence: Allora, andiamo?"],
      ["**quindi**","logical","Piove, quindi resto a casa."],
      ["**così**","'like this'","Fai così! / Tanto così!"],
      ["**dunque**","formal","Dunque, cominciamo."],
      ["**perciò**","written, formal","Piove, perciò..."],
    ]},
  ]
},

// ══════════════════════════════════════════════════════════════
{
  id: "restaurant-flow",
  title: "Restaurant & Gelato Flow",
  subtitle: "Ordering, step by step",
  icon: "🍝",
  sections: [
    { type:"heading", text:"Walking in" },
    { type:"grid", items:[
      ["Buongiorno / Buonasera","Hello (AM / PM)"],
      ["Un tavolo per due, per favore.","A table for two, please."],
      ["Avete un tavolo libero?","Do you have a free table?"],
      ["Da portare via.","To go / takeaway."],
    ]},

    { type:"heading", text:"Ordering — Italian menu structure" },
    { type:"table", headers:["Course","Italian","What it is"], rows:[
      ["Appetizer","**antipasto**","olives, bruschetta, cheeses"],
      ["First","**primo**","pasta, risotto, soup"],
      ["Second","**secondo**","meat or fish (+ contorno on side)"],
      ["Side","**contorno**","vegetables (often ordered separately!)"],
      ["Dessert","**dolce**","tiramisù, gelato, torta"],
    ]},

    { type:"heading", text:"The ordering pattern" },
    { type:"grid", items:[
      ["Come antipasto vorrei...","As a starter I'd like..."],
      ["Come primo vorrei...","As a first course I'd like..."],
      ["Vorrei iniziare con...","I'd like to start with..."],
    ]},

    { type:"heading", text:"Drinks" },
    { type:"grid", items:[
      ["Vorrei un bicchiere di vino rosso.","A glass of red wine."],
      ["Del vino della casa.","The house wine."],
      ["Acqua naturale / frizzante.","Still / sparkling water."],
      ["Con ghiaccio / senza ghiaccio.","With / without ice."],
    ]},

    { type:"heading", text:"Finishing up" },
    { type:"grid", items:[
      ["Il conto, per favore.","The check, please."],
      ["Posso pagare con la carta?","Can I pay by card?"],
      ["Si accettano carte?","Do you accept cards?"],
      ["Era tutto buonissimo!","Everything was delicious!"],
    ]},

    { type:"heading", text:"🍦 Gelato flow" },
    { type:"grid", items:[
      ["Una pallina di...","One scoop of..."],
      ["Due palline.","Two scoops."],
      ["In cono o in coppetta?","Cone or cup?"],
      ["Posso assaggiare?","Can I taste?"],
      ["Quale gusto?","Which flavor?"],
    ]},
    { type:"rule", text:"Gelaterias let you **taste (assaggiare)** before choosing. Point and ask — it's expected." },
  ]
},

// ══════════════════════════════════════════════════════════════
{
  id: "greetings-time",
  title: "Greetings & Time of Day",
  subtitle: "When to say what",
  icon: "👋",
  sections: [
    { type:"heading", text:"By time of day" },
    { type:"table", headers:["Time","Greeting","Note"], rows:[
      ["Morning–early afternoon","**Buongiorno**","Until ~1pm. Always safe, semi-formal."],
      ["Afternoon–evening","**Buonasera**","From ~1–2pm onward. Even at 3pm."],
      ["Late night / leaving","**Buonanotte**","Only when going to sleep or saying goodbye late."],
      ["Any time, casual","**Ciao**","Hi AND bye. Informal only — not with shopkeepers."],
      ["Any time, polite","**Salve**","Neutral — works anytime, with anyone."],
    ]},

    { type:"heading", text:"Meeting someone" },
    { type:"grid", items:[
      ["Piacere!","Pleased to meet you!"],
      ["Piacere di conoscerti.","Nice to meet you (informal)."],
      ["Piacere di conoscerLa.","Nice to meet you (formal)."],
      ["Come ti chiami? / Come si chiama?","What's your name? (inf. / form.)"],
      ["Mi chiamo Bo.","My name is Bo."],
    ]},

    { type:"heading", text:"Asking how someone is" },
    { type:"grid", items:[
      ["Come stai? / Come sta?","How are you? (inf. / form.)"],
      ["Sto bene, grazie.","I'm well, thank you."],
      ["Tutto bene?","Everything good?"],
      ["E tu? / E Lei?","And you? (inf. / form.)"],
    ]},

    { type:"heading", text:"Phone & quick exchanges" },
    { type:"grid", items:[
      ["Pronto?","Hello? (on the phone)"],
      ["Un momento.","One moment."],
      ["Scusa! / Scusi!","Sorry! / Excuse me! (inf. / form.)"],
      ["Prego!","You're welcome! / Go ahead! / Please!"],
    ]},

    { type:"heading", text:"Saying goodbye" },
    { type:"grid", items:[
      ["Arrivederci","Goodbye (neutral)"],
      ["ArrivederLa","Goodbye (very formal)"],
      ["A presto!","See you soon!"],
      ["A domani!","See you tomorrow!"],
      ["Ci vediamo!","See you! / Talk soon!"],
      ["A più tardi!","See you later!"],
    ]},

    { type:"rule", text:"**Formal vs informal:** use **tu** + buongiorno/ciao with friends and people your age. Use **Lei** (capitalized in writing) + buongiorno/salve + verbs in 3rd person singular with strangers, shopkeepers, elders, anyone in a service role." },
  ]
},

// ══════════════════════════════════════════════════════════════
{
  id: "grammar-essentials",
  title: "Grammar Essentials",
  subtitle: "Homonyms, possessives, polite asks — the everyday traps",
  icon: "📐",
  sections: [
    { type:"heading", text:"① SE / SI / SÌ / SÉ — four words, almost the same sound" },
    { type:"table", headers:["Word","Meaning","Example"], rows:[
      ["**se**","if","**Se** vuoi — if you want"],
      ["**si**","reflexive / impersonal pronoun","**Si** dice — they say / one says"],
      ["**sì**","yes (with accent)","**Sì**, grazie — yes, thank you"],
      ["**sé**","himself / herself (with accent)","Parla di **sé** — he talks about himself"],
    ]},
    { type:"rule", text:"The accent is the only thing telling **si** (pronoun) apart from **sì** (yes), and **se** (if) apart from **sé** (himself). When writing, the accent is mandatory." },

    { type:"heading", text:"② SI impersonal — the universal 'one / they / people'" },
    { type:"paragraph", text:"Italian uses 'si + 3rd-person verb' where English uses passive or generic 'they/people'. Always singular for general statements." },
    { type:"grid", items:[
      ["Si dice","They say / it is said"],
      ["Si mangia bene","People eat well here"],
      ["Si chiama","It / he / she is called"],
      ["Si fa così","This is how it's done"],
      ["Si parla italiano","Italian is spoken (here)"],
    ]},

    { type:"heading", text:"③ DI vs DA — static vs dynamic" },
    { type:"rule", text:"**DI** = static origin / identity / belonging. **DA** = dynamic movement / duration / at-someone's-place / purpose. They look similar but never overlap." },
    { type:"table", headers:["Use","Italian","English"], rows:[
      ["Identity / origin (static)","Sono **di** Chicago","I am from Chicago"],
      ["Movement / source (dynamic)","Vengo **da** Chicago","I'm coming from Chicago"],
      ["At someone's place","Vado **da** Marco","I'm going to Marco's"],
      ["Purpose / type","tazza **da** caffè","coffee cup"],
      ["Duration","studio **da** 2 anni","I've been studying for 2 years"],
      ["Belonging","la macchina **di** Marco","Marco's car"],
    ]},

    { type:"heading", text:"④ POSSO vs POTREI — politeness ladder" },
    { type:"table", headers:["Form","Use","Example"], rows:[
      ["**Posso.**","Statement: I can","Sì, posso."],
      ["**Posso...?**","Question: Can I…?","Posso entrare?"],
      ["**Potrei...?**","More polite: Could I…?","Potrei avere un caffè?"],
    ]},
    { type:"rule", text:"**Posso** and **Posso...?** are spelled identically — only intonation/punctuation distinguishes them. **Potrei** softens the ask; use it with strangers, staff, or anyone you don't know well." },

    { type:"heading", text:"⑤ BENE vs BUONO — well vs good" },
    { type:"rule", text:"**BUONO/A** describes a **NOUN/THING** (it agrees in gender). **BENE** describes a **VERB/ACTION** (invariable adverb)." },
    { type:"table", headers:["Sentence","Why"], rows:[
      ["Sto **bene**.","'sto' is a verb → bene"],
      ["Va **bene**.","'va' is a verb → bene"],
      ["Il vino è **buono**.","'vino' is a noun (m.) → buono"],
      ["La pizza è **buona**.","'pizza' is a noun (f.) → buona"],
      ["Parli **bene** italiano.","modifies 'parli' (verb)"],
      ["Sei una **buona** persona.","modifies 'persona' (noun, f.)"],
    ]},

    { type:"heading", text:"⑥ Possessives — YOUR" },
    { type:"paragraph", text:"Italian possessives agree with the THING owned, not the owner. Most take the article (il/la/i/le)." },
    { type:"table", headers:["Form","When","Example"], rows:[
      ["**il tuo / la tua**","informal, singular","il tuo libro / la tua casa"],
      ["**i tuoi / le tue**","informal, plural","i tuoi occhi / le tue scarpe"],
      ["**il Suo / la Sua**","formal (capitalized)","È il Suo passaporto?"],
      ["**il vostro / la vostra**","plural — group","Qual è la vostra opinione?"],
    ]},
    { type:"rule", text:"**Family exception:** singular family members drop the article — *tuo padre*, *tua madre*, *Sua sorella*. Plural family members keep it: *i tuoi fratelli*. The phrase **i tuoi** by itself often means 'your parents'." },

    { type:"heading", text:"⑦ GENTE — singular even when plural in meaning" },
    { type:"rule", text:"**la gente** is grammatically **SINGULAR**. Always *è / era / sarà* — never *sono*. If you need a plural verb, switch to **le persone**." },
    { type:"grid", items:[
      ["✅ La gente è simpatica","People are nice"],
      ["✅ C'è tanta gente","There are many people"],
      ["✅ Le persone sono qui","People are here"],
      ["❌ La gente sono…","wrong — never plural"],
    ]},
  ]
},

];
