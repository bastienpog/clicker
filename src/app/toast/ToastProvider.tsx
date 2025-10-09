"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type ToastVariant = "success" | "error" | "info";

interface ToastItem {
    id: number;
    message: string;
    variant: ToastVariant;
}

interface ToastContextValue {
    showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
};

const Toast = ({ item }: { item: ToastItem }) => {
    const color = item.variant === "success" ? "bg-green-600" : item.variant === "error" ? "bg-red-600" : "bg-gray-700";
    return (
        <div className={`text-white px-4 py-2 rounded shadow ${color}`}>{item.message}</div>
    );
};

const ToastViewport = ({ toasts }: { toasts: ToastItem[] }) => {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 space-y-2 z-50">
            {toasts.map((t) => (
                <Toast key={t.id} item={t} />
            ))}
        </div>
    );
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const showToast = useCallback((message: string, variant: ToastVariant = "info") => {
        const id = Date.now() + Math.random();
        const item: ToastItem = { id, message, variant };
        setToasts((prev) => [...prev, item]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
    }, []);

    const value = useMemo(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastViewport toasts={toasts} />
        </ToastContext.Provider>
    );
};
