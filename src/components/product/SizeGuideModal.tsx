import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'women' | 'men' | 'kids' | 'baby'>('women');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
      <div className="fixed inset-0 bg-[#254653]/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#D9E8EC] z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-[#D9E8EC] flex items-center justify-between bg-[#F8FBFA]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#B8DED0]/40 flex items-center justify-center text-[#477C82]">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#254653]">Size & Fit Guide</h3>
              <p className="text-xs text-[#607985]">Standard universal family sizing measurements (in inches)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-[#477C82] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-[#D9E8EC] px-6 bg-[#F0F7F8]/40">
          {(['women', 'men', 'kids', 'baby'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 text-xs font-semibold capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#477C82] text-[#477C82]'
                  : 'border-transparent text-[#607985] hover:text-[#254653]'
              }`}
            >
              {tab}&apos;s Sizing
            </button>
          ))}
        </div>

        {/* Sizing Table */}
        <div className="p-6 overflow-x-auto">
          {activeTab === 'women' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#D9E8EC] text-[#607985]">
                  <th className="py-2 font-semibold">Size</th>
                  <th className="py-2 font-semibold">Bust</th>
                  <th className="py-2 font-semibold">Waist</th>
                  <th className="py-2 font-semibold">Hips</th>
                  <th className="py-2 font-semibold">Length (Maxi)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E8EC]/60 text-[#254653]">
                <tr><td className="py-2.5 font-bold">XS (0-2)</td><td>32 - 33&quot;</td><td>24 - 25&quot;</td><td>34 - 35&quot;</td><td>52&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">S (4-6)</td><td>34 - 35&quot;</td><td>26 - 27&quot;</td><td>36 - 37&quot;</td><td>53&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">M (8-10)</td><td>36 - 37&quot;</td><td>28 - 29&quot;</td><td>38 - 39&quot;</td><td>54&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">L (12-14)</td><td>38 - 40&quot;</td><td>30 - 32&quot;</td><td>40 - 42&quot;</td><td>54.5&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">XL (16-18)</td><td>41 - 43&quot;</td><td>33 - 35&quot;</td><td>43 - 45&quot;</td><td>55&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">XXL (20)</td><td>44 - 46&quot;</td><td>36 - 38&quot;</td><td>46 - 48&quot;</td><td>55.5&quot;</td></tr>
              </tbody>
            </table>
          )}

          {activeTab === 'men' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#D9E8EC] text-[#607985]">
                  <th className="py-2 font-semibold">Size</th>
                  <th className="py-2 font-semibold">Chest</th>
                  <th className="py-2 font-semibold">Waist</th>
                  <th className="py-2 font-semibold">Neck</th>
                  <th className="py-2 font-semibold">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E8EC]/60 text-[#254653]">
                <tr><td className="py-2.5 font-bold">S</td><td>36 - 38&quot;</td><td>30 - 31&quot;</td><td>14.5 - 15&quot;</td><td>33&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">M</td><td>39 - 41&quot;</td><td>32 - 34&quot;</td><td>15.5 - 16&quot;</td><td>34&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">L</td><td>42 - 44&quot;</td><td>35 - 37&quot;</td><td>16.5 - 17&quot;</td><td>35&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">XL</td><td>45 - 48&quot;</td><td>38 - 41&quot;</td><td>17.5 - 18&quot;</td><td>36&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">XXL</td><td>49 - 52&quot;</td><td>42 - 45&quot;</td><td>18.5 - 19&quot;</td><td>37&quot;</td></tr>
              </tbody>
            </table>
          )}

          {activeTab === 'kids' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#D9E8EC] text-[#607985]">
                  <th className="py-2 font-semibold">Age Group</th>
                  <th className="py-2 font-semibold">Height</th>
                  <th className="py-2 font-semibold">Weight</th>
                  <th className="py-2 font-semibold">Chest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E8EC]/60 text-[#254653]">
                <tr><td className="py-2.5 font-bold">3 - 4 Years</td><td>38 - 41&quot;</td><td>32 - 36 lbs</td><td>22&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">5 - 6 Years</td><td>42 - 45&quot;</td><td>38 - 44 lbs</td><td>24&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">7 - 8 Years</td><td>46 - 50&quot;</td><td>46 - 54 lbs</td><td>26&quot;</td></tr>
                <tr><td className="py-2.5 font-bold">9 - 10 Years</td><td>51 - 54&quot;</td><td>56 - 68 lbs</td><td>28&quot;</td></tr>
              </tbody>
            </table>
          )}

          {activeTab === 'baby' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#D9E8EC] text-[#607985]">
                  <th className="py-2 font-semibold">Baby Age</th>
                  <th className="py-2 font-semibold">Height</th>
                  <th className="py-2 font-semibold">Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E8EC]/60 text-[#254653]">
                <tr><td className="py-2.5 font-bold">Newborn</td><td>Up to 21.5&quot;</td><td>5 - 8 lbs</td></tr>
                <tr><td className="py-2.5 font-bold">0 - 3 Months</td><td>21.5 - 24&quot;</td><td>8 - 12.5 lbs</td></tr>
                <tr><td className="py-2.5 font-bold">3 - 6 Months</td><td>24 - 26.5&quot;</td><td>12.5 - 16.5 lbs</td></tr>
                <tr><td className="py-2.5 font-bold">6 - 12 Months</td><td>26.5 - 30.5&quot;</td><td>16.5 - 24.5 lbs</td></tr>
              </tbody>
            </table>
          )}

          <div className="mt-4 p-3 rounded-xl bg-[#F0F7F8] text-[11px] text-[#607985]">
            💡 <strong>Fitting Tip:</strong> If your measurements fall between two sizes, we recommend sizing up for comfortable family wear and relaxed silhouettes.
          </div>
        </div>

        <div className="p-4 bg-[#F8FBFA] border-t border-[#D9E8EC] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#477C82] text-white text-xs font-medium hover:bg-[#39656a]"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
