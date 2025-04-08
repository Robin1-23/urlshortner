// import React from 'react';
// import { RedirectHandler } from './components/RedirectHandler';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Link2, BarChart3 } from 'lucide-react';
// import { Auth } from './components/Auth';
// import { Dashboard } from './components/Dashboard';
// import { Analytics } from './components/Analytics';
// import { useAuth } from './hooks/useAuth';

// function App() {
//   const { session } = useAuth();

//   if (!session) {
//     return <Auth />;
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <nav className="bg-white shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between h-16">
//               <div className="flex">
//                 <div className="flex-shrink-0 flex items-center">
//                   <Link2 className="h-8 w-8 text-indigo-600" />
//                   <span className="ml-2 text-xl font-bold text-gray-900">URL Shortener</span>
//                 </div>
//                 <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                   <a href="/" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                     Links
//                   </a>
//                   <a href="/analytics" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                     <BarChart3 className="h-4 w-4 mr-1" />
//                     Analytics
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>

//         <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/analytics" element={<Analytics />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// import { Link2, BarChart3 } from 'lucide-react';
// import { Auth } from './components/Auth';
// import { Dashboard } from './components/Dashboard';
// import { Analytics } from './components/Analytics';
// import { useAuth } from './hooks/useAuth';

// function App() {
//   const { session } = useAuth();

//   if (!session) {
//     return <Auth />;
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <nav className="bg-white shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between h-16">
//               <div className="flex">
//                 <div className="flex-shrink-0 flex items-center">
//                   <Link2 className="h-8 w-8 text-indigo-600" />
//                   <span className="ml-2 text-xl font-bold text-gray-900">URL Shortener</span>
//                 </div>
//                 <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                   <NavLink
//                     to="/"
//                     end
//                     className={({ isActive }) =>
//                       isActive
//                         ? 'border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
//                         : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
//                     }
//                   >
//                     Links
//                   </NavLink>
//                   <NavLink
//                     to="/analytics"
//                     className={({ isActive }) =>
//                       isActive
//                         ? 'border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
//                         : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
//                     }
//                   >
//                     <BarChart3 className="h-4 w-4 mr-1" />
//                     Analytics
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>

//         <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/analytics" element={<Analytics />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// import { Link2, BarChart3 } from 'lucide-react';
// import { Auth } from './components/Auth';
// import { Dashboard } from './components/Dashboard';
// import { Analytics } from './components/Analytics';
// import { useAuth } from './hooks/useAuth';

// function App() {
//   const { session } = useAuth();

//   if (!session) {
//     return <Auth />;
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
//         <nav className="bg-white dark:bg-gray-800 shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between h-16">
//               <div className="flex">
//                 <div className="flex-shrink-0 flex items-center">
//                   <Link2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
//                   <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">URL Shortener</span>
//                 </div>
//                 <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                   <NavLink
//                     to="/"
//                     end
//                     className={({ isActive }) =>
//                       isActive
//                         ? 'border-indigo-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
//                         : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
//                     }
//                   >
//                     Links
//                   </NavLink>
//                   <NavLink
//                     to="/analytics"
//                     className={({ isActive }) =>
//                       isActive
//                         ? 'border-indigo-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
//                         : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
//                     }
//                   >
//                     <BarChart3 className="h-4 w-4 mr-1" />
//                     Analytics
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>

//         <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/analytics" element={<Analytics />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;







import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Link2, BarChart3, Menu, X } from 'lucide-react';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { useAuth } from './hooks/useAuth';

function App() {
  const { session } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!session) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">URL Shortener</span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden sm:flex sm:space-x-8">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? 'border-indigo-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  }
                >
                  Links
                </NavLink>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) =>
                    isActive
                      ? 'border-indigo-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  }
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Analytics
                </NavLink>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="sm:hidden flex items-center">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 dark:text-gray-300 focus:outline-none">
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden px-4 pb-4 space-y-2">
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 rounded-md text-base font-medium text-indigo-600 dark:text-white bg-indigo-100 dark:bg-gray-700'
                    : 'block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              >
                Links
              </NavLink>
              <NavLink
                to="/analytics"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 rounded-md text-base font-medium text-indigo-600 dark:text-white bg-indigo-100 dark:bg-gray-700'
                    : 'block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              >
                Analytics
              </NavLink>
            </div>
          )}
        </nav>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;




