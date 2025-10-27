import { Crown, Shield, Star, PieChart, BarChart, Mail } from 'lucide-react';

export default function PremiumFeatures({ onUpgrade }) {
  return (
    <div className="grid lg:grid-cols-5 gap-10 items-start">
      <div className="lg:col-span-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-800">
          <Crown className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" /> Premium subscription
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Unlock advanced finance tools</h2>
        <p className="mt-3 text-slate-700 max-w-prose">Go ad-free and access deeper analytics with customizable categories, investment tracking, and priority support. Plus, receive weekly and monthly email summaries that highlight trends, changes, and opportunities.</p>
        <div className="mt-6 flex items-center gap-3">
          <button onClick={onUpgrade} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:from-emerald-500 hover:to-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600">
            <Crown className="h-4 w-4" aria-hidden="true" /> Upgrade monthly
          </button>
          <span className="text-sm text-slate-600">Cancel anytime</span>
        </div>
        <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
          <Feature icon={<BarChart className="h-4 w-4 text-sky-600" aria-hidden="true" />} title="Advanced reporting" desc="Drill down by source, category, and time range." />
          <Feature icon={<PieChart className="h-4 w-4 text-emerald-600" aria-hidden="true" />} title="Custom categories" desc="Create, rename, and color-code categories." />
          <Feature icon={<Shield className="h-4 w-4 text-emerald-600" aria-hidden="true" />} title="Priority support" desc="Fast, human-first help when you need it." />
          <Feature icon={<Star className="h-4 w-4 text-amber-500" aria-hidden="true" />} title="Ad-free experience" desc="Focus on your finances without distractions." />
        </ul>
      </div>

      <div className="lg:col-span-3 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-900">Email analytics preview</h3>
        <p className="mt-2 text-sm text-slate-600">Professionally designed weekly/monthly emails summarize income performance with clear calls-to-action.</p>
        <div className="mt-4 rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden="true" /><span className="text-sm font-medium">FlowFin Analytics</span></div>
            <span className="text-xs text-emerald-300">Preview</span>
          </div>
          <div className="bg-white">
            <EmailTemplate />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <li className="flex items-start gap-3 rounded-lg bg-white border border-slate-200 p-4 shadow-sm">
      <div className="shrink-0">{icon}</div>
      <div>
        <div className="font-medium text-slate-900">{title}</div>
        <div className="text-slate-600">{desc}</div>
      </div>
    </li>
  );
}

function EmailTemplate() {
  return (
    <table role="presentation" className="w-full" cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td className="px-6 py-6">
            <div className="mx-auto max-w-2xl">
              <h4 className="text-xl font-bold text-slate-900">Your weekly income summary</h4>
              <p className="mt-1 text-slate-700 text-sm">Great job! You're trending up 12% vs last week.</p>
              <div className="mt-4 rounded-lg bg-gradient-to-br from-emerald-50 to-sky-50 border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-600">This week</div>
                    <div className="text-2xl font-bold text-slate-900">$2,980</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 text-right">Last week</div>
                    <div className="text-xl font-semibold text-slate-900 text-right">$2,660</div>
                  </div>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" style={{ width: '65%' }} />
                </div>
              </div>
              <table role="presentation" className="mt-6 w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 text-slate-600">Top category</td>
                    <td className="py-2 text-right font-medium text-slate-900">Freelance · $1,320</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-600">Biggest day</td>
                    <td className="py-2 text-right font-medium text-slate-900">Fri · $620</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-6">
                <a href="#tracker" className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">Open dashboard</a>
                <span className="ml-3 text-xs text-slate-500">Tweak categories or view detailed report →</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
