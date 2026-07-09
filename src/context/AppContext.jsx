import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  return useContext(AppContext);
};

const translations = {
  en: {
    whyModernRiders: "Why Modern Riders Choose Us",
    insuredTitle: "100% Insured Rides",
    insuredDesc: "Ride with peace of mind. Every motorcycle in our fleet is fully covered by comprehensive insurance.",
    supportTitle: "24/7 Roadside Assistance",
    supportDesc: "Stuck in the middle of nowhere? Our emergency dispatch is just a phone call away.",
    modelsTitle: "Verified Fleet Quality",
    modelsDesc: "We inspect and service every bike before handover so you get a smooth, breakdown-free experience.",
    deliveryTitle: "Doorstep Handover",
    deliveryDesc: "We deliver the bike straight to your home, hotel, or station for maximum convenience.",
    bikesCollection: "OUR RENTAL CATALOG",
    exploreFleet: "Explore Our Fleet",
    exploreFleetDesc: "Select from our range of cruiser, adventure, sport, and street motorcycles for your next ride.",
    searchPlaceholder: "Search by bike name, type, or location...",
    priceLimitLabel: "MAX PRICE LIMIT",
    day: "day",
    days: "days",
    noBikesFound: "No bikes found matching your filters.",
    resetFilters: "Reset Filters",
    whyUsSubtitle: "WHY RIDE WITH US",
    whyUsTitle: "The Ultimate Motorcycle Experience",
    topBikesSubtitle: "FEATURED VEHICLES",
    topBikes: "Our Popular Models",
    topBikesDesc: "Handpicked favorites loved by our riders for performance, mileage, and comfort.",
    viewAllBikes: "View All Bikes",
    riderStories: "TESTIMONIALS",
    lovedByRiders: "Loved By Thousands of Riders",
    limitedOffer: "LIMITED TIME OFFER",
    readyToRide: "Ready to Start Your Adventure?",
    discountText: "Book now and get up to 10% off on weekly rentals with free delivery inside Biratnagar.",
    bookNowBtn: "Book Now",
    talkToUs: "Talk to Support",
    heroTitlePrefix: "Rent The Best",
    heroTitleSuffix: "Rides in Nepal",
    heroSubtitle: "Premium motorcycle rental service in Biratnagar & Belbari. Start your journey today with verified, well-maintained bikes.",
    findBike: "Find Your Ride",
    contactUs: "Contact Us",
    scroll: "SCROLL DOWN",
    happyRiders: "Happy Riders",
    premiumBikes: "Premium Bikes",
    locations: "Rental Hubs",
    roadSupport: "Support Teams",
    bookNow: "Book Now",
    pickupDate: "Pickup date is required.",
    paymentSuccess: "Payment Processed!",
    simPaymentTitle: "Simulating Digital Payment",
    processingPayment: "Processing security check for {method}...",
    stepOf: "Step {current} of 4",
  },
  ne: {
    whyModernRiders: "आधुनिक राइडरहरूले हामीलाई किन रोज्छन्",
    insuredTitle: "१००% बीमाकृत राइडहरू",
    insuredDesc: "निश्चिन्त भई यात्रा गर्नुहोस्। हाम्रा प्रत्येक बाइकहरू पूर्ण बीमाद्वारा सुरक्षित छन्।",
    supportTitle: "२४/७ सडक सहायता",
    supportDesc: "कतै बीच बाटोमा अड्किनुभयो? हाम्रो आपतकालीन टोली एक फोन कलको दूरीमा छ।",
    modelsTitle: "प्रमाणित बाइक गुणस्तर",
    modelsDesc: "हामी हस्तान्तरण गर्नु अघि प्रत्येक बाइकको निरीक्षण र मर्मत गर्छौं ताकि तपाईंले सहज यात्रा पाउनुहोस्।",
    deliveryTitle: "घरदैलोमै डेलिभरी",
    deliveryDesc: "हामी तपाईंको सुविधाको लागि बाइक सीधा तपाईंको घर, होटल वा स्टेशनमा पुर्‍याउँछौं।",
    bikesCollection: "हाम्रो रेन्टल क्याटलग",
    exploreFleet: "हाम्रो बाइकहरू हेर्नुहोस्",
    exploreFleetDesc: "तपाईंको अर्को यात्राको लागि हाम्रो क्रुजर, एडभेन्चर, स्पोर्ट्स र स्ट्रिट बाइकहरूबाट छनोट गर्नुहोस्।",
    searchPlaceholder: "बाइकको नाम, प्रकार वा स्थान खोज्नुहोस्...",
    priceLimitLabel: "अधिकतम मूल्य सीमा",
    day: "दिन",
    days: "दिन",
    noBikesFound: "तपाईंको फिल्टरसँग मिल्ने कुनै बाइक फेला परेन।",
    resetFilters: "फिल्टरहरू रिसेट गर्नुहोस्",
    whyUsSubtitle: "हामीलाई किन रोज्ने",
    whyUsTitle: "उत्कृष्ट मोटरसाइकल अनुभव",
    topBikesSubtitle: "विशेष बाइकहरू",
    topBikes: "हाम्रा लोकप्रिय मोडेलहरू",
    topBikesDesc: "प्रदर्शन, माइलेज र आरामको लागि हाम्रा राइडरहरूले मन पराएका लोकप्रिय मोडेलहरू।",
    viewAllBikes: "सबै बाइकहरू हेर्नुहोस्",
    riderStories: "राइडरका अनुभवहरू",
    lovedByRiders: "हजारौं राइडरहरूद्वारा मन पराइएको",
    limitedOffer: "सीमित समयको अफर",
    readyToRide: "तपाईंको यात्रा सुरु करना तयार हुनुहुन्छ?",
    discountText: "अहिले नै बुक गर्नुहोस् र विराटनगर भित्र निःशुल्क डेलिभरीका साथ साप्ताहिक भाडामा १०% सम्म छुट पाउनुहोस्।",
    bookNowBtn: "अहिले नै बुक गर्नुहोस्",
    talkToUs: "सपोर्टसँग कुरा गर्नुहोस्",
    heroTitlePrefix: "उत्कृष्ट बाइक",
    heroTitleSuffix: "भाडामा लिनुहोस्",
    heroSubtitle: "विराटनगर र बेलबारीमा प्रिमियम मोटरसाइकल भाडा सेवा। प्रमाणित र राम्रोसँग मर्मत गरिएका बाइकहरूको साथ आजै आफ्नो यात्रा सुरु गर्नुहोस्।",
    findBike: "बाइक खोज्नुहोस्",
    contactUs: "हामीलाई सम्पर्क गर्नुहोस्",
    scroll: "तल स्क्रोल गर्नुहोस्",
    happyRiders: "सन्तुष्ट राइडरहरू",
    premiumBikes: "प्रिमियम बाइकहरू",
    locations: "रेन्टल हबहरू",
    roadSupport: "सपोर्ट टोलीहरू",
    bookNow: "अहिले नै बुक गर्नुहोस्",
    pickupDate: "पिकअप मिति आवश्यक छ।",
    paymentSuccess: "भुक्तानी सफल भयो!",
    simPaymentTitle: "डिजिटल भुक्तानी सिमुलेट गरिँदै",
    processingPayment: "{method} को लागि सुरक्षा जाँच प्रशोधन गर्दै...",
    stepOf: "चरण {current} / ४",
  }
};

export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  // Sync theme to root html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Real translation function with placeholder replacement
  const t = (key, params = {}) => {
    let text = translations[language]?.[key] || translations["en"]?.[key] || key;
    Object.keys(params).forEach(paramKey => {
      text = text.replace(`{${paramKey}}`, params[paramKey]);
    });
    return text;
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const value = {
    theme,
    toggleTheme,
    language,
    changeLanguage,
    t
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
