"use client";

import { useEffect, useMemo, useState } from "react";

type Tab = "menu" | "kitchen" | "history";
type OrderStatus = "RECEIVED" | "PREPARING" | "DISPATCHED";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  tag: string;
  image: string;
};

type CartItem = MenuItem & {
  quantity: number;
};

type Order = {
  id: number;
  tableNumber: string;
  items: CartItem[];
  status: OrderStatus;
  createdAt: number;
  dispatchedAt?: number;
};

const menuItems: MenuItem[] = [
  {
    id: "burger",
    name: "Burger",
    description: "Carne angus, cheddar, lechuga, tomate y salsa de la casa.",
    price: 12.5,
    tag: "Popular",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pizza",
    name: "Pizza",
    description: "Masa delgada, mozzarella, pepperoni y albahaca fresca.",
    price: 14,
    tag: "Horno",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "soda",
    name: "Soda",
    description: "Refresco frío con hielo y limón, servido al momento.",
    price: 3.5,
    tag: "Bebida",
    image:
      "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=900&q=80",
  },
];

const seededOrders: Order[] = [
  {
    id: 4092,
    tableNumber: "12",
    items: [
      { ...menuItems[0], quantity: 2 },
      { ...menuItems[2], quantity: 2 },
    ],
    status: "RECEIVED",
    createdAt: Date.now() - 1000 * 60 * 3,
  },
  {
    id: 4091,
    tableNumber: "04",
    items: [
      { ...menuItems[1], quantity: 1 },
      { ...menuItems[2], quantity: 1 },
    ],
    status: "PREPARING",
    createdAt: Date.now() - 1000 * 60 * 9,
  },
  {
    id: 4090,
    tableNumber: "08",
    items: [{ ...menuItems[0], quantity: 1 }],
    status: "DISPATCHED",
    createdAt: Date.now() - 1000 * 60 * 28,
    dispatchedAt: Date.now() - 1000 * 60 * 12,
  },
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatDuration(start: number, end = Date.now()) {
  const totalSeconds = Math.max(0, Math.floor((end - start) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function TabIcon({ name }: { name: Tab }) {
  if (name === "menu") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M4 6h16M4 12h16M4 18h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "kitchen") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M6 3v18M18 3v18M6 12h12M4 7h4M16 7h4M4 17h4M16 17h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FastMenuPage() {
  const [activeTab, setActiveTab] = useState<Tab>("menu");
  const [orders, setOrders] = useState<Order[]>(seededOrders);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState("");
  const [clock, setClock] = useState<number | null>(null);

  useEffect(() => {
    setClock(Date.now());
    const timerId = window.setInterval(() => setClock(Date.now()), 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const nextOrderId = useMemo(
    () => Math.max(...orders.map((order) => order.id), 4092) + 1,
    [orders],
  );

  const activeOrders = orders.filter((order) => order.status !== "DISPATCHED");
  const receivedOrders = orders.filter((order) => order.status === "RECEIVED");
  const preparingOrders = orders.filter((order) => order.status === "PREPARING");
  const dispatchedOrders = orders.filter((order) => order.status === "DISPATCHED");
  const hasPreparing = preparingOrders.length > 0;

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(item: MenuItem) {
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...current, { ...item, quantity: 1 }];
    });
  }

  function removeFromCart(itemId: string) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function confirmOrder() {
    if (!tableNumber.trim() || cart.length === 0) {
      return;
    }

    setOrders((current) => [
      {
        id: nextOrderId,
        tableNumber: tableNumber.trim(),
        items: cart,
        status: "RECEIVED",
        createdAt: Date.now(),
      },
      ...current,
    ]);
    setCart([]);
    setTableNumber("");
    setActiveTab("kitchen");
  }

  function advanceOrder(orderId: number) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== orderId) {
          return order;
        }

        if (order.status === "RECEIVED") {
          return { ...order, status: "PREPARING" };
        }

        if (order.status === "PREPARING") {
          return { ...order, status: "DISPATCHED", dispatchedAt: Date.now() };
        }

        return order;
      }),
    );
  }

  return (
    <main className="min-h-screen bg-surface text-charcoal">
      <div
        className={`fixed left-0 top-0 z-[60] h-2 origin-left bg-primary ${
          hasPreparing ? "order-progress-live" : ""
        }`}
        style={{
          width: activeOrders.length ? `${Math.min(100, 22 + activeOrders.length * 18)}%` : "0%",
        }}
      />

      <header className="sticky top-0 z-50 border-b border-outline-variant bg-white/95 px-md pt-sm shadow-card backdrop-blur md:px-margin">
        <div className="mx-auto flex max-w-7xl flex-col gap-md py-md md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label-sm font-medium uppercase text-on-surface-variant">
                Realtime Kitchen
              </p>
              <h1 className="text-h3 font-semibold text-primary md:text-h2">
                FastMenu
              </h1>
            </div>
            <div className="rounded-lg bg-surface-container px-sm py-xs text-label-md font-semibold text-on-surface-variant md:hidden">
              {activeOrders.length} activos
            </div>
          </div>

          <nav className="grid grid-cols-3 gap-sm rounded-lg bg-surface-container p-xs">
            {[
              ["menu", "Menú"],
              ["kitchen", "Cocina"],
              ["history", "Historial"],
            ].map(([id, label]) => {
              const tab = id as Tab;
              const isActive = activeTab === tab;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex min-h-12 items-center justify-center gap-sm rounded px-sm text-label-md font-semibold transition ${
                    isActive
                      ? "bg-primary text-white shadow-card"
                      : "text-on-surface-variant hover:bg-white"
                  }`}
                  aria-pressed={isActive}
                >
                  <TabIcon name={tab} />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {activeTab === "menu" && (
        <section className="mx-auto grid max-w-7xl gap-gutter px-md py-lg md:px-margin lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-lg">
              <h2 className="text-h2 font-semibold text-charcoal">Menú de Comida</h2>
              <p className="mt-xs text-body-lg text-on-surface-variant">
                Selecciona productos y confirma la mesa para enviar el pedido.
              </p>
            </div>

            <div className="grid gap-gutter md:grid-cols-2 xl:grid-cols-3">
              {menuItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-lg bg-white shadow-card transition hover:shadow-modal"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-md">
                    <div className="mb-sm flex items-start justify-between gap-md">
                      <div>
                        <span className="rounded-full bg-surface-container px-sm py-xs text-label-sm font-medium uppercase text-on-surface-variant">
                          {item.tag}
                        </span>
                        <h3 className="mt-sm text-h3 font-semibold text-charcoal">
                          {item.name}
                        </h3>
                      </div>
                      <span className="text-h3 font-semibold text-primary">
                        {formatMoney(item.price)}
                      </span>
                    </div>
                    <p className="min-h-12 text-body-md text-on-surface-variant">
                      {item.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="mt-md flex min-h-12 w-full items-center justify-center gap-sm rounded bg-primary px-md py-sm text-label-md font-semibold text-white transition hover:bg-on-primary-fixed-variant active:scale-[0.99]"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                        <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      Añadir
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="self-start rounded-lg bg-white p-md shadow-card lg:sticky lg:top-28">
            <div className="mb-md flex items-center justify-between">
              <h2 className="text-h3 font-semibold">Carrito</h2>
              <span className="rounded-full bg-surface-container px-sm py-xs text-label-md font-semibold text-on-surface-variant">
                {cartCount} items
              </span>
            </div>

            <div className="space-y-sm">
              {cart.length === 0 ? (
                <p className="rounded-lg bg-surface-container p-md text-body-md text-on-surface-variant">
                  El carrito está vacío.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-md rounded-lg bg-surface-container p-sm"
                  >
                    <div>
                      <p className="text-body-md font-semibold">{item.name}</p>
                      <p className="text-label-sm font-medium uppercase text-on-surface-variant">
                        {item.quantity} x {formatMoney(item.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded bg-white text-primary shadow-card"
                      aria-label={`Quitar ${item.name}`}
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                        <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            <label className="mt-md block text-label-md font-semibold text-on-surface-variant" htmlFor="table-number">
              Número de Mesa
            </label>
            <input
              id="table-number"
              value={tableNumber}
              onChange={(event) => setTableNumber(event.target.value)}
              inputMode="numeric"
              className="mt-sm h-12 w-full rounded border border-outline-variant bg-surface-container px-md text-body-md outline-none transition focus:border-primary focus:ring-2 focus:ring-inverse-primary"
              placeholder="Ej. 12"
            />

            <div className="my-md flex items-center justify-between border-t border-outline-variant pt-md">
              <span className="text-body-md text-on-surface-variant">Total</span>
              <strong className="text-h3 font-semibold text-charcoal">
                {formatMoney(cartTotal)}
              </strong>
            </div>

            <button
              type="button"
              onClick={confirmOrder}
              disabled={!tableNumber.trim() || cart.length === 0}
              className="flex min-h-12 w-full items-center justify-center gap-sm rounded bg-primary px-md py-sm text-label-md font-semibold text-white transition enabled:hover:bg-on-primary-fixed-variant enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-surface-dim disabled:text-on-surface-variant"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Confirmar Pedido
            </button>
          </aside>
        </section>
      )}

      {activeTab === "kitchen" && (
        <section className="mx-auto max-w-7xl px-md py-lg md:px-margin">
          <div className="mb-lg flex flex-col gap-md md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-h2 font-semibold text-charcoal">Cocina - Pedidos Activos</h2>
              <p className="mt-xs text-body-md text-on-surface-variant">
                Flujo en memoria desde recibido hasta despacho.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-sm md:w-80">
              <div className="rounded-lg bg-white p-md shadow-card">
                <p className="text-label-sm font-medium uppercase text-on-surface-variant">Received</p>
                <p className="mt-xs text-h2 font-semibold text-charcoal">{receivedOrders.length}</p>
              </div>
              <div className="rounded-lg bg-white p-md shadow-card">
                <p className="text-label-sm font-medium uppercase text-on-surface-variant">Preparing</p>
                <p className="mt-xs text-h2 font-semibold text-primary">{preparingOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-gutter lg:grid-cols-2">
            <KitchenColumn title="RECEIVED" orders={receivedOrders} now={clock} onAdvance={advanceOrder} />
            <KitchenColumn title="PREPARING" orders={preparingOrders} now={clock} onAdvance={advanceOrder} />
          </div>
        </section>
      )}

      {activeTab === "history" && (
        <section className="mx-auto max-w-7xl px-md py-lg md:px-margin">
          <div className="mb-lg">
            <h2 className="text-h2 font-semibold text-charcoal">Historial</h2>
            <p className="mt-xs text-body-md text-on-surface-variant">
              Pedidos despachados y duración total del servicio.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead className="bg-surface-container">
                  <tr>
                    <th className="px-md py-md text-label-md font-semibold text-on-surface-variant">ID Pedido</th>
                    <th className="px-md py-md text-label-md font-semibold text-on-surface-variant">Mesa</th>
                    <th className="px-md py-md text-label-md font-semibold text-on-surface-variant">Productos</th>
                    <th className="px-md py-md text-right text-label-md font-semibold text-on-surface-variant">Tiempo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {dispatchedOrders.length === 0 ? (
                    <tr>
                      <td className="px-md py-lg text-body-md text-on-surface-variant" colSpan={4}>
                        Aún no hay pedidos despachados.
                      </td>
                    </tr>
                  ) : (
                    dispatchedOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-surface-container-low">
                        <td className="px-md py-md text-label-md font-semibold text-charcoal">#{order.id}</td>
                        <td className="px-md py-md text-body-md text-charcoal">{order.tableNumber}</td>
                        <td className="px-md py-md text-body-md text-on-surface-variant">{summarizeItems(order.items)}</td>
                        <td className="px-md py-md text-right text-label-md font-semibold text-primary">
                          {formatDuration(order.createdAt, order.dispatchedAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function KitchenColumn({
  title,
  orders,
  now,
  onAdvance,
}: {
  title: Extract<OrderStatus, "RECEIVED" | "PREPARING">;
  orders: Order[];
  now: number | null;
  onAdvance: (orderId: number) => void;
}) {
  return (
    <section>
      <div className="mb-md flex items-center justify-between px-xs">
        <h3 className="flex items-center gap-sm text-h3 font-semibold text-charcoal">
          <span
            className={`h-3 w-3 rounded-full ${
              title === "PREPARING" ? "bg-primary order-progress-live" : "bg-surface-dim"
            }`}
          />
          {title}
        </h3>
        <span className="rounded-full bg-surface-container-highest px-sm py-xs text-label-sm font-medium uppercase text-on-surface-variant">
          {orders.length}
        </span>
      </div>

      <div className="grid gap-md md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {orders.length === 0 ? (
          <div className="rounded-lg bg-white p-lg text-body-md text-on-surface-variant shadow-card">
            Sin pedidos en esta etapa.
          </div>
        ) : (
          orders.map((order) => (
            <article
              key={order.id}
              className={`rounded-lg bg-white p-md shadow-card ${
                order.status === "PREPARING" ? "ring-2 ring-inverse-primary" : ""
              }`}
            >
              <div className="mb-md flex items-start justify-between gap-md">
                <div>
                  <p className="text-label-sm font-medium uppercase text-on-surface-variant">
                    Pedido #{order.id}
                  </p>
                  <h4 className="mt-xs text-h2 font-semibold text-charcoal">
                    Mesa {order.tableNumber}
                  </h4>
                </div>
                <span className="rounded bg-surface-container px-sm py-xs text-label-md font-semibold text-charcoal">
                  {formatDuration(order.createdAt, now ?? order.createdAt)}
                </span>
              </div>

              <ul className="space-y-sm">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-md text-body-md">
                    <span className="font-semibold text-charcoal">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-on-surface-variant">{item.tag}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onAdvance(order.id)}
                className={`mt-md flex min-h-12 w-full items-center justify-center gap-sm rounded px-md py-sm text-label-md font-semibold transition active:scale-[0.99] ${
                  order.status === "RECEIVED"
                    ? "bg-primary text-white order-progress-live hover:bg-on-primary-fixed-variant"
                    : "bg-charcoal text-white hover:bg-inverse-surface"
                }`}
              >
                {order.status === "RECEIVED" ? "Pasar a PREPARING" : "Despachar"}
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function summarizeItems(items: CartItem[]) {
  return items.map((item) => `${item.quantity}x ${item.name}`).join(", ");
}
