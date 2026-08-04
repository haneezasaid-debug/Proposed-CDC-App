import React, { useState } from 'react';
import { Store, MapPin, Search, CheckCircle2, ShoppingBag, Utensils } from 'lucide-react';

interface WhereToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhereToUseModal: React.FC<WhereToUseModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'hawker' | 'supermarket' | 'merchant'>('all');

  if (!isOpen) return null;

  const sampleMerchants = [
    { name: 'Canberra Hawker Centre', area: 'Canberra Road, #01-12', type: 'hawker', label: 'Hawker Food' },
    { name: 'NTUC FairPrice Supermarket', area: 'Canberra Plaza #02-01', type: 'supermarket', label: 'Supermarket' },
    { name: 'Sheng Siong Supermarket', area: '105 Canberra Street', type: 'supermarket', label: 'Supermarket' },
    { name: 'Kopitiam @ Canberra', area: 'Canberra Station #01-05', type: 'hawker', label: 'Food Court' },
    { name: 'Yishun Park Hawker Centre', area: 'Yishun Ave 11', type: 'hawker', label: 'Hawker Food' },
    { name: 'Chong Pang Market & Food Centre', area: '105 Yishun Ring Rd', type: 'hawker', label: 'Hawker Food' },
    { name: 'Giant Supermarket', area: 'Sembawang Shopping Centre', type: 'supermarket', label: 'Supermarket' },
    { name: 'Cold Storage / CS Fresh', area: 'Northpoint City', type: 'supermarket', label: 'Supermarket' },
    { name: 'Kim San Leng Coffee Shop', area: 'Yishun Central', type: 'merchant', label: 'Heartland Shop' },
    { name: 'Guardian Health & Beauty', area: 'Canberra Plaza #01-15', type: 'merchant', label: 'Heartland Shop' },
  ];

  const filteredMerchants = sampleMerchants.filter((m) => {
    const matchesCategory = filterCategory === 'all' || m.type === filterCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.area.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
          <div className="flex items-center gap-2 font-bold text-base text-[#0F1F4A]">
            <Store className="w-5 h-5 text-teal-600" />
            <span>Where to use SG60 Vouchers</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold px-2 py-1 text-xl leading-none rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search hawker, market, supermarket..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-teal-600 focus:bg-white transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 text-[11px] font-semibold no-scrollbar">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
              filterCategory === 'all'
                ? 'bg-[#0F1F4A] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Outlets
          </button>
          <button
            onClick={() => setFilterCategory('hawker')}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1 ${
              filterCategory === 'hawker'
                ? 'bg-teal-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Utensils className="w-3 h-3" />
            Hawkers
          </button>
          <button
            onClick={() => setFilterCategory('supermarket')}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1 ${
              filterCategory === 'supermarket'
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ShoppingBag className="w-3 h-3" />
            Supermarkets
          </button>
        </div>

        {/* Merchant List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 my-1">
          {filteredMerchants.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-xs">
              No matching participating merchants found.
            </div>
          ) : (
            filteredMerchants.map((m, idx) => (
              <div
                key={idx}
                className="p-2.5 border border-gray-100 rounded-xl bg-gray-50/70 hover:bg-gray-50 flex items-start justify-between gap-2"
              >
                <div>
                  <div className="font-bold text-xs text-gray-900 flex items-center gap-1">
                    <span>{m.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                    <span>{m.area}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                  {m.label}
                </span>
              </div>
            ))
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-3 w-full py-2.5 bg-[#0F1F4A] text-white font-bold text-xs rounded-xl hover:bg-[#1a2e63] transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
