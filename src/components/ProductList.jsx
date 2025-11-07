import { useMemo } from "react";

const SAMPLE_PRODUCTS = [
  { id: "p1", name: "Latte", price: 4.5, category: "Drinks" },
  { id: "p2", name: "Cappuccino", price: 4.0, category: "Drinks" },
  { id: "p3", name: "Americano", price: 3.0, category: "Drinks" },
  { id: "p4", name: "Blueberry Muffin", price: 3.25, category: "Bakery" },
  { id: "p5", name: "Chocolate Croissant", price: 3.75, category: "Bakery" },
  { id: "p6", name: "Ham Sandwich", price: 6.5, category: "Food" },
];

export default function ProductList({ onAdd }) {
  const groups = useMemo(() => {
    return SAMPLE_PRODUCTS.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || [];
      acc[p.category].push(p);
      return acc;
    }, {});
  }, []);

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([cat, items]) => (
        <div key={cat}>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{cat}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {items.map((p) => (
              <button
                key={p.id}
                onClick={() => onAdd(p)}
                className="group rounded-lg border border-gray-200 p-3 text-left hover:border-indigo-300 hover:shadow-sm transition"
              >
                <div className="font-medium text-gray-900 group-hover:text-indigo-700">{p.name}</div>
                <div className="text-sm text-gray-500">${p.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
