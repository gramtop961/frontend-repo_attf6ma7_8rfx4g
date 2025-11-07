import { useMemo, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import OrderCart from "./components/OrderCart";
import CustomerPanel from "./components/CustomerPanel";

export default function App() {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState({ type: "none", value: 0 });
  const [customer, setCustomer] = useState(null);

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const discountAmount =
      discount.type === "percent" ? (subtotal * discount.value) / 100 : discount.type === "amount" ? discount.value : 0;
    const total = Math.max(subtotal - discountAmount, 0);
    const count = items.reduce((s, it) => s + it.qty, 0);
    return { subtotal, discountAmount, total, count };
  }, [items, discount]);

  const addItem = (p) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
  };
  const setQty = (id, qty) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header itemCount={totals.count} total={totals.total} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Products</h2>
              {customer && (
                <div className="text-sm text-gray-600">Serving: <span className="font-medium">{customer.name}</span></div>
              )}
            </div>
            <ProductList onAdd={addItem} />
          </div>
        </div>
        <div className="space-y-6">
          <CustomerPanel onAttach={setCustomer} />
          <OrderCart items={items} onQty={setQty} onRemove={removeItem} discount={discount} setDiscount={setDiscount} />
          <button
            disabled={items.length === 0}
            className="w-full h-12 rounded-md bg-emerald-600 text-white font-semibold disabled:opacity-50"
            onClick={() => alert("Payment flow would start here")}
          >
            Charge ${totals.total.toFixed(2)}
          </button>
        </div>
      </main>
    </div>
  );
}
