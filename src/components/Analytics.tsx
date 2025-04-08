// import React, { useState, useEffect } from 'react';
// import { Loader2 } from 'lucide-react';
// import { supabase } from '../lib/supabase';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// interface AnalyticsData {
//   id: string;
//   link_id: string;
//   browser: string;
//   country: string;
//   city: string;
//   created_at: string;
// }

// interface Link {
//   id: string;
//   original_url: string;
//   short_code: string;
//   created_at: string;
//   expires_at: string | null;
//   click_count: number;
// }

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// export function Analytics() {
//   const [loading, setLoading] = useState(true);
//   const [links, setLinks] = useState<Link[]>([]);
//   const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
//   const [selectedLink, setSelectedLink] = useState<string | null>(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     try {
//       // Fetch links
//       const { data: linksData, error: linksError } = await supabase
//         .from('links')
//         .select('*')
//         .order('created_at', { ascending: false });

//       if (linksError) throw linksError;
//       setLinks(linksData || []);

//       // Fetch analytics for all links
//       const { data: analyticsData, error: analyticsError } = await supabase
//         .from('analytics')
//         .select('*')
//         .order('created_at', { ascending: true });

//       if (analyticsError) throw analyticsError;
//       setAnalytics(analyticsData || []);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const prepareTimeSeriesData = (linkId: string | null) => {
//     const filteredAnalytics = linkId
//       ? analytics.filter(a => a.link_id === linkId)
//       : analytics;

//     const clicksByDate = filteredAnalytics.reduce((acc, click) => {
//       const date = new Date(click.created_at).toLocaleDateString();
//       acc[date] = (acc[date] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);

//     return Object.entries(clicksByDate).map(([date, clicks]) => ({
//       date,
//       clicks,
//     }));
//   };

//   const prepareBrowserData = (linkId: string | null) => {
//     const filteredAnalytics = linkId
//       ? analytics.filter(a => a.link_id === linkId)
//       : analytics;

//     const browserCounts = filteredAnalytics.reduce((acc, click) => {
//       const browser = click.browser.split('/')[0] || 'Unknown';
//       acc[browser] = (acc[browser] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);

//     return Object.entries(browserCounts).map(([name, value]) => ({
//       name,
//       value,
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-white shadow-sm rounded-lg p-6">
//         <h2 className="text-lg font-medium text-gray-900 mb-4">Analytics Dashboard</h2>
        
//         <div className="mb-4">
//           <label htmlFor="linkFilter" className="block text-sm font-medium text-gray-700">
//             Filter by Link
//           </label>
//           <select
//             id="linkFilter"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             value={selectedLink || ''}
//             onChange={(e) => setSelectedLink(e.target.value || null)}
//           >
//             <option value="">All Links</option>
//             {links.map((link) => (
//               <option key={link.id} value={link.id}>
//                 {link.original_url} ({link.short_code})
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h3 className="text-sm font-medium text-gray-700 mb-4">Clicks Over Time</h3>
//             <LineChart width={500} height={300} data={prepareTimeSeriesData(selectedLink)}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
//             </LineChart>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h3 className="text-sm font-medium text-gray-700 mb-4">Browser Distribution</h3>
//             <PieChart width={500} height={300}>
//               <Pie
//                 data={prepareBrowserData(selectedLink)}
//                 cx={250}
//                 cy={150}
//                 labelLine={false}
//                 label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//                 outerRadius={120}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {prepareBrowserData(selectedLink).map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white shadow-sm rounded-lg">
//         <div className="px-4 py-5 sm:px-6">
//           <h3 className="text-lg font-medium text-gray-900">Links Overview</h3>
//         </div>
//         <div className="border-t border-gray-200">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Original URL
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Short URL
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Clicks
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Created
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {links.map((link) => (
//                 <tr key={link.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">
//                     {link.original_url}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {window.location.origin}/{link.short_code}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {link.click_count}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(link.created_at).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     {link.expires_at ? (
//                       new Date(link.expires_at) < new Date() ? (
//                         <span className="text-red-600">Expired</span>
//                       ) : (
//                         <span className="text-green-600">Active</span>
//                       )
//                     ) : (
//                       <span className="text-green-600">Active</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }











import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

interface AnalyticsData {
  id: string;
  link_id: string;
  browser: string;
  country: string;
  city: string;
  created_at: string;
}

interface Link {
  id: string;
  original_url: string;
  short_code: string;
  created_at: string;
  expires_at: string | null;
  click_count: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const timeFilters = {
  ALL: 'All Time',
  LAST_7: 'Last 7 Days',
  LAST_30: 'Last 30 Days',
};

export function Analytics() {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<Link[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<string>('ALL');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: linksData, error: linksError } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false });

      if (linksError) throw linksError;
      setLinks(linksData || []);

      const { data: analyticsData, error: analyticsError } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: true });

      if (analyticsError) throw analyticsError;
      setAnalytics(analyticsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const filterByDateRange = (data: AnalyticsData[]) => {
    if (timeFilter === 'ALL') return data;
    const now = new Date();
    const cutoff = new Date(
      timeFilter === 'LAST_7'
        ? now.setDate(now.getDate() - 7)
        : now.setDate(now.getDate() - 30)
    );
    return data.filter(d => new Date(d.created_at) >= cutoff);
  };

  const filteredAnalytics = analytics.filter(a =>
    (!selectedLink || a.link_id === selectedLink)
  );
  const dateFilteredAnalytics = filterByDateRange(filteredAnalytics);

  const prepareTimeSeriesData = () => {
    const clicksByDate = dateFilteredAnalytics.reduce((acc, click) => {
      const date = new Date(click.created_at).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(clicksByDate).map(([date, clicks]) => ({ date, clicks }));
  };

  const preparePieData = (field: 'browser' | 'country') => {
    const counts = dateFilteredAnalytics.reduce((acc, click) => {
      const key = click[field]?.split('/')[0] || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const totalClicks = filteredAnalytics.length;
  const topBrowser = preparePieData('browser')?.[0]?.name || 'N/A';
  const topCountry = preparePieData('country')?.[0]?.name || 'N/A';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Analytics Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="text-sm text-gray-700">Total Clicks: <span className="font-semibold">{totalClicks}</span></div>
          <div className="text-sm text-gray-700">Top Browser: <span className="font-semibold">{topBrowser}</span></div>
          <div className="text-sm text-gray-700">Top Country: <span className="font-semibold">{topCountry}</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="linkFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Link
            </label>
            <select
              id="linkFilter"
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={selectedLink || ''}
              onChange={(e) => setSelectedLink(e.target.value || null)}
            >
              <option value="">All Links</option>
              {links.map((link) => (
                <option key={link.id} value={link.id}>
                  {link.original_url} ({link.short_code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timeFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Time
            </label>
            <select
              id="timeFilter"
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              {Object.entries(timeFilters).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg col-span-2">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Clicks Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={prepareTimeSeriesData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Browser Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={preparePieData('browser')}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {preparePieData('browser').map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Country Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={preparePieData('country')}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {preparePieData('country').map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Links Overview</h3>
        </div>
        <div className="border-t border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {links.map((link) => (
                <tr key={link.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-xs">{link.original_url}</td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    {window.location.origin}/{link.short_code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{link.click_count}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{new Date(link.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    {link.expires_at && new Date(link.expires_at) < new Date() ? (
                      <span className="text-red-600">Expired</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
