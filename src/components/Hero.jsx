import Spline from '@splinetool/react-spline';
import { Rocket, Shield, BarChart, Crown } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50 via-emerald-50 to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
            <Shield className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            Secure email sign-in · WCAG compliant
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Clarity for your income, at a glance</h1>
          <p className="mt-4 text-slate-700 max-w-prose">Track daily, monthly, and yearly income with beautiful visualizations. Upgrade for advanced reporting, investment tracking, and weekly/monthly email analytics.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:from-emerald-500 hover:to-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600"
            >
              <Rocket className="h-4 w-4" aria-hidden="true" />
              Get started free
            </button>
            <a
              href="#premium"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600"
            >
              <Crown className="h-4 w-4 text-amber-500" aria-hidden="true" />
              See Premium
            </a>
          </div>
          <ul className="mt-8 grid sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <li className="flex items-start gap-3"><BarChart className="mt-0.5 h-4 w-4 text-sky-600" aria-hidden="true" /><span>Daily, monthly, yearly views</span></li>
            <li className="flex items-start gap-3"><Shield className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden="true" /><span>Secure email sign-in with recovery</span></li>
          </ul>
        </div>
        <div className="relative h-[420px] sm:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/70 to-transparent" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
