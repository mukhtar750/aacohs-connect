import './bootstrap';
import './index.css'; 

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";

const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => title ? `${title} - AACOHS Connect` : 'AACOHS Connect',
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <App {...props} />
                </TooltipProvider>
            </QueryClientProvider>
        );
    },
});
