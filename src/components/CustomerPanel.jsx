import { useState } from "react";
import { User, Star } from "lucide-react";

export default function CustomerPanel({ onAttach }) {
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);

  const lookup = () => {
    // In a full app, this would call the backend. For now, simple local mock.
    if (phone.trim() === "") return;
    const mock = {
      name: "Walk-in",
      phone,
      points: 120,
      tier: "Gold",
    };
    setCustomer(mock);
    onAttach(mock);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2"><User className="h-5 w-5"/> Customer</h2>

      <div className="flex gap-2">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="h-10 flex-1 rounded-md border-gray-300"
        />
        <button onClick={lookup} className="h-10 px-4 rounded-md bg-indigo-600 text-white font-medium">Attach</button>
      </div>

      {customer && (
        <div className="rounded-lg border p-3 bg-indigo-50 border-indigo-200">
          <div className="font-medium">{customer.name}</div>
          <div className="text-sm text-gray-700">{customer.phone}</div>
          <div className="mt-2 flex items-center gap-2 text-amber-600">
            <Star className="h-4 w-4" />
            <span className="text-sm">{customer.points} points • {customer.tier}</span>
          </div>
        </div>
      )}
    </section>
  );
}
