import { Trash2, Percent } from "lucide-react";

export default function OrderCart({ items, onQty, onRemove, discount, setDiscount }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const discountAmount = discount.type === "percent" ? (subtotal * discount.value) / 100 : discount.value;
  const total = Math.max(subtotal - discountAmount, 0);

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-4 space-y-4">
      <h2 className="text-lg font-semibold">Current Order</h2>
      <div className="divide-y divide-gray-100">
        {items.length === 0 && (
          <div className="py-8 text-center text-gray-500">No items yet. Add products from the left.</div>
        )}
        {items.map((it) => (
          <div key={it.id} className="py-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-gray-500">${it.price.toFixed(2)} each</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 h-8 rounded border" onClick={() => onQty(it.id, Math.max(1, it.qty - 1))}>-</button>
              <div className="w-8 text-center">{it.qty}</div>
              <button className="px-2 h-8 rounded border" onClick={() => onQty(it.id, it.qty + 1)}>+</button>
            </div>
            <div className="w-20 text-right font-medium">${(it.price * it.qty).toFixed(2)}</div>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded" onClick={() => onRemove(it.id)}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Discount</label>
        <div className="flex items-center gap-2">
          <select
            value={discount.type}
            onChange={(e) => setDiscount((d) => ({ ...d, type: e.target.value }))}
            className="h-10 rounded-md border-gray-300"
          >
            <option value="none">None</option>
            <option value="percent">Percent %</option>
            <option value="amount">Amount $</option>
          </select>
          <div className="relative flex-1">
            <input
              type="number"
              min="0"
              step="0.01"
              value={discount.value}
              onChange={(e) => setDiscount((d) => ({ ...d, value: Number(e.target.value) }))}
              className="h-10 w-full rounded-md border-gray-300 pr-10"
              placeholder="0"
            />
            <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="border-t pt-3 space-y-1 text-sm">
        <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-gray-600">Discount</span><span>- ${discountAmount.toFixed(2)}</span></div>
        <div className="flex justify-between text-base font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </div>
    </aside>
  );
}
