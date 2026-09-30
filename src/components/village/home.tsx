import { useEffect, useRef, useState, type FormEvent } from "react";
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
import { useBoliStore, useCopy } from "@/lib/boli";

export function HomePage() {
  const [menu, setMenu] = useState(false);
  const [sheet, setSheet] = useState(false);
  const count = useThali((s) => s.lines.length);
  const { lang, setLang, t } = useCopy();

  useEffect(() => {
    void useThali.persist.rehydrate();
    void useBoliStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "haryanvi" ? "bgc" : "hi";
  }, [lang]);

  const nav = [
    ["#doodh", t.nav.doodh],
    ["#lassi", t.nav.lassi],
    ["#ghee", t.nav.ghee],
    ["#kaise", t.nav.kaise],
    ["#gaam", t.nav.gaam],
    ["#hisar", t.nav.hisar],
  ] as const;

  return (
    <div id="top" className={lang === "haryanvi" ? "lang-hry pb-24 md:pb-0" : "pb-24 md:pb-0"}>
      <div className="phulkari" aria-hidden />
      <header className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <a href="#top" className="flex items-center">
            <img
              src="/logo.png"
              alt="The Village Fresh Dhoodh"
              width={512}
              height={512}
              className="brand-logo"
            />
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            {nav.map(([href, label]) => (
              <a key={href} href={href} className="text-ink hover:text-clay">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="lang-btn"
              onClick={() => setLang(lang === "haryanvi" ? "roman" : "haryanvi")}
            >
              {lang === "haryanvi" ? "Roman" : "हरियाणवी"}
            </button>
            <button
              type="button"
              className="btn btn-ink"
              onClick={() => setSheet(true)}
            >
              <ShoppingBasket className="size-4" aria-hidden />
              <span className="hidden sm:inline">{t.thali}</span>
              {count > 0 ? <span>{count}</span> : null}
            </button>
            <button
              type="button"
              className="icon-btn md:hidden"
              aria-expanded={menu}
              aria-label={menu ? t.menuClose : t.menuOpen}
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="flex flex-col gap-1 border-t border-line px-5 py-3 md:hidden">
            {nav.map(([href, label]) => (
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
            {t.dockDoodh} · ₹80
          </a>
          <button type="button" className="btn btn-ink flex-1" onClick={() => setSheet(true)}>
            {t.thali}{count > 0 ? ` · ${count}` : ""}
          </button>
        </div>
      )}

      <Checkout open={sheet} onOpenChange={setSheet} />
    </div>
  );
}

function Hero() {
  const { t } = useCopy();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const start = () => {
      void video.play().catch(() => {});
    };
    start();
    video.addEventListener("canplay", start);
    return () => video.removeEventListener("canplay", start);
  }, []);

  return (
    <section className="cinema">
      <div className="cinema-stage">
        <video
          ref={videoRef}
          className="cinema-bg pour-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/photos/fields.jpg"
          aria-hidden
        >
          <source src="/photos/pour.mp4" type="video/mp4" />
        </video>
        <img
          src="/photos/fields.jpg"
          alt=""
          width={1792}
          height={1008}
          className="cinema-bg pour-still"
        />
        <p className="absolute bottom-3 left-4 z-10 rounded-full bg-foam/95 px-3 py-1.5 text-sm font-semibold text-ink md:hidden">
          {t.pour}
        </p>
      </div>
      <div className="cinema-shade" aria-hidden />
      <div className="cinema-grain" aria-hidden />
      <div className="cinema-copy mx-auto grid max-w-6xl items-center gap-8 px-5 py-8 md:grid-cols-2 md:py-20">
        <div>
          <img
            src="/logo.png"
            alt=""
            width={512}
            height={512}
            className="brand-mark rise"
          />
          <p className="kicker rise rise-2 mt-4">{t.kicker}</p>
          <h1 className="display display-xl rise rise-2 mt-4 text-ink">
            {t.heroTitle}
            <span className="block text-clay">{t.heroTitle2}</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-xl text-lg text-muted">
            {t.heroBody}{" "}
            <strong className="font-semibold text-ink">₹80</strong>
            {" · "}
            <strong className="font-semibold text-ink">₹40</strong>
            {" · "}
            <strong className="font-semibold text-ink">₹1400</strong>
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <a className="btn btn-clay" href="#doodh">
              {t.startDoodh}
            </a>
            <a className="btn btn-ghost" href="#ghee">
              {t.seeGhee}
            </a>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-3 text-sm">
            <Stat k={t.statDoodh} v="₹80" s={t.perLitre} />
            <Stat k={t.statGhee} v="₹1400" s={t.perKilo} />
            <Stat k={t.statSlot} v="5–7" s={t.morning} />
          </dl>
        </div>
        <p className="hidden justify-self-end self-end rounded-full bg-foam/90 px-3 py-2 text-sm font-semibold text-ink md:block">
          {t.pour}
        </p>
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

function Trust() {
  const { t } = useCopy();
  const icons = [Sunrise, Droplets, ShieldCheck, MapPin];
  return (
    <section className="mx-auto grid max-w-6xl gap-3 px-5 pb-6 sm:grid-cols-2 lg:grid-cols-4">
      {t.trust.map(({ t: title, d }, i) => {
        const Icon = icons[i] ?? Sunrise;
        return (
          <article key={title} className="card flex gap-3 p-4">
            <Icon className="mt-0.5 size-5 shrink-0 text-clay" aria-hidden />
            <div>
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function Products() {
  const { t } = useCopy();
  return (
    <section className="mx-auto max-w-6xl px-5 py-12" id="products">
      <p className="kicker">{t.productsKicker}</p>
      <h2 className="display mt-3 text-4xl md:text-5xl">{t.productsTitle}</h2>
      <p className="mt-3 max-w-2xl text-muted">{t.productsBody}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ProductCard id="doodh" />
        <ProductCard id="lassi" />
        <ProductCard id="ghee" />
      </div>
    </section>
  );
}

function ProductCard({ id }: { id: ProductId }) {
  const { t, lang } = useCopy();
  const product = PRODUCTS[id];
  const copy = t.products[id];
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
          width={id === "ghee" ? 1080 : 1600}
          height={id === "ghee" ? 1080 : 1200}
          className={
            id === "ghee" ? "w-full" : "frame ratio-land w-full object-cover"
          }
        />
        {id !== "ghee" && (
          <p className="absolute bottom-3 left-3 rounded-full bg-foam/95 px-3 py-1.5 text-sm font-semibold">
            {copy.kind}
          </p>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-end justify-between gap-3">
          <h3 className="display text-3xl">{copy.name}</h3>
          <p className="text-right">
            <span className="display block text-3xl text-clay">{inr(product.price)}</span>
            <span className="text-xs text-muted">/ {copy.unit}</span>
          </p>
        </div>
        <p className={id === "lassi" ? "display mt-3 text-2xl text-ink" : "mt-3 text-muted"}>
          {copy.blurb}
        </p>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">{t.howMuch}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.steps.map((step) => (
              <button
                key={step}
                type="button"
                className="chip"
                aria-pressed={qty === step}
                onClick={() => setQty(step)}
              >
                {qtyLabel(id, step, lang)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">{t.when}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.cadences.map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={cadence === c}
                onClick={() => setCadence(c)}
              >
                {t.cadence[c]}
              </button>
            ))}
          </div>
        </fieldset>

        <WeekStrip cadence={cadence} />

        <p className="mt-4 text-sm text-muted">
          {qtyLabel(id, qty, lang)} · {t.cadence[cadence]} · {t.nextDrop}{" "}
          <strong className="text-ink">{inr(lineFirst(id, qty))}</strong>
          {weekly > 0 ? (
            <>
              {" "}
              · {t.weekOf} <strong className="text-ink">{inr(weekly)}</strong>
            </>
          ) : (
            ` · ${t.once}`
          )}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-clay"
            disabled={same}
            onClick={() => upsert({ productId: id, qty, cadence })}
          >
            {same ? t.inThali : line ? t.updateThali : t.addThali}
          </button>
          {line && (
            <button type="button" className="btn btn-ghost" onClick={() => remove(id)}>
              {t.remove}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function WeekStrip({ cadence }: { cadence: Cadence }) {
  const { t } = useCopy();
  const [days, setDays] = useState<DayMark[] | null>(null);
  useEffect(() => {
    setDays(comingWeek(cadence));
  }, [cadence]);

  return (
    <div className="mt-4">
      <p className="mb-2 text-xs font-semibold tracking-widest text-muted uppercase">
        {t.nextDays}
      </p>
      <div className="grid grid-cols-7 gap-1.5">
        {days
          ? days.map((d) => (
              <div key={d.key} className={d.on ? "day on" : "day"}>
                <span>{t.days[d.name] ?? d.name}</span>
                <strong className="display text-base">{d.date}</strong>
              </div>
            ))
          : Array.from({ length: 7 }, (_, i) => <div key={i} className="day" />)}
      </div>
    </div>
  );
}

function How() {
  const { t } = useCopy();
  return (
    <section id="kaise" className="mx-auto max-w-6xl px-5 py-12">
      <p className="kicker">{t.howKicker}</p>
      <h2 className="display mt-3 text-4xl md:text-5xl">{t.howTitle}</h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {t.steps.map((step, i) => (
          <li key={step.t} className="card p-5">
            <span className="display text-4xl text-clay">0{i + 1}</span>
            <h3 className="mt-3 text-xl font-semibold">{step.t}</h3>
            <p className="mt-2 text-muted">{step.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Story() {
  const { t } = useCopy();
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
        <p className="kicker">{t.storyKicker}</p>
        <h2 className="display mt-3 text-4xl md:text-5xl">{t.storyTitle}</h2>
        <p className="mt-4 text-muted">{t.story1}</p>
        <p className="mt-3 text-muted">{t.story2}</p>
      </div>
    </section>
  );
}

function Voices() {
  const { t } = useCopy();
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <p className="kicker">{t.voicesKicker}</p>
      <h2 className="display mt-3 text-4xl md:text-5xl">{t.voicesTitle}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {t.quotes.map((item) => (
          <figure key={item.name} className="card p-5">
            <blockquote className="display text-2xl leading-snug">“{item.q}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold">
              {item.name}
              <span className="block font-normal text-muted">{item.area}, Hisar</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useCopy();
  return (
    <section id="sawal" className="mx-auto max-w-3xl px-5 py-8">
      <p className="kicker">{t.faqKicker}</p>
      <h2 className="display mt-3 text-4xl">{t.faqTitle}</h2>
      <div className="mt-4">
        {t.faq.map((item) => (
          <details key={item.q} className="faq">
            <summary>
              {item.q}
              <span className="text-clay" aria-hidden>
                +
              </span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Orders() {
  const orders = useThali((s) => s.orders);
  const cancel = useThali((s) => s.cancel);
  const { t, lang } = useCopy();
  return (
    <section id="orders" className="mx-auto max-w-3xl px-5 py-10">
      <p className="kicker">{t.ordersKicker}</p>
      <h2 className="display mt-3 text-4xl">{t.ordersTitle}</h2>
      {orders.length === 0 ? (
        <p className="mt-3 text-muted">{t.ordersEmpty}</p>
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
                    {t.products[l.productId].name} · {qtyLabel(l.productId, l.qty, lang)} ·{" "}
                    {t.cadence[l.cadence]}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-muted">
                {order.weekly > 0 ? `${t.weekBill} ${inr(order.weekly)} · ` : ""}
                {new Date(order.placedAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <button type="button" className="btn btn-ghost mt-3" onClick={() => cancel(order.id)}>
                {t.cancelOrder}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Footer() {
  const { t } = useCopy();
  return (
    <footer id="hisar" className="mt-6 border-t border-line bg-ink text-foam">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2">
        <div>
          <img
            src="/logo.png"
            alt=""
            width={512}
            height={512}
            className="brand-logo"
          />
          <p className="mt-4 text-sm font-semibold tracking-widest text-cream uppercase">The Village Fresh Doodh</p>
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
            {t.hours}
          </p>
          <p className="mt-2 flex items-start gap-3 text-cream">
            <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden />
            {ADDRESS.line}, {ADDRESS.city}
          </p>
        </address>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-8 text-sm font-semibold tracking-wide text-cream">
        {t.owner}
      </p>
      <div className="phulkari" />
    </footer>
  );
}

function validate(c: Customer, t: ReturnType<typeof useCopy>["t"]) {
  if (c.name.trim().length < 2) return t.errName;
  if (!/^[6-9]\d{9}$/.test(c.phone.trim())) return t.errPhone;
  if (!c.area) return t.errArea;
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
  const { t, lang } = useCopy();
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
      setError(t.errEmpty);
      return;
    }
    const msg = validate(customer, t);
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
                {done ? t.doneTitle : t.thaliTitle}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                {done ? t.doneNote : t.thaliNote}
              </Dialog.Description>
            </div>
            <Dialog.Close className="icon-btn" aria-label={t.close}>
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div className="overflow-y-auto px-5 pt-4 pb-6">
            {done ? (
              <Success order={done} />
            ) : lines.length === 0 ? (
              <div>
                <p className="text-muted">{t.emptyThali}</p>
                <Dialog.Close asChild>
                  <a className="btn btn-clay mt-4" href="#doodh">
                    {t.seeDoodh}
                  </a>
                </Dialog.Close>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-3">
                <ul className="grid gap-2">
                  {lines.map((l) => (
                    <li key={l.productId} className="flex items-center justify-between gap-3 rounded-2xl bg-bg px-3 py-3">
                      <div>
                        <p className="font-semibold">{t.products[l.productId].name}</p>
                        <p className="text-sm text-muted">
                          {qtyLabel(l.productId, l.qty, lang)} · {t.cadence[l.cadence]} ·{" "}
                          {inr(lineFirst(l.productId, l.qty))}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label={`${t.products[l.productId].name} ${t.remove}`}
                        onClick={() => remove(l.productId)}
                      >
                        <X className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="text-sm">
                  {t.tomorrowBill} <strong>{inr(first)}</strong>
                  {weekly > 0 ? ` · ${t.weekOf} ${inr(weekly)}` : ` · ${t.onceGoods}`}
                </p>

                <label className="grid gap-1 text-sm font-semibold">
                  {t.name}
                  <input
                    className="field font-normal"
                    value={customer.name}
                    autoComplete="name"
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold">
                  {t.mobile}
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
                  {t.area}
                  <select
                    className="field font-normal"
                    value={customer.area}
                    onChange={(e) => setCustomer({ ...customer, area: e.target.value })}
                  >
                    <option value="">{t.pick}</option>
                    {AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-semibold">
                  {t.lane}
                  <input
                    className="field font-normal"
                    value={customer.landmark}
                    placeholder={t.laneHint}
                    onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                  />
                </label>
                {error && <p className="text-sm font-semibold text-clay">{error}</p>}
                <button type="submit" className="btn btn-clay mt-1">
                  {t.orderBtn} · {inr(first)}
                </button>
                <p className="text-xs text-muted">{t.payNote}</p>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Success({ order }: { order: PlacedOrder }) {
  const { t, lang } = useCopy();
  return (
    <div>
      <p className="display text-4xl text-clay">{order.id}</p>
      <p className="mt-3">
        {order.customer.name}, {order.customer.area}
        {order.customer.landmark ? ` · ${order.customer.landmark}` : ""}. {t.mobileWord} {order.customer.phone}.
      </p>
      <ul className="mt-3 text-sm">
        {order.lines.map((l) => (
          <li key={l.productId}>
            {t.products[l.productId].name} · {qtyLabel(l.productId, l.qty, lang)} · {t.cadence[l.cadence]}
          </li>
        ))}
      </ul>
      <p className="mt-3 font-semibold">
        {t.tomorrowBill} {inr(order.firstBill)}
        {order.weekly > 0 ? ` · ${t.weekOf} ${inr(order.weekly)}` : ""}
      </p>
      <p className="mt-2 text-sm text-muted">
        {lang === "haryanvi"
          ? `${t.callNote} ${ADDRESS.phone} पे बोल देना। घणी घणी।`
          : `${t.callNote} ${ADDRESS.phone} pe bol dena. Ghani ghani.`}
      </p>
    </div>
  );
}
