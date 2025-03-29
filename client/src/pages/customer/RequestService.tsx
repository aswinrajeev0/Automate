import React from "react";
import { Header } from "../../components/customer/Header";
import { Footer } from "../../components/customer/Footer";
import CtaSection from "../../components/customer/service/CtaSection";
import ChooseUs from "../../components/customer/service/ChooseUsSection";
import FeaturedServices from "../../components/customer/service/FeaturesServices";

const ServicesPage: React.FC = () => {

    return (
    <>
    <Header />
        <div className="container mx-auto px-4 py-12">
            
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Automotive Services</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Professional automotive solutions tailored to your needs. Choose the service that works for you.
                </p>
            </div>

            {/* Featured Services */}
            <FeaturedServices />

            {/* Why Choose Us Section */}
            <ChooseUs />

            {/* CTA Section */}
            <CtaSection />
        </div>
        <Footer />
    </>
    );
};

export default ServicesPage;