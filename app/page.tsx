"use client";

import { useEffect, useMemo, useState } from "react";

type Vibe = {
  id: string;
  label: string;
  caption: string;
  accent: string;
};

type Greeting = {
  dialect: string;
  phrase: string;
  transliteration: string;
  note: string;
};

const vibes: Vibe[] = [
  {
    id: "classic",
    label: "الترحيب الكلاسيكي",
    caption: "رسمي، أنيق، ويلائم اللقاءات العامة.",
    accent: "accent-classic"
  },
  {
    id: "warm",
    label: "الدفء العائلي",
    caption: "أجواء حميمة ومشاعر قريبة من القلب.",
    accent: "accent-warm"
  },
  {
    id: "modern",
    label: "الحداثة الرقمية",
    caption: "تحية مرحة لمحبي التكنولوجيا وروح المبادرة.",
    accent: "accent-modern"
  }
];

const greetings: Greeting[] = [
  {
    dialect: "العربية الفصحى",
    phrase: "مرحبًا بك",
    transliteration: "Marhaban bik",
    note: "مناسبة لكل المواقف وتُشعر الضيف بالاحترام."
  },
  {
    dialect: "الخليجية",
    phrase: "هلا وغلا",
    transliteration: "Hala w'ghala",
    note: "تعبير ودود يوحي بحفاوة بالغة وكرم."
  },
  {
    dialect: "الشامية",
    phrase: "أهلاً وسهلاً",
    transliteration: "Ahlan wa sahlan",
    note: "تحية مرنة تُستخدم بين الأصدقاء والعائلة."
  },
  {
    dialect: "المغاربية",
    phrase: "مرحبا بيك",
    transliteration: "Marhba bik",
    note: "دارجة في شمال أفريقيا وتحمل معاني الألفة."
  }
];

function describeTimeOfDay(hours: number) {
  if (hours < 5) return "ليلة هادئة";
  if (hours < 12) return "صباح منير";
  if (hours < 17) return "ظهيرة بنكهة القهوة";
  if (hours < 21) return "مساء دافئ";
  return "سهرة ماتعة";
}

export default function Page() {
  const [activeVibe, setActiveVibe] = useState<Vibe>(vibes[1]);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(
    () =>
      new Intl.DateTimeFormat("ar", {
        hour: "numeric",
        minute: "2-digit"
      }).format(now),
    [now]
  );

  const dayDescriptor = useMemo(
    () => describeTimeOfDay(now.getHours()),
    [now]
  );

  return (
    <main className="page">
      <section className="hero">
        <div className={`hero-card ${activeVibe.accent}`}>
          <p className="eyebrow">المجلس الرقمي</p>
          <h1>هلا وعدت الروح إلى بيتها</h1>
          <p className="lead">
            فضاء عربي حديث يرحب بك، يعرّفك على جمال التحايا، ويلهمك أن تبدأ
            حديثًا محبًا.
          </p>
          <div className="time-note">
            <span aria-hidden>🕒</span>
            <div>
              <strong>{formattedTime}</strong>
              <span>{dayDescriptor} ينتظر حديثك الجميل.</span>
            </div>
          </div>
        </div>
        <aside className="vibe-panel">
          <h2>اختر الأجواء التي تناسبك</h2>
          <p className="vibe-desc">
            يتغير المشهد حسب رؤيتك. اضغط على الخيار لتلهم بطاقتك الترحيبية.
          </p>
          <div className="vibe-options">
            {vibes.map((vibe) => (
              <button
                key={vibe.id}
                className={`vibe-button ${vibe.accent} ${
                  activeVibe.id === vibe.id ? "is-active" : ""
                }`}
                onClick={() => setActiveVibe(vibe)}
                type="button"
                aria-pressed={activeVibe.id === vibe.id}
              >
                <strong>{vibe.label}</strong>
                <span>{vibe.caption}</span>
              </button>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid">
        {greetings.map((greeting) => (
          <article className="card" key={greeting.dialect}>
            <header>
              <p className="dialect">{greeting.dialect}</p>
              <h3>{greeting.phrase}</h3>
            </header>
            <dl className="meta">
              <div>
                <dt>اللفظ بالحروف اللاتينية</dt>
                <dd>{greeting.transliteration}</dd>
              </div>
              <div>
                <dt>روح التحية</dt>
                <dd>{greeting.note}</dd>
              </div>
            </dl>
            <footer>
              <span className="tag">#ترحيب</span>
              <span className="tag">#هلا</span>
            </footer>
          </article>
        ))}
      </section>

      <section className="cta">
        <h2>اصنع لحظة لقاء لا تُنسى</h2>
        <p>
          شارك التحية التي تعجبك على منصاتك أو أرسلها لأصدقائك. نشر الدفء يبدأ
          بكلمة &quot;هلا&quot;.
        </p>
        <button
          className={`share-button ${activeVibe.accent}`}
          type="button"
          onClick={() => {
            const shareText = `هلا! ${activeVibe.label} بانتظارك: ${
              greetings[1].phrase
            } – ${greetings[1].note}`;
            if (navigator.share) {
              navigator.share({
                title: "تحية عربية",
                text: shareText
              });
            } else {
              navigator.clipboard.writeText(shareText);
              alert("نُسخت التحية! الصقها حيث تشاء 🤍");
            }
          }}
        >
          شارك التحية الآن
        </button>
      </section>
    </main>
  );
}
