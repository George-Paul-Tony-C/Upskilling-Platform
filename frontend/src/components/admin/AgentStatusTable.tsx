/*===================================================================
  2. src/components/admin/AgentStatusTable.tsx
===================================================================*/
import type { AgentStatus } from '../../types';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'online':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'idle':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'offline':
    case 'error':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'maintenance':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIndicator = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'online':
      return 'bg-emerald-500';
    case 'idle':
      return 'bg-amber-500';
    case 'offline':
    case 'error':
      return 'bg-red-500';
    case 'maintenance':
      return 'bg-blue-500';
    default:
      return 'bg-gray-400';
  }
};

const formatLatency = (latency: number) => {
  return latency < 1000 ? `${latency}ms` : `${(latency / 1000).toFixed(1)}s`;
};

const getLatencyColor = (latency: number) => {
  if (latency < 100) return 'text-emerald-600';
  if (latency < 500) return 'text-amber-600';
  return 'text-red-600';
};

const getErrorRateColor = (errorRate: number) => {
  if (errorRate < 0.01) return 'text-emerald-600';
  if (errorRate < 0.05) return 'text-amber-600';
  return 'text-red-600';
};

export default function AgentStatusTable({ agents }: { agents: AgentStatus[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Agent
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Queue
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Latency
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Error Rate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agents.map((agent, index) => (
              <tr 
                key={agent.name} 
                className={`hover:bg-gray-50 transition-colors duration-150 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${getStatusIndicator(agent.status)}`} />
                    <span className="text-sm font-medium text-gray-900">{agent.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-sm text-gray-900 font-mono">
                    {agent.queueSize.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className={`text-sm font-mono font-medium ${getLatencyColor(agent.averageLatency)}`}>
                    {formatLatency(agent.averageLatency)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className={`text-sm font-mono font-medium ${getErrorRateColor(agent.errorRate)}`}>
                    {(agent.errorRate * 100).toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {agents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-sm">No agents available</div>
        </div>
      )}
    </div>
  );
}
