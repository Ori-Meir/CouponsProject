
import { Mainroute } from "../../Route/Mainroute/MainRoute";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import "./MainLayout.css";

export function MainLayout(): JSX.Element {
    return (
        <div className="MainLayout">
			<header>
                <Header/>
            </header>
            <aside>
                <Menu/>
            </aside>
            <main>
                <Mainroute/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}
