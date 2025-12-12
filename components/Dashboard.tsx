import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Users, Activity as ActivityIcon } from 'lucide-react';
import { ACTIVITIES, REVENUE_DATA } from '../constants';

const MetricCard: React.FC<{ label: string; value: string; trend?: string; icon: React.ElementType }> = ({ label, value, trend, icon: Icon }) => (
  <div className="glass-panel p-6 flex flex-col justify-between h-full rounded-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300 group bg-white dark:bg-carbon">
    <div className="flex justify-between items-start">
      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wide">{label}</span>
      <Icon className="w-4 h-4 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" strokeWidth={1.5} />
    </div>
    
    <div className="mt-6">
      <div className="flex items-baseline gap-3">
        <h3 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-white">{value}</h3>
        {trend && (
          <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 flex items-center bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-white/5">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            {trend}
          </span>
        )}
      </div>
    </div>
  </div>
);

const ActivityFeed = () => (
  <div className="glass-panel p-0 h-full rounded-md overflow-hidden flex flex-col bg-white dark:bg-carbon">
    <div className="px-6 py-4 border-b border-mist dark:border-charcoal">
        <h3 className="text-[11px] font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wide">Live Feed</h3>
    </div>
    <div className="flex-1 overflow-y-auto p-2">
        {ACTIVITIES.map((activity, i) => (
            <div key={activity.id} className="flex items-start p-3 hover:bg-zinc-50 dark:hover:bg-white/5 rounded-md transition-colors group">
                <div className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 flex-shrink-0 flex items-center justify-center text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                    {activity.user.substring(0,2).toUpperCase()}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        <span className="font-medium text-zinc-900 dark:text-zinc-200">{activity.user}</span>
                        <span className="text-zinc-400 mx-1">·</span>
                        {activity.action}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">{activity.time}</p>
                </div>
            </div>
        ))}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <header className="mb-10 flex justify-between items-end border-b border-mist dark:border-charcoal pb-4">
        <div>
            <h1 className="text-2xl font-light text-zinc-900 dark:text-white tracking-tight">Overview</h1>
        </div>
        <div className="text-[10px] font-mono text-zinc-400">
            UPDATED NOW
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <MetricCard label="Revenue" value="$12,450" trend="12%" icon={ActivityIcon} />
        <MetricCard label="Active Leads" value="42" icon={Users} />
        <div className="md:col-span-2 glass-panel rounded-md p-0 flex flex-col bg-white dark:bg-carbon">
          <div className="flex justify-between items-center px-6 py-4 border-b border-mist dark:border-charcoal">
            <h3 className="text-[11px] font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wide">Projection</h3>
          </div>
          <div className="flex-1 w-full h-full min-h-[120px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#71717a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#71717a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181b', 
                    border: '1px solid #27272a',
                    borderRadius: '4px',
                    color: '#f4f4f5',
                    fontSize: '11px',
                    padding: '8px 12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#fff', padding: 0 }}
                  cursor={{ stroke: '#52525b', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#71717a" 
                  strokeWidth={1.5}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-80">
        <div className="md:col-span-2 glass-panel rounded-md p-8 flex flex-col justify-center items-start bg-white dark:bg-carbon">
            <h3 className="text-lg text-zinc-900 dark:text-white font-medium mb-2">Deal Velocity</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed">
                Average deal cycle has improved by <span className="text-zinc-900 dark:text-white font-medium border-b border-zinc-300 dark:border-zinc-700">14%</span> this month. 
                Focus on high-value opportunities in the 'Proposal' stage.
            </p>
            <div className="mt-10 w-full h-px bg-mist dark:bg-charcoal relative">
                <div className="absolute top-0 left-0 h-full bg-zinc-900 dark:bg-white w-3/4 rounded-full" />
            </div>
        </div>
        <ActivityFeed />
      </div>
    </div>
  );
};

export default Dashboard;