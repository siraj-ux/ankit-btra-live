import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/utils/gtm";
import { GA_PRODUCT1, PRODUCT1, PRODUCT2, GA_PRODUCT2 } from "@/utils/product-info";



export const usePageViewGTM = () => {
    const location = useLocation();
    const GA_PAGE = location.pathname === "/ga"; // Assuming GA version is served on /ga route
    const Page = location.pathname === "/"
    const WatchPage = location.pathname === "/watch-fb";
    const WatchPageGA = location.pathname === "/watch-ga";
    
    let product;

    if (location.pathname === "/watch-fb" || location.pathname === "/watch-ga") {
       product = WatchPageGA ? GA_PRODUCT2 : PRODUCT2;

    } else if (location.pathname === "/" || location.pathname === "/ga") {
        product = GA_PAGE ? GA_PRODUCT1 : PRODUCT1;
    }

    useEffect(() => {
        if (Page || GA_PAGE || WatchPage || WatchPageGA) {
            trackPageView({location, title: document.title, product});
        }
        
    }, [location.pathname])

}