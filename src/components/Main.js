import CalculatePrice from "./CalculatePrice";
import WelcomeModal from "./modals/WelcomeModal";
import BackgroundImage from "./widgets/BackgroundImage";
import Footer from "./widgets/Footer";
import Navbar from "./widgets/Navbar";

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">     
            <WelcomeModal />
            
            <BackgroundImage />  
            <Navbar />

            {/* Main Aplication */}
            <div className="pt-4 relative z-10 flex-grow"> {/* Padding-top para compensar a navbar fixa */}
                <CalculatePrice />
            </div>
            
            <Footer />
        </div>
    )
}

export default Main;