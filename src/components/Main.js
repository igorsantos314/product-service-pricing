import CalculatePrice from "./CalculatePrice";
import BackgroundImage from "./widgets/BackgroundImage";
import Footer from "./widgets/Footer";
import Navbar from "./widgets/Navbar";

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">     
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