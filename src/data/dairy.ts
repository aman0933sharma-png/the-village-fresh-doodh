export type ProductId = "doodh" | "ghee";

export type Cadence = "daily" | "alt" | "week3" | "once" | "weekly";

export type Product = {
  id: ProductId;
  name: string;
  kind: string;
  blurb: string;
  unit: string;
  price: number;
  photo: string;
  alt: string;
  steps: number[];
  defaultQty: number;
  cadences: Cadence[];
};

export const PRODUCTS: Record<ProductId, Product> = {
  doodh: {
    id: "doodh",
    name: "Ghar ka Doodh",
    kind: "Buffalo",
    blurb:
      "Bhains ka gaadha doodh. Malai upar tikki rehti hai — packet wale mein ye baat nahi.",
    unit: "litre",
    price: 80,
    photo: "/photos/doodh.jpg",
    alt: "Glass of thick buffalo milk with a cream line, beside a steel dabba",
    steps: [0.5, 1, 1.5, 2],
    defaultQty: 1,
    cadences: ["daily", "alt", "week3", "once"],
  },
  ghee: {
    id: "ghee",
    name: "Bilona Ghee",
    kind: "Haath se biloya",
    blurb:
      "Lakdi ke bilone se, dheere-dheere. Khushboo sarson ke khet jaisi, daane padte hain sardi mein.",
    unit: "kg",
    price: 1400,
    photo: "/photos/ghee.jpg",
    alt: "Open jar of golden bilona ghee with a wooden churn and brass spoon",
    steps: [0.5, 1, 2],
    defaultQty: 1,
    cadences: ["once", "weekly"],
  },
};

export const AREAS = [
  "Sector 14",
  "Sector 15",
  "Sector 16",
  "Model Town",
  "Urban Estate",
  "PLA",
  "Camp",
  "Patel Nagar",
  "Azad Nagar",
  "Jindal Chowk",
  "Mini Secretariat",
  "Kaimri Road",
  "Agroha Road",
  "Barwala Road",
  "Hansi Road",
  "Satrod",
  "Gangwa",
  "Tosham Road",
] as const;

export const CADENCE_LABEL: Record<Cadence, string> = {
  daily: "Roz subah",
  alt: "Ek din chhod",
  week3: "Hafte mein 3",
  once: "Sirf agli subah",
  weekly: "Har hafte",
};

export const ADDRESS = {
  name: "The Village Fresh Doodh",
  line: "Kaimri Road, near New Grain Market",
  city: "Hisar, Haryana 125001",
  phone: "+91 1662 245 180",
  phoneHref: "tel:+911662245180",
  hours: "Delivery 5:00–7:00 subah · order raat 9 baje tak",
};

export function inr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function qtyLabel(id: ProductId, qty: number) {
  if (id === "doodh") {
    if (qty === 0.5) return "500 ml";
    if (qty === 1) return "1 litre";
    return `${qty} litre`;
  }
  if (qty === 0.5) return "500 g";
  if (qty === 1) return "1 kg";
  return `${qty} kg`;
}

export function perWeek(cadence: Cadence) {
  switch (cadence) {
    case "daily":
      return 7;
    case "alt":
      return 4;
    case "week3":
      return 3;
    case "weekly":
      return 1;
    case "once":
      return 0;
  }
}

export function lineWeekly(id: ProductId, qty: number, cadence: Cadence) {
  return PRODUCTS[id].price * qty * perWeek(cadence);
}

export function lineFirst(id: ProductId, qty: number) {
  return PRODUCTS[id].price * qty;
}

const WEEK = ["Rav", "Som", "Man", "Bud", "Gur", "Suk", "Sha"] as const;

export type DayMark = { key: string; name: string; date: number; on: boolean };

export function comingWeek(cadence: Cadence): DayMark[] {
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() + 1);
  const marks: DayMark[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dow = d.getDay();
    let on = false;
    if (cadence === "daily") on = true;
    else if (cadence === "once") on = i === 0;
    else if (cadence === "weekly") on = dow === 1;
    else if (cadence === "week3") on = dow === 1 || dow === 3 || dow === 5;
    else on = i % 2 === 0;
    marks.push({
      key: d.toISOString().slice(0, 10),
      name: WEEK[dow] ?? "",
      date: d.getDate(),
      on,
    });
  }
  if (cadence === "weekly" && marks[0] && !marks.some((m) => m.on)) {
    marks[0] = { ...marks[0], on: true };
  }
  return marks;
}
