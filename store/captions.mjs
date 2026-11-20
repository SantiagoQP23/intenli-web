// Text for the Google Play listing images, per listing language.
// Play's rules: no "best", "#1", "top", "new", "free", prices or calls to
// action ("download now"). Alt text: 140 characters at most.

export const listings = {
  "es-419": {
    lang: "es",
    feature: {
      headline: "Tu dinero y tus deudas, en un solo lugar.",
      alt: "Intenli Money: tu dinero y tus deudas, en un solo lugar. Ilustración de una alcancía con una moneda.",
    },
    icon: { alt: "Ícono de Intenli Money: una alcancía con una moneda azul." },
    phone: [
      {
        shot: "home",
        caption: "Tu dinero y tus deudas, en un solo lugar",
        alt: "Inicio con el saldo total, el saldo después de deudas y botones para gasto, ingreso, transferencia y deuda.",
      },
      {
        shot: "debts",
        caption: "Lo que debes y lo que te deben",
        alt: "Deudas por pagar y por cobrar, con el total de cada lado y el avance de cada pago.",
      },
      {
        shot: "accounts",
        caption: "Cuentas y cajas para cada gasto",
        alt: "Cuentas de banco, efectivo y ahorros, y cajas de presupuesto para comida y servicios.",
      },
      {
        shot: "activity",
        caption: "Cada movimiento, por día, semana o mes",
        alt: "Movimientos de noviembre agrupados por día, con ingresos, gastos y el neto del mes.",
      },
      {
        shot: "debt",
        caption: "Abonos y aumentos, con su historial",
        alt: "Detalle de un préstamo con lo que falta pagar, botones para pagar o aumentar, y el historial de abonos.",
      },
      {
        shot: "spaces",
        caption: "Un espacio para tu vida, tu negocio y tu familia",
        alt: "Selector de espacios: Personal, Familia compartido y un negocio, cada uno con su rol y moneda.",
      },
    ],
    tablet: [
      { shot: "home", alt: "Inicio en tableta con el saldo total y el saldo después de deudas." },
      { shot: "accounts", alt: "Cuentas y cajas de presupuesto en tableta." },
      { shot: "activity", alt: "Movimientos del mes agrupados por día en tableta." },
      { shot: "debt", alt: "Detalle de un préstamo con su historial de abonos en tableta." },
    ],
  },
  "en-US": {
    lang: "en",
    feature: {
      headline: "Your money and your debts, in one place.",
      alt: "Intenli Money: your money and your debts, in one place. Drawing of a piggy bank with a coin.",
    },
    icon: { alt: "Intenli Money icon: a piggy bank with a blue coin." },
    phone: [
      {
        shot: "home",
        caption: "Your money and your debts, in one place",
        alt: "Home with the total balance, the balance after debts, and buttons for expense, income, transfer and debt.",
      },
      {
        shot: "debts",
        caption: "What you owe and what you're owed",
        alt: "Debts to pay and to collect, with the total on each side and how much of each is paid.",
      },
      {
        shot: "accounts",
        caption: "Accounts and boxes for every expense",
        alt: "Bank, cash and savings accounts, plus budget boxes for food and bills.",
      },
      {
        shot: "activity",
        caption: "Every transaction, by day, week or month",
        alt: "November's transactions grouped by day, with income, expenses and the month's net.",
      },
      {
        shot: "debt",
        caption: "Payments and increases, with full history",
        alt: "A loan's detail with what's left to pay, buttons to pay or increase it, and its payment history.",
      },
      {
        shot: "spaces",
        caption: "A space for your life, your business and your family",
        alt: "Space picker: Personal, a shared Family space and a business, each with its role and currency.",
      },
    ],
    tablet: [
      { shot: "home", alt: "Home on a tablet with the total balance and the balance after debts." },
      { shot: "accounts", alt: "Accounts and budget boxes on a tablet." },
      { shot: "activity", alt: "This month's transactions grouped by day on a tablet." },
      { shot: "debt", alt: "A loan's detail with its payment history on a tablet." },
    ],
  },
};
