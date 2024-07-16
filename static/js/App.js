import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactGA from "react-ga4";

//context
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ScrollingProvider } from "./context/ScrollingContext";

//layout
import Navbar from "./layout/navbar/Navbar";
import Footer from "./layout/footer/Footer";
import Pathes from "./Pathes";

//css
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import "./re_globals.css";
import "./App.css";
import LoadingBar from "./layout/navbar/LoadingBar";
import Celebrate from "./components/ui/Celebrate";
import { isFreeTrialAvailable } from "./services/defaultSettings";
import HasPrepaid from "./middleware/HasPrepaid";

const TRACKING_ID = "G-VKG06CM3Z6";
ReactGA.initialize(TRACKING_ID);

function App() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.search });
    }, []);
    return (
        <AuthProvider>
            <Router>
                <HasPrepaid />
                {isFreeTrialAvailable ? <Celebrate /> : ""}
                <ToastContainer
                    position="top-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <LoadingBar />
                <ThemeProvider>
                    <ScrollingProvider>
                        <Navbar />
                    </ScrollingProvider>
                    <div className="flex flex-col justify-between h-full w-full relative min-h-screen">
                        <div className="w-full">
                            <Pathes />
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </Router>
        </AuthProvider>
    );
}

export default App;
