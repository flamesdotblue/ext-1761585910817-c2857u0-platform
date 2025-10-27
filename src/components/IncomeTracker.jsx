import { useMemo, useState } from 'react';
import { Calendar, TrendingUp, PieChart, BarChart } from 'lucide-react';

const demoIncome = [
  // ISO date, amount
  ['2025-09-28', 220], ['2025-09-29', 180], ['2025-09-30', 260],
  ['2025-10-01', 300], ['2025-10-02', 120], ['2025-10-03', 560], ['2025-10-04', 90],
  ['2025-10-05', 400], ['2025-10-06', 280], ['2025-10-07', 240], ['2025-10-08', 520], ['2025-10-09', 160], ['2025-10-10', 310],
  ['2025-10-11', 140], ['2025-10-12', 420], ['2025-10-13', 380], ['2025-10-14', 260], ['2025-10-15', 620],
];

const categories = {
  Salary: '#0ea5e9', // sky-500
  Freelance: '#10b981', // emerald-500
  Dividends: '#6366f1', // indigo-500
  Other: '#94a3b8', // slate-400
};

const categorized = demoIncome.map(([d, amt], i) => {
  const keys = Object.keys(categories);
  const cat = keys[i % keys.length];
  return { date: d, amount: amt, category: cat };
});

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

export default function IncomeTracker() {
  const [view, setView] = useState('monthly'); // daily | monthly | yearly

  const stats = useMemo(() => {
    const byDay = categorized;
    const byMonth = {};
    const byYear = {};
    for (const r of byDay) {
      const d = new Date(r.date);
      const mKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const yKey = `${d.getFullYear()}`;
      byMonth[mKey] = (byMonth[mKey] || 0) + r.amount;
      byYear[yKey] = (byYear[yKey] || 0) + r.amount;
    }
    return { byDay, byMonth, byYear };
  }, []);

  const chartData = useMemo(() => {
    if (view === 'daily') return stats.byDay.map(d => ({ label: d.date.slice(5), value: d.amount }));
    if (view === 'monthly') return Object.entries(stats.byMonth).map(([k, v]) => ({ label: k, value: v }));
    return Object.entries(stats.byYear).map(([k, v]) => ({ label: k, value: v }));
  }, [view, stats]);

  const total = useMemo(() => chartData.reduce((a, b) => a + b.value, 0), [chartData]);
  const maxVal = useMemo(() => Math.max(...chartData.map(d => d.value), 1), [chartData]);

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">Income Overview</h2>
          <div role="tablist" aria-label="Income time range" className="flex items-center rounded-lg bg-slate-100 p-1">
            {['daily','monthly','yearly'].map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${view===v ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-800'}`}
              >{v.charAt(0).toUpperCase()+v.slice(1)}</button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-700"><TrendingUp className="h-4 w-4 text-emerald-600" aria-hidden="true" /><span className="text-sm">Total</span></div>
            <div className="text-2xl font-bold text-slate-900">${total.toLocaleString()}</div>
          </div>
          <div className="mt-6">
            <BarChartSVG data={chartData} maxVal={maxVal} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Breakdown by category</h3>
            <PieChart className="h-5 w-5 text-sky-600" aria-hidden="true" />
          </div>
          <CategoryPie />
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {Object.entries(categories).map(([name, color]) => (
              <li key={name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
                <span className="text-slate-700">{name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-sky-600 text-white shadow-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Scheduled Reports</h3>
            <Calendar className="h-5 w-5 opacity-90" aria-hidden="true" />
          </div>
          <p className="mt-2 text-sm text-emerald-50/90">Premium users receive weekly and monthly email analytics summarizing your performance with actionable insights.</p>
          <a href="#premium" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <BarChart className="h-4 w-4" aria-hidden="true" />
            Unlock with Premium
          </a>
        </div>
      </div>
    </div>
  );
}

function BarChartSVG({ data, maxVal }) {
  const height = 180;
  const barWidth = Math.max(8, 480 / Math.max(data.length, 1));
  const gap = 8;
  const width = data.length * (barWidth + gap);

  return (
    <div className="overflow-x-auto" role="img" aria-label="Income bar chart">
      <svg width={width} height={height + 40} className="max-w-full">
        {data.map((d, i) => {
          const h = Math.round((d.value / maxVal) * height);
          const x = i * (barWidth + gap);
          const y = height - h + 20;
          return (
            <g key={i}>
              <rect
                x={x} y={y} width={barWidth} height={h}
                rx={6}
                fill="url(#grad)"
                aria-label={`${d.label} ${d.value}`}
              />
              <text x={x + barWidth / 2} y={height + 35} textAnchor="middle" fontSize="10" fill="#334155">{d.label}</text>
            </g>
          );
        })}
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function CategoryPie() {
  const values = Object.keys(categories).map((k, i) => 1 + i); // mock weights
  const total = values.reduce((a, b) => a + b, 0);
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <div className="mt-6 flex items-center justify-center" role="img" aria-label="Income breakdown pie chart">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="#fff" />
        {Object.entries(categories).map(([name, color], idx) => {
          const fraction = values[idx] / total;
          const length = clamp(fraction * circumference, 0, circumference);
          const circle = (
            <circle
              key={name}
              cx="70" cy="70" r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth="16"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
            />
          );
          offset += length;
          return circle;
        })}
      </svg>
    </div>
  );
}
