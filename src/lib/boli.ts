import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "en" | "hi" | "hry" | "hinglish";

const KNOWN: Lang[] = ["en", "hi", "hry", "hinglish"];

export function normalizeLang(lang: unknown): Lang {
  if (lang === "roman") return "hinglish";
  if (lang === "haryanvi") return "hry";
  if (typeof lang === "string" && (KNOWN as string[]).includes(lang)) return lang as Lang;
  return "hry";
}

type BoliState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const useBoliStore = create<BoliState>()(
  persist(
    (set) => ({
      lang: "hry",
      setLang: (lang) => set({ lang: normalizeLang(lang) }),
    }),
    {
      name: "tvd-boli",
      skipHydration: true,
      version: 2,
      migrate: (persisted) => ({ lang: normalizeLang((persisted as { lang?: string } | undefined)?.lang) }),
    },
  ),
);

type ProductCopy = { name: string; kind: string; blurb: string; unit: string };

export type Copy = {
  nav: { doodh: string; lassi: string; ghee: string; kaise: string; gaam: string; hisar: string };
  menuOpen: string;
  menuClose: string;
  thali: string;
  pour: string;
  kicker: string;
  heroTitle: string;
  heroTitle2: string;
  heroBody: string;
  startDoodh: string;
  seeGhee: string;
  statDoodh: string;
  statGhee: string;
  statSlot: string;
  perLitre: string;
  perKilo: string;
  morning: string;
  trust: { t: string; d: string }[];
  productsKicker: string;
  productsTitle: string;
  productsBody: string;
  products: Record<"doodh" | "ghee" | "lassi", ProductCopy>;
  howMuch: string;
  when: string;
  nextDays: string;
  nextDrop: string;
  weekOf: string;
  once: string;
  inThali: string;
  updateThali: string;
  addThali: string;
  remove: string;
  cadence: Record<"daily" | "alt" | "week3" | "once" | "weekly", string>;
  days: Record<string, string>;
  qtyMl: string;
  qtyL: string;
  qtyLs: string;
  qtyG: string;
  qtyKg: string;
  qtyKgs: string;
  howKicker: string;
  howTitle: string;
  steps: { t: string; d: string }[];
  storyKicker: string;
  storyTitle: string;
  story1: string;
  story2: string;
  voicesKicker: string;
  voicesTitle: string;
  quotes: { q: string; name: string; area: string }[];
  faqKicker: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ordersKicker: string;
  ordersTitle: string;
  ordersEmpty: string;
  weekBill: string;
  cancelOrder: string;
  hours: string;
  owner: string;
  errName: string;
  errPhone: string;
  errArea: string;
  errEmpty: string;
  doneTitle: string;
  thaliTitle: string;
  doneNote: string;
  thaliNote: string;
  close: string;
  emptyThali: string;
  seeDoodh: string;
  tomorrowBill: string;
  onceGoods: string;
  name: string;
  mobile: string;
  area: string;
  pick: string;
  lane: string;
  laneHint: string;
  orderBtn: string;
  payNote: string;
  mobileWord: string;
  callNote: string;
  callTail: string;
  dockDoodh: string;
};

const hinglish: Copy = {
  nav: { doodh: "Doodh", lassi: "Lassi", ghee: "Ghee", kaise: "Kaise aave", gaam: "Gaam", hisar: "Hisar" },
  menuOpen: "Menu kholo",
  menuClose: "Menu band karo",
  thali: "Thali",
  pour: "Dheere pour · malai upar",
  kicker: "Ghani ghani ram ram · Hisar",
  heroTitle: "Ghar ka doodh.",
  heroTitle2: "Packet wala nahi.",
  heroBody:
    "Bhains ka taaza doodh, subah 5 se 7, thare darwaje. Lal lassi saath mein. Safed bilona ghee. Hisar, Haryana — gaam se seedha.",
  startDoodh: "Doodh shuru karo",
  seeGhee: "Bilona ghee dekho",
  statDoodh: "Doodh",
  statGhee: "Ghee",
  statSlot: "Slot",
  perLitre: "pratilitre",
  perKilo: "pratikilo",
  morning: "subah",
  trust: [
    { t: "Roz subah, time pe", d: "5 se 7 baje can darwaje. Raat 9 tak bol de." },
    { t: "Malai upar", d: "Bhains ka gaadha doodh. Koi powder, koi milawat nahi." },
    { t: "Bilona, dheere", d: "Ghee lakdi ke churn se. Haath se, ghar jaisa." },
    { t: "Hisar + aas-paas", d: "Shehar ke sector, aur Agroha, Gangwa, Satrod." },
  ],
  productsKicker: "Thaari thali",
  productsTitle: "Aaj kya mangwayenge?",
  productsBody: "Litre aur din chun lo. Thali mein daal ke naam, mobile aur area likh do — agli subah nikal javega.",
  products: {
    doodh: {
      name: "Ghar ka Doodh",
      kind: "Buffalo",
      blurb: "Bhains ka gaadha doodh. Malai upar tikki rehti hai — packet wale mein ye baat nahi.",
      unit: "litre",
    },
    ghee: {
      name: "Bilona Ghee",
      kind: "Haath se biloya",
      blurb: "Lakdi ke bilone se, dheere-dheere. Safed ghee — khushboo sarson ke khet jaisi, daane padte hain sardi mein.",
      unit: "kg",
    },
    lassi: {
      name: "Lal Lassi",
      kind: "Peetal ke glass mein",
      blurb: "Haare mai Pakke Doodh se bani Lassi.",
      unit: "litre",
    },
  },
  howMuch: "Kitna?",
  when: "Kab aave?",
  nextDays: "Agle saat din",
  nextDrop: "agli delivery",
  weekOf: "hafte ka",
  once: "ek baar",
  inThali: "Thali mein hai",
  updateThali: "Thali update karo",
  addThali: "Thali mein daal",
  remove: "Hata de",
  cadence: {
    daily: "Roz subah",
    alt: "Ek din chhod",
    week3: "Hafte mein 3",
    once: "Sirf agli subah",
    weekly: "Har hafte",
  },
  days: { Rav: "Rav", Som: "Som", Man: "Man", Bud: "Bud", Gur: "Gur", Suk: "Suk", Sha: "Sha" },
  qtyMl: "500 ml",
  qtyL: "1 litre",
  qtyLs: "litre",
  qtyG: "500 g",
  qtyKg: "1 kg",
  qtyKgs: "kg",
  howKicker: "Kaise pohonche",
  howTitle: "Seedha, bina jhanjhat.",
  steps: [
    { t: "Maang bata de", d: "Litre ya kilo, aur kin dinon pe. Thali yahin pe ban jave." },
    { t: "Raat 9 se pehle", d: "Uske baad wali subah nikal jave. Aaj ka doodh kal milsi." },
    { t: "Can darwaje", d: "5 se 7 baje. Khaali can agli subah le jayege. Paisa ghar pe — cash ya UPI." },
  ],
  storyKicker: "Gaam ki baat",
  storyTitle: "Hisar se, khet ki taraf se.",
  story1:
    "Kaimri Road pe, New Grain Market ke paas, hamara collection hai. Bhains Hisar ke aas-paas se aave — Agroha, Gangwa, Satrod. Doodh shaam ko thanda pada hua nahi, subah ka. Ghee lakdi ke bilone se, dheere, jaise ghar pe ma banave.",
  story2: "Shehar mein gaam ka swaad. Itna hi vaada hai — aur itna kaafi hai.",
  voicesKicker: "Log kya kehve hain",
  voicesTitle: "Darwaje wali baat.",
  quotes: [
    { q: "Malai itni ki chai ka rang hi badal gya. Packet wale mein ye baat kahan.", name: "Sunita", area: "Sector 14" },
    { q: "Ghee ki khushboo bilona wali hai. Roti pe laga ke farak pata chal jave.", name: "Ramphal", area: "Agroha Road" },
    { q: "Roz time pe aave. Gaam ka swaad, shehar ke darwaje.", name: "Kavita", area: "Model Town" },
  ],
  faqKicker: "Sawal-jawab",
  faqTitle: "Jo poochhte ho",
  faq: [
    { q: "Delivery kitne baje?", a: "Subah 5:00 se 7:00, Hisar shehar aur nazdeeki gaam." },
    { q: "Kitne baje tak order?", a: "Raat 9 baje se pehle. Uske baad agli subah ki delivery." },
    { q: "Doodh kaunsa, kitne ka?", a: "Bhains ka Ghar ka Doodh, ₹80 pratilitre. 500 ml se 2 litre." },
    { q: "Lassi kaunsi?", a: "Lal lassi, peetal ke bade glass mein, ₹40 pratilitre. Haare mai pakke doodh se bani." },
    { q: "Ghee kasaa?", a: "Bilona, lakdi ke churn se. Safed. ₹1400 pratikilo." },
    { q: "Paisa kab?", a: "Darwaje pe. Cash ya UPI. Pehle se koi wallet nahi." },
    { q: "Kahan pahunchoge?", a: "Hisar ke sector, Model Town, Urban Estate, aur Agroha, Gangwa, Satrod, Barwala, Hansi road." },
  ],
  ordersKicker: "Thaare order",
  ordersTitle: "Jo mangwaya",
  ordersEmpty: "Abhi koi order nahi. Pehla doodh aaj thali mein daal lo — kal subah milsi.",
  weekBill: "Hafte ka",
  cancelOrder: "Ye order hata de",
  hours: "Delivery 5:00–7:00 subah · order raat 9 baje tak",
  owner: "Owner · Anil Kundu",
  errName: "Naam likh de — kam se kam do akshar.",
  errPhone: "Mobile 10 digit ka hona chahiye, 6, 7, 8 ya 9 se shuru.",
  errArea: "Area chun le, taaki can sahi darwaje pahunche.",
  errEmpty: "Pehle doodh, lassi ya ghee thali mein daal.",
  doneTitle: "Ho gaya.",
  thaliTitle: "Thaari thali",
  doneNote: "Kal subah 5 se 7 ke beech, thare darwaje.",
  thaliNote: "Jo chuna hai, aur kahan pahunchana hai.",
  close: "Band karo",
  emptyThali: "Abhi thali khaali hai. Doodh, lassi ya ghee chun lo.",
  seeDoodh: "Doodh dekh",
  tomorrowBill: "Kal ka hisaab",
  onceGoods: "ek baar ka samaan",
  name: "Naam",
  mobile: "Mobile",
  area: "Area, Hisar",
  pick: "Chun lo",
  lane: "Gali / makan",
  laneHint: "Neem wala makan, pehla floor",
  orderBtn: "Mangwa do",
  payNote: "Paisa darwaje pe — cash ya UPI. Ye order isi phone pe save rehta hai.",
  mobileWord: "Mobile",
  callNote: "Koi gadbad ho to",
  callTail: "pe bol dena. Ghani ghani.",
  dockDoodh: "Doodh",
};

const haryanvi: Copy = {
  nav: { doodh: "दूध", lassi: "लस्सी", ghee: "घी", kaise: "किसा आवै", gaam: "गाँव", hisar: "हिसार" },
  menuOpen: "मेनू खोलो",
  menuClose: "मेनू बंद करो",
  thali: "थाली",
  pour: "धीरे पौर · मलाई ऊपर",
  kicker: "घणी घणी राम राम · हिसार",
  heroTitle: "घरे का दूध।",
  heroTitle2: "पैकेट आळा कोनी।",
  heroBody:
    "भैंस का ताज़ा दूध, तड़के 5 ते 7, थारे बार नै। लाल लस्सी साथ मैं। सफ़ेद बिलौणा घी। हिसार, हरियाणा — गाँव सूं सीधा।",
  startDoodh: "दूध शुरू करो",
  seeGhee: "बिलौणा घी देखो",
  statDoodh: "दूध",
  statGhee: "घी",
  statSlot: "बखत",
  perLitre: "प्रती लीटर",
  perKilo: "प्रती किलो",
  morning: "तड़के",
  trust: [
    { t: "रोज तड़के, टाइम पे", d: "5 ते 7 बजे कैन बार नै। रात 9 ताहीं बोल दे।" },
    { t: "मलाई ऊपर", d: "भैंस का गाढ़ा दूध। कोई पाउडर, कोई मिलावट कोनी।" },
    { t: "बिलौणा, धीरे", d: "घी लकड़ी के बिलौणे सूं। हाथ सूं, घरे जिसा।" },
    { t: "हिसार अर आस-पास", d: "शहर के सेक्टर, अर अग्रोहा, गंगवा, सत्रोद।" },
  ],
  productsKicker: "थारी थाली",
  productsTitle: "आज के मंगवाओगे?",
  productsBody: "लीटर अर दिन चुन लो। थाली मैं डाल के नाम, मोबाइल अर एरिया लिख दो — अगली सुबह निकल जावैगा।",
  products: {
    doodh: {
      name: "घरे का दूध",
      kind: "भैंस का",
      blurb: "भैंस का गाढ़ा दूध। मलाई ऊपर टिकी रहै सै — पैकेट आळे मैं ये बात कोनी।",
      unit: "लीटर",
    },
    ghee: {
      name: "बिलौणा घी",
      kind: "हाथ सूं बिलोया",
      blurb: "लकड़ी के बिलौणे सूं, धीरे-धीरे। सफ़ेद घी — खुशबू सरसों के खेत जिसी, दाणे पड़ै सै सर्दी मैं।",
      unit: "किलो",
    },
    lassi: {
      name: "लाल लस्सी",
      kind: "पीतल के गिलास मैं",
      blurb: "हारे मैं पक्के दूध सूं बणी लस्सी।",
      unit: "लीटर",
    },
  },
  howMuch: "कितना?",
  when: "कद आवै?",
  nextDays: "अगले सात दिन",
  nextDrop: "अगली डिलीवरी",
  weekOf: "हफ्ते का",
  once: "एक बार",
  inThali: "थाली मैं सै",
  updateThali: "थाली ठीक करो",
  addThali: "थाली मैं डाल",
  remove: "हटा दे",
  cadence: {
    daily: "रोज तड़के",
    alt: "एक दिन छोड़",
    week3: "हफ्ते मैं 3",
    once: "सिरफ अगली सुबह",
    weekly: "हर हफ्ते",
  },
  days: { Rav: "रवि", Som: "सोम", Man: "मंग", Bud: "बुध", Gur: "गुरु", Suk: "शुक्र", Sha: "शनि" },
  qtyMl: "500 मिली",
  qtyL: "1 लीटर",
  qtyLs: "लीटर",
  qtyG: "500 ग्राम",
  qtyKg: "1 किलो",
  qtyKgs: "किलो",
  howKicker: "किसा पौहंचे",
  howTitle: "सीधा, बिना झंझट।",
  steps: [
    { t: "मांग बता दे", d: "लीटर या किलो, अर किण दिन नै। थाली यहीं पे बन जावै।" },
    { t: "रात 9 सूं पैहले", d: "उसके बाद आळी सुबह निकल जावै। आज का दूध काल मिलसी।" },
    { t: "कैन बार नै", d: "5 ते 7 बजे। खाली कैन अगली सुबह ले जावांगे। पैसा घरे पे — नकद या यूपीआई।" },
  ],
  storyKicker: "गाँव की बात",
  storyTitle: "हिसार सूं, खेत की तरफ सूं।",
  story1:
    "कैमरी रोड पे, न्यू ग्रेन मार्केट के पास, म्हार संग्रह सै। भैंस हिसार के आस-पास सूं आवै — अग्रोहा, गंगवा, सत्रोद। दूध शाम को ठंडा पड़ा होया कोनी, तड़के का। घी लकड़ी के बिलौणे सूं, धीरे, जिसा घरे पे माँ बनावै।",
  story2: "शहर मैं गाँव का स्वाद। इतना ही वादा सै — अर इतना काफी सै।",
  voicesKicker: "लोक के कहवै सै",
  voicesTitle: "बार आळी बात।",
  quotes: [
    { q: "मलाई इतनी कि चाय का रंग ही बदल गया। पैकेट आळे मैं ये बात कहाँ।", name: "सुनीता", area: "सेक्टर 14" },
    { q: "घी की खुशबू बिलौणा आळी सै। रोटी पे लगा के फर्क पता चल जावै।", name: "रामफल", area: "अग्रोहा रोड" },
    { q: "रोज टाइम पे आवै। गाँव का स्वाद, शहर के बार नै।", name: "कविता", area: "मॉडल टाउन" },
  ],
  faqKicker: "सवाल-जवाब",
  faqTitle: "जो पूछो सो",
  faq: [
    { q: "डिलीवरी कितने बजे?", a: "तड़के 5:00 ते 7:00, हिसार शहर अर नजदीकी गाँव।" },
    { q: "कद ताहीं ऑर्डर?", a: "रात 9 बजे सूं पैहले। उसके बाद अगली सुबह की डिलीवरी।" },
    { q: "दूध कोणसा, कितने का?", a: "भैंस का घरे का दूध, ₹80 प्रती लीटर। 500 मिली ते 2 लीटर।" },
    { q: "लस्सी कोणसी?", a: "लाल लस्सी, पीतल के बड़े गिलास मैं, ₹40 प्रती लीटर। हारे मैं पक्के दूध सूं बणी।" },
    { q: "घी किसा?", a: "बिलौणा, लकड़ी के बिलौणे सूं। सफ़ेद। ₹1400 प्रती किलो।" },
    { q: "पैसा कद?", a: "बार पे। नकद या यूपीआई। पैहले सूं कोई वॉलेट कोनी।" },
    { q: "कहाँ पौहंचोगे?", a: "हिसार के सेक्टर, मॉडल टाउन, अर्बन एस्टेट, अर अग्रोहा, गंगवा, सत्रोद, बरवाला, हांसी रोड।" },
  ],
  ordersKicker: "थारे ऑर्डर",
  ordersTitle: "जो मंगवाया",
  ordersEmpty: "अभी कोई ऑर्डर कोनी। पहला दूध आज थाली मैं डाल लो — काल तड़के मिलसी।",
  weekBill: "हफ्ते का",
  cancelOrder: "ये ऑर्डर हटा दे",
  hours: "डिलीवरी 5:00–7:00 तड़के · ऑर्डर रात 9 बजे ताहीं",
  owner: "मालिक · अनिल कुंडू",
  errName: "नाम लिख दे — कम सूं कम दो अक्षर।",
  errPhone: "मोबाइल 10 अंक का होणा चाही, 6, 7, 8 या 9 सूं शुरू।",
  errArea: "एरिया चुन ले, ताके कैन सही बार नै पौहंचे।",
  errEmpty: "पैहले दूध, लस्सी या घी थाली मैं डाल।",
  doneTitle: "हो गया।",
  thaliTitle: "थारी थाली",
  doneNote: "काल तड़के 5 ते 7 के बीच, थारे बार नै।",
  thaliNote: "जो चुणा सै, अर कहाँ पौहंचाना सै।",
  close: "बंद करो",
  emptyThali: "अभी थाली खाली सै। दूध, लस्सी या घी चुन लो।",
  seeDoodh: "दूध देख",
  tomorrowBill: "काल का हिसाब",
  onceGoods: "एक बार का सामान",
  name: "नाम",
  mobile: "मोबाइल",
  area: "एरिया, हिसार",
  pick: "चुन लो",
  lane: "गली / मकान",
  laneHint: "नीम आळा मकान, पहला फ्लोर",
  orderBtn: "मंगवा दो",
  payNote: "पैसा बार पे — नकद या यूपीआई। ये ऑर्डर इसी फोन पे सेव रहै सै।",
  mobileWord: "मोबाइल",
  callNote: "कोई गड़बड़ हो तो",
  callTail: "पे बोल देना। घणी घणी।",
  dockDoodh: "दूध",
};

const english: Copy = {
  nav: { doodh: "Milk", lassi: "Lassi", ghee: "Ghee", kaise: "How", gaam: "Farm", hisar: "Hisar" },
  menuOpen: "Open menu",
  menuClose: "Close menu",
  thali: "Basket",
  pour: "Slow pour · cream on top",
  kicker: "Ram ram from Hisar",
  heroTitle: "Milk from the house.",
  heroTitle2: "Not from a packet.",
  heroBody: "Fresh buffalo milk at your door, 5 to 7 in the morning. Red lassi with it. White bilona ghee. Hisar, Haryana — straight from the village.",
  startDoodh: "Start the milk",
  seeGhee: "See the ghee",
  statDoodh: "Milk",
  statGhee: "Ghee",
  statSlot: "Slot",
  perLitre: "a litre",
  perKilo: "a kilo",
  morning: "morning",
  trust: [
    { t: "Every morning, on time", d: "The can is at the door between 5 and 7. Tell us by 9 at night." },
    { t: "Cream on top", d: "Thick buffalo milk. No powder, no mixing." },
    { t: "Bilona, slowly", d: "Ghee from a wooden churn. By hand, the way a house makes it." },
    { t: "Hisar and nearby", d: "City sectors, plus Agroha, Gangwa and Satrod." },
  ],
  productsKicker: "Your basket",
  productsTitle: "What shall we send today?",
  productsBody: "Pick the litres and the days. Add a name, mobile and area — it leaves the next morning.",
  products: {
    doodh: {
      name: "Ghar ka Doodh",
      kind: "Buffalo",
      blurb: "Thick buffalo milk. The cream stays on top — a packet never does that.",
      unit: "litre",
    },
    ghee: {
      name: "Bilona Ghee",
      kind: "Churned by hand",
      blurb: "Slow work on a wooden churn. White ghee, with a mustard-field smell, and grains in winter.",
      unit: "kg",
    },
    lassi: {
      name: "Lal Lassi",
      kind: "In a brass glass",
      blurb: "Lassi made from our thick, full-bodied milk.",
      unit: "litre",
    },
  },
  howMuch: "How much?",
  when: "Which days?",
  nextDays: "Next seven days",
  nextDrop: "next drop",
  weekOf: "a week",
  once: "just once",
  inThali: "In the basket",
  updateThali: "Update basket",
  addThali: "Add to basket",
  remove: "Remove",
  cadence: {
    daily: "Every morning",
    alt: "Every other day",
    week3: "3 days a week",
    once: "Only tomorrow",
    weekly: "Once a week",
  },
  days: { Rav: "Sun", Som: "Mon", Man: "Tue", Bud: "Wed", Gur: "Thu", Suk: "Fri", Sha: "Sat" },
  qtyMl: "500 ml",
  qtyL: "1 litre",
  qtyLs: "litre",
  qtyG: "500 g",
  qtyKg: "1 kg",
  qtyKgs: "kg",
  howKicker: "How it arrives",
  howTitle: "Straight, without fuss.",
  steps: [
    { t: "Tell us what you need", d: "Litres or kilos, and which days. The basket is made right here." },
    { t: "Before 9 at night", d: "It leaves the next morning. Today’s order is tomorrow’s milk." },
    { t: "Can at the door", d: "Between 5 and 7. We take the empty can the next day. Pay at home — cash or UPI." },
  ],
  storyKicker: "From the village",
  storyTitle: "From Hisar, towards the fields.",
  story1: "The collection point is on Kaimri Road, near New Grain Market. The buffaloes are from around Hisar — Agroha, Gangwa, Satrod. The milk is the morning’s, not last night’s leftover. The ghee is churned slowly on wood, the way a mother makes it at home.",
  story2: "Village taste in the city. That is the whole promise — and it is enough.",
  voicesKicker: "What people say",
  voicesTitle: "Talk from the doorstep.",
  quotes: [
    { q: "So much cream the tea itself changed colour. A packet never does that.", name: "Sunita", area: "Sector 14" },
    { q: "The ghee smells of real bilona. You know it the moment it hits a roti.", name: "Ramphal", area: "Agroha Road" },
    { q: "It comes on time, every day. Village taste at a city door.", name: "Kavita", area: "Model Town" },
  ],
  faqKicker: "Questions",
  faqTitle: "What people ask",
  faq: [
    { q: "What time is delivery?", a: "5:00 to 7:00 in the morning, across Hisar and the nearby villages." },
    { q: "Till when can I order?", a: "Before 9 at night. After that, it is the morning after next." },
    { q: "Which milk, and the rate?", a: "Buffalo ghar ka doodh, ₹80 a litre. From 500 ml to 2 litres." },
    { q: "Which lassi?", a: "Red lassi in a large brass glass, ₹40 a litre, made from thick milk." },
    { q: "How is the ghee made?", a: "Bilona, on a wooden churn. White. ₹1400 a kilo." },
    { q: "When do I pay?", a: "At the door. Cash or UPI. No wallet in advance." },
    { q: "Where do you reach?", a: "Hisar sectors, Model Town, Urban Estate, and Agroha, Gangwa, Satrod, Barwala and Hansi road." },
  ],
  ordersKicker: "Your orders",
  ordersTitle: "What you asked for",
  ordersEmpty: "No order yet. Put the first milk in the basket today — it arrives tomorrow morning.",
  weekBill: "For the week",
  cancelOrder: "Cancel this order",
  hours: "Delivery 5:00–7:00 morning · order by 9 at night",
  owner: "Owner · Anil Kundu",
  errName: "Write a name — at least two letters.",
  errPhone: "The mobile must be 10 digits, starting with 6, 7, 8 or 9.",
  errArea: "Pick an area, so the can finds the right door.",
  errEmpty: "Add milk, lassi or ghee to the basket first.",
  doneTitle: "Done.",
  thaliTitle: "Your basket",
  doneNote: "Tomorrow, between 5 and 7, at your door.",
  thaliNote: "What you picked, and where it should go.",
  close: "Close",
  emptyThali: "The basket is empty. Pick milk, lassi or ghee.",
  seeDoodh: "See the milk",
  tomorrowBill: "Tomorrow’s bill",
  onceGoods: "a one-time order",
  name: "Name",
  mobile: "Mobile",
  area: "Area, Hisar",
  pick: "Choose",
  lane: "Lane / house",
  laneHint: "House by the neem, first floor",
  orderBtn: "Place order",
  payNote: "Pay at the door — cash or UPI. This order stays on this phone.",
  mobileWord: "Mobile",
  callNote: "If something is wrong, call",
  callTail: "Ram ram.",
  dockDoodh: "Milk",
};

const hindi: Copy = {
  nav: { doodh: "दूध", lassi: "लस्सी", ghee: "घी", kaise: "कैसे", gaam: "गाँव", hisar: "हिसार" },
  menuOpen: "मेनू खोलें",
  menuClose: "मेनू बंद करें",
  thali: "थाली",
  pour: "धीरे धारा · मलाई ऊपर",
  kicker: "राम राम · हिसार",
  heroTitle: "घर का दूध।",
  heroTitle2: "पैकेट वाला नहीं।",
  heroBody: "भैंस का ताज़ा दूध, सुबह 5 से 7, आपके दरवाज़े पर। साथ में लाल लस्सी। सफ़ेद बिलोना घी। हिसार, हरियाणा — गाँव से सीधा।",
  startDoodh: "दूध शुरू करें",
  seeGhee: "बिलोना घी देखें",
  statDoodh: "दूध",
  statGhee: "घी",
  statSlot: "समय",
  perLitre: "प्रति लीटर",
  perKilo: "प्रति किलो",
  morning: "सुबह",
  trust: [
    { t: "हर सुबह, समय पर", d: "5 से 7 बजे कैन दरवाज़े पर। रात 9 बजे तक बता दें।" },
    { t: "मलाई ऊपर", d: "भैंस का गाढ़ा दूध। न पाउडर, न मिलावट।" },
    { t: "बिलोना, धीरे", d: "घी लकड़ी के बिलौने से। हाथ से, जैसे घर में बनता है।" },
    { t: "हिसार और आस-पास", d: "शहर के सेक्टर, और अग्रोहा, गंगवा, सत्रोद।" },
  ],
  productsKicker: "आपकी थाली",
  productsTitle: "आज क्या मँगवाएँगे?",
  productsBody: "लीटर और दिन चुनें। थाली में डालकर नाम, मोबाइल और इलाका लिख दें — अगली सुबह निकल जाएगा।",
  products: {
    doodh: {
      name: "घर का दूध",
      kind: "भैंस का",
      blurb: "भैंस का गाढ़ा दूध। मलाई ऊपर टिकी रहती है — पैकेट वाले में यह बात नहीं।",
      unit: "लीटर",
    },
    ghee: {
      name: "बिलोना घी",
      kind: "हाथ से बिलोया",
      blurb: "लकड़ी के बिलौने से, धीरे-धीरे। सफ़ेद घी — खुशबू सरसों के खेत जैसी, सर्दी में दाने पड़ते हैं।",
      unit: "किलो",
    },
    lassi: {
      name: "लाल लस्सी",
      kind: "पीतल के गिलास में",
      blurb: "हमारे पक्के दूध से बनी लस्सी।",
      unit: "लीटर",
    },
  },
  howMuch: "कितना?",
  when: "कब आए?",
  nextDays: "अगले सात दिन",
  nextDrop: "अगली डिलीवरी",
  weekOf: "हफ़्ते का",
  once: "एक बार",
  inThali: "थाली में है",
  updateThali: "थाली बदलें",
  addThali: "थाली में डालें",
  remove: "हटाएँ",
  cadence: {
    daily: "हर सुबह",
    alt: "एक दिन छोड़कर",
    week3: "हफ़्ते में 3",
    once: "सिर्फ़ अगली सुबह",
    weekly: "हर हफ़्ते",
  },
  days: { Rav: "रवि", Som: "सोम", Man: "मंग", Bud: "बुध", Gur: "गुरु", Suk: "शुक्र", Sha: "शनि" },
  qtyMl: "500 मिली",
  qtyL: "1 लीटर",
  qtyLs: "लीटर",
  qtyG: "500 ग्राम",
  qtyKg: "1 किलो",
  qtyKgs: "किलो",
  howKicker: "कैसे पहुँचे",
  howTitle: "सीधा, बिना झंझट।",
  steps: [
    { t: "माँग बता दें", d: "लीटर या किलो, और किन दिनों। थाली यहीं बन जाती है।" },
    { t: "रात 9 से पहले", d: "उसके बाद वाली सुबह निकलता है। आज का दूध कल मिलेगा।" },
    { t: "कैन दरवाज़े पर", d: "5 से 7 बजे। खाली कैन अगली सुबह ले जाएँगे। पैसा घर पर — नकद या यूपीआई।" },
  ],
  storyKicker: "गाँव की बात",
  storyTitle: "हिसार से, खेतों की तरफ़ से।",
  story1: "कैमरी रोड पर, न्यू ग्रेन मार्केट के पास, हमारा संग्रह है। भैंस हिसार के आस-पास से आती हैं — अग्रोहा, गंगवा, सत्रोद। दूध शाम को ठंडा पड़ा हुआ नहीं, सुबह का। घी लकड़ी के बिलौने से, धीरे, जैसे घर पर माँ बनाए।",
  story2: "शहर में गाँव का स्वाद। इतना ही वादा है — और इतना काफ़ी है।",
  voicesKicker: "लोग क्या कहते हैं",
  voicesTitle: "दरवाज़े वाली बात।",
  quotes: [
    { q: "मलाई इतनी कि चाय का रंग ही बदल गया। पैकेट वाले में यह बात कहाँ।", name: "सुनीता", area: "सेक्टर 14" },
    { q: "घी की खुशबू बिलोना वाली है। रोटी पर लगाते ही फ़र्क पता चल जाता है।", name: "रामफल", area: "अग्रोहा रोड" },
    { q: "रोज़ समय पर आता है। गाँव का स्वाद, शहर के दरवाज़े पर।", name: "कविता", area: "मॉडल टाउन" },
  ],
  faqKicker: "सवाल-जवाब",
  faqTitle: "जो पूछते हैं",
  faq: [
    { q: "डिलीवरी कितने बजे?", a: "सुबह 5:00 से 7:00, हिसार शहर और नज़दीकी गाँव।" },
    { q: "कितने बजे तक ऑर्डर?", a: "रात 9 बजे से पहले। उसके बाद अगली सुबह की डिलीवरी।" },
    { q: "दूध कौन-सा, कितने का?", a: "भैंस का घर का दूध, ₹80 प्रति लीटर। 500 मिली से 2 लीटर।" },
    { q: "लस्सी कौन-सी?", a: "लाल लस्सी, पीतल के बड़े गिलास में, ₹40 प्रति लीटर। पक्के दूध से बनी।" },
    { q: "घी कैसा?", a: "बिलोना, लकड़ी के बिलौने से। सफ़ेद। ₹1400 प्रति किलो।" },
    { q: "पैसा कब?", a: "दरवाज़े पर। नकद या यूपीआई। पहले से कोई वॉलेट नहीं।" },
    { q: "कहाँ पहुँचोगे?", a: "हिसार के सेक्टर, मॉडल टाउन, अर्बन एस्टेट, और अग्रोहा, गंगवा, सत्रोद, बरवाला, हांसी रोड।" },
  ],
  ordersKicker: "आपके ऑर्डर",
  ordersTitle: "जो मँगवाया",
  ordersEmpty: "अभी कोई ऑर्डर नहीं। पहला दूध आज थाली में डाल लें — कल सुबह मिलेगा।",
  weekBill: "हफ़्ते का",
  cancelOrder: "यह ऑर्डर हटाएँ",
  hours: "डिलीवरी सुबह 5:00–7:00 · ऑर्डर रात 9 बजे तक",
  owner: "मालिक · अनिल कुंडू",
  errName: "नाम लिखें — कम से कम दो अक्षर।",
  errPhone: "मोबाइल 10 अंक का होना चाहिए, 6, 7, 8 या 9 से शुरू।",
  errArea: "इलाका चुनें, ताकि कैन सही दरवाज़े पहुँचे।",
  errEmpty: "पहले दूध, लस्सी या घी थाली में डालें।",
  doneTitle: "हो गया।",
  thaliTitle: "आपकी थाली",
  doneNote: "कल सुबह 5 से 7 के बीच, आपके दरवाज़े पर।",
  thaliNote: "जो चुना है, और कहाँ पहुँचाना है।",
  close: "बंद करें",
  emptyThali: "अभी थाली खाली है। दूध, लस्सी या घी चुनें।",
  seeDoodh: "दूध देखें",
  tomorrowBill: "कल का हिसाब",
  onceGoods: "एक बार का सामान",
  name: "नाम",
  mobile: "मोबाइल",
  area: "इलाका, हिसार",
  pick: "चुनें",
  lane: "गली / मकान",
  laneHint: "नीम वाला मकान, पहली मंज़िल",
  orderBtn: "मँगवा दें",
  payNote: "पैसा दरवाज़े पर — नकद या यूपीआई। यह ऑर्डर इसी फ़ोन पर रहता है।",
  mobileWord: "मोबाइल",
  callNote: "कोई गड़बड़ हो तो",
  callTail: "पर बोल देना।",
  dockDoodh: "दूध",
};

export const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "hi", label: "हिंदी" },
  { id: "hry", label: "हरियाणवी" },
  { id: "hinglish", label: "Hinglish" },
];

export const COPY: Record<Lang, Copy> = { en: english, hi: hindi, hry: haryanvi, hinglish };

export function useCopy() {
  const raw = useBoliStore((s) => s.lang);
  const setLang = useBoliStore((s) => s.setLang);
  const lang = normalizeLang(raw);
  return { lang, setLang, t: COPY[lang] };
}
