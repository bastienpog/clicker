"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

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
        <div className="fixed bottom-6 right-6 space-y-2 z-50 items-end">
            {toasts.map((t) => (
                <Toast key={t.id} item={t} />
            ))}
        </div>
    );
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const recentMapRef = useRef<Map<string, number>>(new Map());

    const showToast = useCallback((message: string, variant: ToastVariant = "info") => {
        const key = `${variant}:${message}`;
        const now = Date.now();

        // De-dup identical toasts within 1500ms
        const last = recentMapRef.current.get(key) ?? 0;
        if (now - last < 1500) return;
        recentMapRef.current.set(key, now);

        const id = now + Math.random();
        const item: ToastItem = { id, message, variant };
        // Cap to last 3 toasts on screen
        setToasts((prev) => [...prev.slice(-2), item]);
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
