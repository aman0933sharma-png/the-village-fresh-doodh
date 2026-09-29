import { useEffect, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Clock,
  Droplets,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  ShoppingBasket,
  Sunrise,
  X,
} from "lucide-react";
import {
  ADDRESS,
  AREAS,
  CADENCE_LABEL,
  PRODUCTS,
  comingWeek,
  inr,
  lineFirst,
  lineWeekly,
  qtyLabel,
  type Cadence,
  type DayMark,
  type ProductId,
} from "@/data/dairy";
import { useThali, type Customer, type PlacedOrder } from "@/lib/thali";

const NAV = [
  ["#doodh", "Doodh"],
  ["#ghee", "Ghee"],
  ["#kaise", "Kaise aave"],
  ["#gaam", "Gaam"],
  ["#hisar", "Hisar"],
] as const;

export function HomePage() {
  const [menu, setMenu] = useState(false);
  const [sheet, setSheet] = useState(false);
  const count = useThali((s) => s.lines.length);

  useEffect(() => {
    void useThali.persist.rehydrate();
  }, []);

  return (
    <div id="top" className="pb-24 md:pb-0">
      <div className="phulkari" aria-hidden />
      <header className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <a href="#top" className="flex items-center gap-3">
            <span className="logo-drop" aria-hidden />
            <span className="leading-none">
              <span className="hidden text-xs font-semibold tracking-widest text-muted uppercase sm:block">
                The Village Fresh
              </span>
              <span className="display block text-2xl">Doodh</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} className="text-ink hover:text-clay">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-ink"
              onClick={() => setSheet(true)}
            >
              <ShoppingBasket className="size-4" aria-hidden />
              <span className="hidden sm:inline">Thali</span>
              {count > 0 ? <span>{count}</span> : null}
            </button>
            <button
              type="button"
              className="icon-btn md:hidden"
              aria-expanded={menu}
              aria-label={menu ? "Menu band karo" : "Menu kholo"}
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="flex flex-col gap-1 border-t border-line px-5 py-3 md:hidden">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="flex min-h-11 items-center font-semibold"
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <Hero />
        <Trust />
        <Products />
        <How />
        <Story />
        <Voices />
        <Faq />
        <Orders />
      </main>
      <Footer />

      {!sheet && (
        <div className="dock md:hidden">
          <a href="#doodh" className="btn btn-clay flex-1">
            Doodh · ₹80
          </a>
          <button type="button" className="btn btn-ink flex-1" onClick={() => setSheet(true)}>
            Thali{count > 0 ? ` · ${count}` : ""}
          </button>
        </div>
      )}

      <Checkout open={sheet} onOpenChange={setSheet} />
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-10 md:grid-cols-2 md:gap-12 md:py-16">
      <div>
        <p className="kicker rise">Ghani ghani ram ram · Hisar</p>
        <h1 className="display display-xl rise rise-2 mt-4 text-ink">
          Ghar ka doodh.
          <span className="block text-clay">Packet wala nahi.</span>
        </h1>
        <p className="rise rise-3 mt-5 max-w-xl text-lg text-muted">
          Bhains ka taaza doodh, subah 5 se 7, thare darwaje.{" "}
          <strong className="font-semibold text-ink">₹80 litre</strong>. Saath mein
          haath-biloya ghee, <strong className="font-semibold text-ink">₹1400 kilo</strong>.
          Hisar, Haryana — gaam se seedha.
        </p>
        <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
          <a className="btn btn-clay" href="#doodh">
            Doodh shuru karo
          </a>
          <a className="btn btn-ghost" href="#ghee">
            Bilona ghee dekho
          </a>
        </div>
        <dl className="mt-8 grid grid-cols-3 gap-3 text-sm">
          <Stat k="Doodh" v="₹80" s="pratilitre" />
          <Stat k="Ghee" v="₹1400" s="pratikilo" />
          <Stat k="Slot" v="5–7" s="subah" />
        </dl>
      </div>
      <div className="relative">
        <img
          src="/photos/fields.jpg"
          alt="Brass milk cans in a mustard field at dawn, a buffalo grazing beyond, near Hisar"
          width={1792}
          height={1008}
          className="frame ratio-land w-full object-cover"
        />
        <div className="sheen frame" />
        <p className="absolute top-4 right-4 rounded-full bg-foam/95 px-3 py-2 text-sm font-semibold text-ink">
          Aaj ka batch · 4:10 AM
        </p>
        <div className="absolute bottom-4 left-4">
          <MilkGlass />
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v, s }: { k: string; v: string; s: string }) {
  return (
    <div className="card px-3 py-3">
      <dt className="text-xs font-semibold tracking-widest text-muted uppercase">{k}</dt>
      <dd className="display mt-1 text-2xl">{v}</dd>
      <dd className="text-xs text-muted">{s}</dd>
    </div>
  );
}

function MilkGlass() {
  return (
    <div className="glass-wrap" aria-hidden>
      <div className="glass-lip" />
      <div className="glass-bowl">
        <div className="milk-fill">
          <div className="milk-wave" />
          <div className="cream-line" />
          <span className="bubble bubble-a" />
          <span className="bubble bubble-b" />
          <span className="bubble bubble-c" />
        </div>
      </div>
    </div>
  );
}

function Trust() {
  const items = [
    { icon: Sunrise, t: "Roz subah, time pe", d: "5 se 7 baje can darwaje. Raat 9 tak bol de." },
    { icon: Droplets, t: "Malai upar", d: "Bhains ka gaadha doodh. Koi powder, koi milawat nahi." },
    { icon: ShieldCheck, t: "Bilona, dheere", d: "Ghee lakdi ke churn se. Haath se, ghar jaisa." },
    { icon: MapPin, t: "Hisar + aas-paas", d: "Shehar ke sector, aur Agroha, Gangwa, Satrod." },
  ];
  return (
    <section className="mx-auto grid max-w-6xl gap-3 px-5 pb-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon: Icon, t, d }) => (
        <article key={t} className="card flex gap-3 p-4">
          <Icon className="mt-0.5 size-5 shrink-0 text-clay" aria-hidden />
          <div>
            <h2 className="font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-muted">{d}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function Products() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12" id="products">
      <p className="kicker">Thaari thali</p>
      <h2 className="display mt-3 text-4xl md:text-5xl">Aaj kya mangwayenge?</h2>
      <p className="mt-3 max-w-2xl text-muted">
        Litre aur din chun lo. Thali mein daal ke naam, mobile aur area likh do —
        agli subah nikal javega.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ProductCard id="doodh" />
        <ProductCard id="ghee" />
      </div>
    </section>
  );
}

function ProductCard({ id }: { id: ProductId }) {
  const product = PRODUCTS[id];
  const line = useThali((s) => s.lines.find((l) => l.productId === id));
  const upsert = useThali((s) => s.upsert);
  const remove = useThali((s) => s.remove);
  const [qty, setQty] = useState(product.defaultQty);
  const [cadence, setCadence] = useState<Cadence>(product.cadences[0]);

  useEffect(() => {
    if (!line) return;
    setQty(line.qty);
    setCadence(line.cadence);
  }, [line]);

  const weekly = lineWeekly(id, qty, cadence);
  const same = Boolean(line && line.qty === qty && line.cadence === cadence);

  return (
    <article id={id} className="card overflow-hidden">
      <div className="relative">
        <img
          src={product.photo}
          alt={product.alt}
          width={1600}
          height={1200}
          className="frame ratio-land w-full object-cover"
        />
        <p className="absolute bottom-3 left-3 rounded-full bg-foam/95 px-3 py-1.5 text-sm font-semibold">
          {product.kind}
        </p>
      </div>
      <div className="p-5">
        <div className="flex items-end justify-between gap-3">
          <h3 className="display text-3xl">{product.name}</h3>
          <p className="text-right">
            <span className="display block text-3xl text-clay">{inr(product.price)}</span>
            <span className="text-xs text-muted">/ {product.unit}</span>
          </p>
        </div>
        <p className="mt-3 text-muted">{product.blurb}</p>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">Kitna?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.steps.map((step) => (
              <button
                key={step}
                type="button"
                className="chip"
                aria-pressed={qty === step}
                onClick={() => setQty(step)}
              >
                {qtyLabel(id, step)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">Kab aave?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.cadences.map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={cadence === c}
                onClick={() => setCadence(c)}
              >
                {CADENCE_LABEL[c]}
              </button>
            ))}
          </div>
        </fieldset>

        <WeekStrip cadence={cadence} />

        <p className="mt-4 text-sm text-muted">
          {qtyLabel(id, qty)} · {CADENCE_LABEL[cadence]} · agli delivery{" "}
          <strong className="text-ink">{inr(lineFirst(id, qty))}</strong>
          {weekly > 0 ? (
            <>
              {" "}
              · hafte ka <strong className="text-ink">{inr(weekly)}</strong>
            </>
          ) : (
            " · ek baar"
          )}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-clay"
            disabled={same}
            onClick={() => upsert({ productId: id, qty, cadence })}
          >
            {same ? "Thali mein hai" : line ? "Thali update karo" : "Thali mein daal"}
          </button>
          {line && (
            <button type="button" className="btn btn-ghost" onClick={() => remove(id)}>
              Hata de
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function WeekStrip({ cadence }: { cadence: Cadence }) {
  const [days, setDays] = useState<DayMark[] | null>(null);
  useEffect(() => {
    setDays(comingWeek(cadence));
  }, [cadence]);

  return (
    <div className="mt-4">
      <p className="mb-2 text-xs font-semibold tracking-widest text-muted uppercase">
        Agle saat din
      </p>
      <div className="grid grid-cols-7 gap-1.5">
        {days
          ? days.map((d) => (
              <div key={d.key} className={d.on ? "day on" : "day"}>
                <span>{d.name}</span>
                <strong className="display text-base">{d.date}</strong>
              </div>
            ))
          : Array.from({ length: 7 }, (_, i) => <div key={i} className="day" />)}
      </div>
    </div>
  );
}

function How() {
  const steps = [
    ["01", "Maang bata de", "Litre ya kilo, aur kin dinon pe. Thali yahin pe ban jave."],
    ["02", "Raat 9 se pehle", "Uske baad wali subah nikal jave. Aaj ka doodh kal milsi."],
    ["03", "Can darwaje", "5 se 7 baje. Khaali can agli subah le jayege. Paisa ghar pe — cash ya UPI."],
  ];
  return (
    <section id="kaise" className="mx-auto max-w-6xl px-5 py-12">
      <p className="kicker">Kaise pohonche</p>
      <h2 className="display mt-3 text-4xl md:text-5xl">Seedha, bina jhanjhat.</h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map(([n, t, d]) => (
          <li key={n} className="card p-5">
            <span className="display text-4xl text-clay">{n}</span>
            <h3 className="mt-3 text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-muted">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Story() {
  return (
    <section id="gaam" className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-8 md:grid-cols-2">
      <div className="grid grid-cols-5 gap-3">
        <img
          src="/photos/doorstep.jpg"
          alt="Morning milk delivery cans at a Hisar doorstep, cycle in the lane"
          width={1728}
          height={1152}
          className="frame ratio-tall col-span-3 w-full object-cover"
        />
        <img
          src="/photos/fields.jpg"
          alt="Mustard fields and a buffalo at dawn outside Hisar"
          width={1792}
          height={1008}
          className="frame ratio-tall col-span-2 mt-8 w-full object-cover"
        />
      </div>
      <div>
        <p className="kicker">Gaam ki baat</p>
        <h2 className="display mt-3 text-4xl md:text-5xl">Hisar se, khet ki taraf se.</h2>
        <p className="mt-4 text-muted">
          Kaimri Road pe, New Grain Market ke paas, hamara collection hai. Bhains
          Hisar ke aas-paas se aave — Agroha, Gangwa, Satrod. Doodh shaam ko thanda
          pada hua nahi, subah ka. Ghee lakdi ke bilone se, dheere, jaise ghar pe
          ma banave.
        </p>
        <p className="mt-3 text-muted">
          Shehar mein gaam ka swaad. Itna hi vaada hai — aur itna kaafi hai.
        </p>
      </div>
    </section>
  );
}

function Voices() {
  const quotes = [
    ["Malai itni ki chai ka rang hi badal gya. Packet wale mein ye baat kahan.", "Sunita", "Sector 14"],
    ["Ghee ki khushboo bilona wali hai. Roti pe laga ke farak pata chal jave.", "Ramphal", "Agroha Road"],
    ["Roz time pe aave. Gaam ka swaad, shehar ke darwaje.", "Kavita", "Model Town"],
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <p className="kicker">Log kya kehve hain</p>
      <h2 className="display mt-3 text-4xl md:text-5xl">Darwaje wali baat.</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {quotes.map(([q, name, area]) => (
          <figure key={name} className="card p-5">
            <blockquote className="display text-2xl leading-snug">“{q}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold">
              {name}
              <span className="block font-normal text-muted">{area}, Hisar</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    ["Delivery kitne baje?", "Subah 5:00 se 7:00, Hisar shehar aur nazdeeki gaam."],
    ["Kitne baje tak order?", "Raat 9 baje se pehle. Uske baad agli subah ki delivery."],
    ["Doodh kaunsa, kitne ka?", "Bhains ka Ghar ka Doodh, ₹80 pratilitre. 500 ml se 2 litre."],
    ["Ghee kasaa?", "Bilona, lakdi ke churn se. ₹1400 pratikilo. 500 g, 1 kg ya 2 kg."],
    ["Paisa kab?", "Darwaje pe. Cash ya UPI. Pehle se koi wallet nahi."],
    ["Kahan pahunchoge?", "Hisar ke sector, Model Town, Urban Estate, aur Agroha, Gangwa, Satrod, Barwala, Hansi road."],
  ];
  return (
    <section id="sawal" className="mx-auto max-w-3xl px-5 py-8">
      <p className="kicker">Sawal-jawab</p>
      <h2 className="display mt-3 text-4xl">Jo poochhte ho</h2>
      <div className="mt-4">
        {items.map(([q, a]) => (
          <details key={q} className="faq">
            <summary>
              {q}
              <span className="text-clay" aria-hidden>
                +
              </span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Orders() {
  const orders = useThali((s) => s.orders);
  const cancel = useThali((s) => s.cancel);
  return (
    <section id="orders" className="mx-auto max-w-3xl px-5 py-10">
      <p className="kicker">Thaare order</p>
      <h2 className="display mt-3 text-4xl">Jo mangwaya</h2>
      {orders.length === 0 ? (
        <p className="mt-3 text-muted">
          Abhi koi order nahi. Pehla doodh aaj thali mein daal lo — kal subah milsi.
        </p>
      ) : (
        <ul className="mt-5 grid gap-3">
          {orders.map((order) => (
            <li key={order.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted">
                    {order.customer.name} · {order.customer.area}
                  </p>
                </div>
                <p className="display text-2xl text-clay">{inr(order.firstBill)}</p>
              </div>
              <ul className="mt-3 text-sm">
                {order.lines.map((l) => (
                  <li key={l.productId}>
                    {PRODUCTS[l.productId].name} · {qtyLabel(l.productId, l.qty)} ·{" "}
                    {CADENCE_LABEL[l.cadence]}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-muted">
                {order.weekly > 0 ? `Hafte ka ${inr(order.weekly)} · ` : ""}
                {new Date(order.placedAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <button type="button" className="btn btn-ghost mt-3" onClick={() => cancel(order.id)}>
                Ye order hata de
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer id="hisar" className="mt-6 border-t border-line bg-ink text-foam">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-widest text-cream uppercase">The Village Fresh Doodh</p>
          <p className="display mt-3 text-4xl">Hisar, Haryana.</p>
          <p className="mt-4 max-w-md text-cream">
            {ADDRESS.line}
            <br />
            {ADDRESS.city}
          </p>
        </div>
        <address className="not-italic">
          <a className="flex min-h-11 items-center gap-3 font-semibold" href={ADDRESS.phoneHref}>
            <Phone className="size-5 text-cream" aria-hidden />
            {ADDRESS.phone}
          </a>
          <p className="mt-2 flex items-start gap-3 text-cream">
            <Clock className="mt-0.5 size-5 shrink-0" aria-hidden />
            {ADDRESS.hours}
          </p>
          <p className="mt-2 flex items-start gap-3 text-cream">
            <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden />
            {ADDRESS.line}, {ADDRESS.city}
          </p>
        </address>
      </div>
      <div className="phulkari" />
    </footer>
  );
}

function validate(c: Customer) {
  if (c.name.trim().length < 2) return "Naam likh de — kam se kam do akshar.";
  if (!/^[6-9]\d{9}$/.test(c.phone.trim())) {
    return "Mobile 10 digit ka hona chahiye, 6, 7, 8 ya 9 se shuru.";
  }
  if (!c.area) return "Area chun le, taaki can sahi darwaje pahunche.";
  return null;
}

function Checkout({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const lines = useThali((s) => s.lines);
  const remove = useThali((s) => s.remove);
  const place = useThali((s) => s.place);
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    area: "",
    landmark: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<PlacedOrder | null>(null);

  const weekly = lines.reduce((sum, l) => sum + lineWeekly(l.productId, l.qty, l.cadence), 0);
  const first = lines.reduce((sum, l) => sum + lineFirst(l.productId, l.qty), 0);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (lines.length === 0) {
      setError("Pehle doodh ya ghee thali mein daal.");
      return;
    }
    const msg = validate(customer);
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    setDone(place(customer));
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) setDone(null);
        onOpenChange(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay" />
        <Dialog.Content className="sheet">
          <div className="flex items-start justify-between gap-3 px-5 pt-5">
            <div>
              <Dialog.Title className="display text-3xl">
                {done ? "Ho gaya." : "Thaari thali"}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                {done
                  ? "Kal subah 5 se 7 ke beech, thare darwaje."
                  : "Jo chuna hai, aur kahan pahunchana hai."}
              </Dialog.Description>
            </div>
            <Dialog.Close className="icon-btn" aria-label="Band karo">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div className="overflow-y-auto px-5 pt-4 pb-6">
            {done ? (
              <Success order={done} />
            ) : lines.length === 0 ? (
              <div>
                <p className="text-muted">Abhi thali khaali hai. Doodh ya ghee chun lo.</p>
                <Dialog.Close asChild>
                  <a className="btn btn-clay mt-4" href="#doodh">
                    Doodh dekh
                  </a>
                </Dialog.Close>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-3">
                <ul className="grid gap-2">
                  {lines.map((l) => (
                    <li key={l.productId} className="flex items-center justify-between gap-3 rounded-2xl bg-bg px-3 py-3">
                      <div>
                        <p className="font-semibold">{PRODUCTS[l.productId].name}</p>
                        <p className="text-sm text-muted">
                          {qtyLabel(l.productId, l.qty)} · {CADENCE_LABEL[l.cadence]} ·{" "}
                          {inr(lineFirst(l.productId, l.qty))}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label={`${PRODUCTS[l.productId].name} hata de`}
                        onClick={() => remove(l.productId)}
                      >
                        <X className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="text-sm">
                  Kal ka hisaab <strong>{inr(first)}</strong>
                  {weekly > 0 ? ` · hafte ka ${inr(weekly)}` : " · ek baar ka samaan"}
                </p>

                <label className="grid gap-1 text-sm font-semibold">
                  Naam
                  <input
                    className="field font-normal"
                    value={customer.name}
                    autoComplete="name"
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold">
                  Mobile
                  <input
                    className="field font-normal"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                    }
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold">
                  Area, Hisar
                  <select
                    className="field font-normal"
                    value={customer.area}
                    onChange={(e) => setCustomer({ ...customer, area: e.target.value })}
                  >
                    <option value="">Chun lo</option>
                    {AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-semibold">
                  Gali / makan
                  <input
                    className="field font-normal"
                    value={customer.landmark}
                    placeholder="Neem wala makan, pehla floor"
                    onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                  />
                </label>
                {error && <p className="text-sm font-semibold text-clay">{error}</p>}
                <button type="submit" className="btn btn-clay mt-1">
                  Mangwa do · {inr(first)}
                </button>
                <p className="text-xs text-muted">Paisa darwaje pe — cash ya UPI. Ye order isi phone pe save rehta hai.</p>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Success({ order }: { order: PlacedOrder }) {
  return (
    <div>
      <p className="display text-4xl text-clay">{order.id}</p>
      <p className="mt-3">
        {order.customer.name}, {order.customer.area}
        {order.customer.landmark ? ` · ${order.customer.landmark}` : ""}. Mobile {order.customer.phone}.
      </p>
      <ul className="mt-3 text-sm">
        {order.lines.map((l) => (
          <li key={l.productId}>
            {PRODUCTS[l.productId].name} · {qtyLabel(l.productId, l.qty)} · {CADENCE_LABEL[l.cadence]}
          </li>
        ))}
      </ul>
      <p className="mt-3 font-semibold">
        Kal ka hisaab {inr(order.firstBill)}
        {order.weekly > 0 ? ` · hafte ka ${inr(order.weekly)}` : ""}
      </p>
      <p className="mt-2 text-sm text-muted">
        Koi gadbad ho to {ADDRESS.phone} pe bol dena. Ghani ghani.
      </p>
    </div>
  );
}
