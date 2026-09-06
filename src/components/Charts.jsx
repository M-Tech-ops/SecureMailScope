import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const protocolColors = ['#6f9ed6', '#8aa3bd', '#9aa7b6'];

export function ProtocolChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.sessions, 0);
  return <div className="h-56">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="sessions" nameKey="name" cx="50%" cy="46%" innerRadius={58} outerRadius={82} paddingAngle={3} stroke="none">
          {data.map((entry, i) => <Cell key={entry.name} fill={protocolColors[i % protocolColors.length]} />)}
        </Pie>
        <Tooltip content={({ active, payload }) => active && payload?.length ? (
          <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 shadow-xl">
            <div className="text-xs font-medium text-slate-200">{payload[0].name}</div>
            <div className="mt-0.5 text-[11px] text-slate-400">{payload[0].value.toLocaleString()} sessions · {((payload[0].value / total) * 100).toFixed(1)}%</div>
          </div>
        ) : null} />
      </PieChart>
    </ResponsiveContainer>
    <div className="-mt-2 flex justify-center gap-5">
      {data.map((item, i) => <div key={item.name} className="flex items-center gap-2 text-[11px] text-slate-400">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: protocolColors[i % protocolColors.length] }} />
        {item.name} <span className="text-slate-300">{item.percentage}%</span>
      </div>)}
    </div>
  </div>;
}

export function TlsChart({ data }) {
  const barColor = (status) => status === 'deprecated' ? '#c87952' : '#6f9ed6';
  return <div className="h-52">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 4, bottom: 0 }} barSize={18}>
        <XAxis type="number" hide domain={[0, 100]} />
        <YAxis type="category" dataKey="version" width={62} tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip content={({ active, payload }) => active && payload?.length ? (
          <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 shadow-xl">
            <div className="text-xs font-medium text-slate-200">{payload[0].payload.version}</div>
            <div className="mt-0.5 text-[11px] text-slate-400">{payload[0].value}% of TLS sessions</div>
          </div>
        ) : null} />
        <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
          {data.map((entry) => <Cell key={entry.version} fill={barColor(entry.status)} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>;
}
