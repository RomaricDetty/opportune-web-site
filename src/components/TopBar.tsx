"use client"
import React from 'react';
import { useState } from "react";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import exp from 'constants';

function Topbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="w-full font-sans shadow-md">
      {/* Top bar */}
      <div className="bg-white px-4 py-3 flex items-center gap-4">
        <div className="flex-1 max-w-2xl mx-4">
          <div className="flex border-2 border-gray-200 rounded-md overflow-hidden hover:border-red-400 transition-colors">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Recherche pour les produits"
              className="flex-1 px-4 py-2 text-sm text-gray-700 outline-none bg-white"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 transition-colors">
                <IconifyIcon icon="lucide:search" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 ml-auto">
          <div className="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 1 1-12.728 0M12 13V9m0 4h.01" />
            </svg>
            <div>
              <div className="text-xs text-gray-500 font-medium">24/7 Support</div>
              <div className="text-sm font-bold text-gray-800">+225 0757240518</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 1 2 2v2.945M8 3.935V5.5A2.5 2.5 0 0 0 10.5 8h.5a2 2 0 0 1 2 2 2 2 0 0 0 4 0 2 2 0 0 1 2-2h1.064M15 20.488V18a2 2 0 0 1 2-2h3.064M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <div>
              <div className="text-xs font-semibold text-gray-700">Expédition</div>
              <div className="text-xs text-red-500 font-medium">Livraison partout en Côte d'Ivoire</div>
            </div>
          </div>
        </div>
      </div>

   
    </header>
  );
}

export default Topbar;