import { useLocation, useNavigate } from 'react-router-dom';

export function Placeholder({ title, description, action }) {
  const navigate = useNavigate();
  const location = useLocation();
  return <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center py-10">
    <div className="max-w-md text-center">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">Prototype route</div>
      <h1 className="mt-3 text-2xl font-semibold text-slate-100">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      <div className="mt-6 flex justify-center gap-2">
        <button onClick={() => navigate('/')} className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/60">Back to overview</button>
        {action && <button onClick={() => navigate(action.to)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">{action.label}</button>}
      </div>
      <div className="mt-6 text-[10px] text-slate-700">Current route: {location.pathname}</div>
    </div>
  </div>;
}
