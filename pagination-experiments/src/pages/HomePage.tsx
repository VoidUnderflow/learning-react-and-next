import { NavLink, Outlet, useLocation } from "react-router";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../components/ui/navigation-menu";

function HomePage() {
    const location = useLocation();

    if (location.pathname !== "/") return <Outlet />;

    return (
        <div className="flex flex-col items-center gap-8 pt-32">
            <h1 className="p-1 text-2xl underline">Pagination Experiments</h1>
            <div className="border-foreground rounded-md border p-2">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to="/pageBased">
                                    Page-based (products)
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to="/infiniteScroll">
                                    Infinite scroll (Pokemon)
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
}

export default HomePage;
