import { useState } from "react";
import { ArrowRight, MapPin, MessageCircle, Users, Wrench, Home, Star } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import {Header} from "../../components/ui/customer/Header"
import { Footer } from "../../components/ui/customer/Footer";

export default function LandingPage() {
  const navigate = useNavigate();
  
  const workshops = [
    {
      id: 1,
      name: "Auto King Workshop",
      location: "Muscat, Oman",
      image: "./mechs2.jpg"
    },
    {
      id: 2,
      name: "Auto King Workshop",
      location: "Muscat, Oman",
      image: "./mechs2.jpg"
    },
    {
      id: 3,
      name: "Auto King Workshop",
      location: "Muscat, Oman",
      image: "./mechs.jpg"
    },
    {
      id: 4,
      name: "Auto King Workshop",
      location: "Muscat, Oman",
      image: "./mechs.jpg"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with navigation */}
      <Header />

      {/* Hero section */}
      <section className="relative">
        <img src="./banner.png" alt="" />
        {/* <div className="relative w-full h-[500px] bg-black/50 flex items-center">
          <img 
            src="./mechs2.jpg" 
            alt="Workshop with mechanics" 
            className="absolute w-full h-full object-cover mix-blend-overlay"
          />
          <div className="container mx-auto px-8 md:px-12 relative z-10 text-white">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">A FAMILY OWNED BUSINESS WITH A LARGE, CLEAN WORKSHOP</h2>
              
              <div className="border-2 border-white inline-block p-5 mb-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    <span className="mx-2">—</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L12 13L4 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 18H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="mx-2">—</span>
                  </div>
                  <h3 className="text-2xl font-bold">30 YEARS OF</h3>
                  <p className="text-lg tracking-wider">EXPERIENCE</p>
                </div>
              </div>
              
              <p className="text-xl mb-8">WITH ALL WORK BACKED BY A PARTS AND LABOUR GUARANTEE.</p>
              
              <button className="bg-amber-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition-colors flex items-center">
                Book a Service <ArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div> */}
      </section>

      {/* Navigation icons */}
      <section className="py-8 border-b">
        <div className="container mx-auto">
          <div className="flex justify-center gap-4 md:gap-16">
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-red-500 text-white mb-2">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-red-500 font-semibold">Home</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-gray-500 text-white mb-2">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-gray-500 font-semibold">Workshop</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-gray-500 text-white mb-2">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-gray-500 font-semibold">Near Me</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-gray-500 text-white mb-2">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-gray-500 font-semibold">Chats</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-gray-500 text-white mb-2">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-gray-500 font-semibold">About Us</span>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Workshops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="overflow-hidden border-none shadow-lg rounded-lg">
                <div className="relative h-48">
                  <img
                    src={workshop.image}
                    alt={workshop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="bg-amber-400 p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{workshop.name}</h3>
                      <p className="text-sm">{workshop.location}</p>
                    </div>
                    <Star className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button className="flex items-center text-black font-medium">
              See More <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Find Workshop Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <img 
                src="./lovable-uploads/3e074257-43c8-47c5-b1ba-b13d046678ba.png" 
                alt="Car service illustration" 
                className="w-full max-w-lg mx-auto"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-6">Find your nearest workshop</h2>
              <Button className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-8 py-6 rounded-full text-lg">
                Find Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
