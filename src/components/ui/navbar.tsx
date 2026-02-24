import type { ReactNode } from "react";

type NavbarProps = {
    children: ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
    return <div className="flex flex-row p-4">{children}</div>;
};

export default Navbar;
