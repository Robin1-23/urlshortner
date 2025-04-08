// import React, { useState, useEffect } from 'react';
// import { Link2, Loader2, Calendar, Hash, QrCode, Search } from 'lucide-react';
// import { QRCodeSVG } from 'qrcode.react';
// import { supabase } from '../lib/supabase';

// interface Link {
//   id: string;
//   original_url: string;
//   short_code: string;
//   created_at: string;
//   click_count: number;
//   expires_at: string | null;
// }

// export function Dashboard() {
//   const [links, setLinks] = useState<Link[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [url, setUrl] = useState('');
//   const [customAlias, setCustomAlias] = useState('');
//   const [expiresAt, setExpiresAt] = useState('');
//   const [creating, setCreating] = useState(false);
//   const [error, setError] = useState('');
//   const [search, setSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedQR, setSelectedQR] = useState<string | null>(null);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchLinks();
//   }, []);

//   async function fetchLinks() {
//     try {
//       const { data, error } = await supabase
//         .from('links')
//         .select('*')
//         .order('created_at', { ascending: false });

//       if (error) throw error;
//       setLinks(data || []);
//     } catch (error) {
//       console.error('Error fetching links:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function createShortLink(e: React.FormEvent) {
//     e.preventDefault();
//     if (!url) return;
//     setError('');

//     try {
//       setCreating(true);
//       const shortCode = customAlias || Math.random().toString(36).substr(2, 6);

//       // Check if custom alias is already taken
//       if (customAlias) {
//         const { data: existing } = await supabase
//           .from('links')
//           .select('id')
//           .eq('short_code', customAlias)
//           .single();

//         if (existing) {
//           setError('This custom alias is already taken');
//           setCreating(false);
//           return;
//         }
//       }

//       const { error } = await supabase.from('links').insert([
//         {
//           original_url: url,
//           short_code: shortCode,
//           expires_at: expiresAt || null,
//           user_id: (await supabase.auth.getUser()).data.user?.id,
//         },
//       ]);

//       if (error) throw error;
//       setUrl('');
//       setCustomAlias('');
//       setExpiresAt('');
//       fetchLinks();
//     } catch (error) {
//       console.error('Error creating short link:', error);
//       setError('Failed to create short link');
//     } finally {
//       setCreating(false);
//     }
//   }

//   const filteredLinks = links.filter(
//     (link) =>
//       link.original_url.toLowerCase().includes(search.toLowerCase()) ||
//       link.short_code.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
//   const paginatedLinks = filteredLinks.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <form onSubmit={createShortLink} className="bg-white shadow-sm rounded-lg p-6">
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="url" className="block text-sm font-medium text-gray-700">
//               URL to Shorten
//             </label>
//             <div className="mt-1">
//               <input
//                 id="url"
//                 type="url"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 placeholder="https://example.com/very-long-url"
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="alias" className="block text-sm font-medium text-gray-700">
//               Custom Alias (Optional)
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Hash className="h-4 w-4 text-gray-400" />
//               </div>
//               <input
//                 id="alias"
//                 type="text"
//                 value={customAlias}
//                 onChange={(e) => setCustomAlias(e.target.value)}
//                 placeholder="my-custom-link"
//                 className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
//               Expiration Date (Optional)
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Calendar className="h-4 w-4 text-gray-400" />
//               </div>
//               <input
//                 id="expiration"
//                 type="datetime-local"
//                 value={expiresAt}
//                 onChange={(e) => setExpiresAt(e.target.value)}
//                 className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-600 text-sm">{error}</div>
//           )}

//           <button
//             type="submit"
//             disabled={creating}
//             className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             {creating ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <>
//                 <Link2 className="h-4 w-4 mr-2" />
//                 Shorten URL
//               </>
//             )}
//           </button>
//         </div>
//       </form>

//       <div className="bg-white shadow-sm rounded-lg">
//         <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
//           <h3 className="text-lg font-medium text-gray-900">Your Links</h3>
//           <div className="relative">
//             <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search links..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
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
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   QR Code
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {paginatedLinks.map((link) => {
//                 const shortUrl = `${window.location.origin}/${link.short_code}`;
//                 return (
//                   <tr key={link.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">
//                       {link.original_url}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {shortUrl}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {link.click_count}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(link.created_at).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       {link.expires_at ? (
//                         new Date(link.expires_at) < new Date() ? (
//                           <span className="text-red-600">Expired</span>
//                         ) : (
//                           <span className="text-green-600">Active</span>
//                         )
//                       ) : (
//                         <span className="text-green-600">Active</span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <button
//                         onClick={() => setSelectedQR(selectedQR === link.id ? null : link.id)}
//                         className="text-indigo-600 hover:text-indigo-900"
//                       >
//                         <QrCode className="h-5 w-5" />
//                       </button>
//                       {selectedQR === link.id && (
//                         <div className="absolute mt-2 p-4 bg-white rounded-lg shadow-lg">
//                           <QRCodeSVG value={shortUrl} size={128} />
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
//             <div className="flex-1 flex justify-between sm:hidden">
//               <button
//                 onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
//                 disabled={currentPage === 1}
//                 className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
//                 disabled={currentPage === totalPages}
//                 className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//               >
//                 Next
//               </button>
//             </div>
//             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-700">
//                   Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
//                   <span className="font-medium">
//                     {Math.min(currentPage * itemsPerPage, filteredLinks.length)}
//                   </span>{' '}
//                   of <span className="font-medium">{filteredLinks.length}</span> results
//                 </p>
//               </div>
//               <div>
//                 <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                     <button
//                       key={page}
//                       onClick={() => setCurrentPage(page)}
//                       className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                         page === currentPage
//                           ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
//                           : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }














import React, { useState, useEffect } from 'react';
import { Link2, Loader2, Calendar, Hash, QrCode, Search } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '../lib/supabase';

interface Link {
  id: string;
  original_url: string;
  short_code: string;
  created_at: string;
  click_count: number;
  expires_at: string | null;
}

export function Dashboard() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createShortLink(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    setError('');

    try {
      setCreating(true);
      const shortCode = customAlias || Math.random().toString(36).substr(2, 6);

      if (customAlias) {
        const { data: existing } = await supabase
          .from('links')
          .select('id')
          .eq('short_code', customAlias)
          .single();

        if (existing) {
          setError('This custom alias is already taken');
          setCreating(false);
          return;
        }
      }

      const { error } = await supabase.from('links').insert([
        {
          original_url: url,
          short_code: shortCode,
          expires_at: expiresAt || null,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        },
      ]);

      if (error) throw error;
      setUrl('');
      setCustomAlias('');
      setExpiresAt('');
      fetchLinks();
    } catch (error) {
      console.error('Error creating short link:', error);
      setError('Failed to create short link');
    } finally {
      setCreating(false);
    }
  }

  const filteredLinks = links.filter(
    (link) =>
      link.original_url.toLowerCase().includes(search.toLowerCase()) ||
      link.short_code.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 space-y-6">
      {/* Form */}
      <form onSubmit={createShortLink} className="bg-white shadow-sm rounded-lg p-6 text-black">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              URL to Shorten
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="alias" className="block text-sm font-medium text-gray-700">
              Custom Alias (Optional)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="alias"
                type="text"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="my-custom-link"
                className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
              Expiration Date (Optional)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="expiration"
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {error && <div className="text-red-600 text-sm sm:col-span-2">{error}</div>}

          <button
            type="submit"
            disabled={creating}
            className="sm:col-span-2 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <>
              <Link2 className="h-4 w-4 mr-2" />
              Shorten URL
            </>}
          </button>
        </div>
      </form>

      {/* Links */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-medium text-gray-900">Your Links</h3>
          <div className="relative w-full sm:w-64">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search links..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Original URL', 'Short URL', 'Clicks', 'Created', 'Status', 'QR Code'].map(col => (
                  <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedLinks.map((link) => {
                const shortUrl = `${window.location.origin}/${link.short_code}`;
                return (
                  <tr key={link.id}>
                    <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-xs">{link.original_url}</td>
                    <td className="px-6 py-4 text-sm text-indigo-600">{shortUrl}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{link.click_count}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(link.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {link.expires_at && new Date(link.expires_at) < new Date() ? (
                        <span className="text-red-600">Expired</span>
                      ) : (
                        <span className="text-green-600">Active</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm relative">
                      <div className="relative">
                        <button onClick={() => setSelectedQR(selectedQR === link.id ? null : link.id)}>
                          <QrCode className="h-5 w-5 text-indigo-600 hover:text-indigo-900" />
                        </button>
                        {selectedQR === link.id && (
                          <div className="absolute z-50 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg left-0 sm:left-auto">
                            <QRCodeSVG value={shortUrl} size={128} />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredLinks.length)}</span> of{' '}
            <span className="font-medium">{filteredLinks.length}</span> results
          </p>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm rounded-md border ${
                  page === currentPage
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}





