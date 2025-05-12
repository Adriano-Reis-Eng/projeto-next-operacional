'use client';
import { usePathname } from 'next/navigation';
import { Navbar } from '../app/components/navbar/Navbar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const hideNavbarRoutes = ['/login', '/cadastro', '/recuperar-senha']; // adicione os caminhos aqui
    const hideNavbar = hideNavbarRoutes.includes(pathname);

    return (
        <>
            {!hideNavbar && <Navbar />}
            {children}
        </>
    );
}