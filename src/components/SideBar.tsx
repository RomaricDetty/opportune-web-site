"use client"
import React, { useState, useEffect } from "react";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { CartegoryService } from "@/services/categoryService";
import { Category } from "@/types/articles";
import Link from "next/link";


function SideBar({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [active, setActive] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch toutes les catégories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await CartegoryService.getAll(); // adapter selon ton service
                setCategories(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Erreur chargement catégories:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black z-999 transition-opacity duration-300 ${
                    open ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            {/* Drawer */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col z-999 shadow-2xl transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-start gap-2 px-4 py-3 border-b border-gray-700 bg-primary-800">
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <IconifyIcon icon="lucide:menu" className="h-6 w-6 text-white" />
                    </button>
                    <span className="text-md font-semibold">Toutes les catégories</span>
                </div>

                {/* Menu items */}
                <nav className="flex flex-col py-2 flex-1 overflow-y-auto">
                    {/* Loader */}
                    {loading && (
                        <div className="flex items-center justify-center py-8">
                            <IconifyIcon icon="lucide:loader" className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                    )}

                    {/* Liste des catégories depuis l'API */}
                    {!loading && categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/others?category=${cat.libelle}&uid=${cat.id}`}
                            onClick={() => {
                                setActive(cat.id);
                                onClose();
                            }}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-150 group relative
                                ${active === cat.id
                                    ? "bg-primary text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                        >
                            {active === cat.id && (
                                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full" />
                            )}
                             <IconifyIcon icon="lucide:tag" className="h-4 w-4 shrink-0 text-gray-400" />
                            <span className="truncate">{cat.libelle}</span>
                        </Link>
                    ))}

                    {/* Vide */}
                    {!loading && categories.length === 0 && (
                        <p className="text-center text-gray-500 text-sm py-8">
                            Aucune catégorie disponible
                        </p>
                    )}
                </nav>
            </aside>
        </>
    );
}

export default SideBar;