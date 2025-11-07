import { ShoppingCart, Store } from "lucide-react";

export default function Header({ itemCount, total }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
          <Store className="h-6 w-6" />
          <span>QuickCashier</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <ShoppingCart className="h-5 w-5" />
            <span>{itemCount} items</span>
          </div>
          <div className="px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-700 font-medium">
            ${total.toFixed(2)}
          </div>
        </div>
      </div>
    </header>
  );
}
