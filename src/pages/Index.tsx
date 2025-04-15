
import React, { useState, useEffect } from 'react';
import WebcamDetection from '@/components/WebcamDetection';
import CarAnimation from '@/components/CarAnimation';
import DayNightToggle from '@/components/DayNightToggle';
import InfoSection from '@/components/InfoSection';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Car, Camera, ChevronDown } from "lucide-react";

const Index = () => {
  const [isDaytime, setIsDaytime] = useState(true);
  const [isDrowsy, setIsDrowsy] = useState(false);
  const [detection, setDetection] = useState(false);
  
  // Reset drowsy state after 10 seconds
  useEffect(() => {
    if (isDrowsy) {
      const timer = setTimeout(() => {
        setIsDrowsy(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [isDrowsy]);
  
  // Handle drowsiness detection
  const handleDrowsinessDetected = () => {
    setIsDrowsy(true);
  };
  
  // Toggle day/night mode
  const toggleDayNight = () => {
    setIsDaytime(prev => !prev);
  };
  
  // Toggle detection mode
  const toggleDetection = () => {
    setDetection(prev => !prev);
  };

  return (
    <div className={`min-h-screen ${isDaytime ? 'bg-day' : 'bg-night text-white'} transition-colors duration-500`}>
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 px-4">
        <div className="absolute top-4 right-4 z-10">
          <DayNightToggle isDaytime={isDaytime} onToggle={toggleDayNight} />
        </div>
        
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-drowsy">Watchful Wheels</span>: Drowsiness Detection System
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Advanced ML-powered technology that keeps drivers safe by detecting drowsiness in real-time
          </p>
          
          <div className="relative w-full">
            <CarAnimation isDaytime={isDaytime} isDrowsy={isDrowsy} />
            
            {isDrowsy && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-alert/90 text-white p-4 rounded-lg shadow-lg animate-pulse-warning">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold text-lg">Driver Alert!</p>
                <p>Drowsiness detected - pulling over safely</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button
              size="lg"
              className="bg-drowsy hover:bg-drowsy-dark text-white"
              onClick={() => {
                toggleDetection();
                document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Try the Demo <Camera className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-8 animate-bounce">
            <ChevronDown className="h-6 w-6 mx-auto" />
          </div>
        </div>
      </section>
      
      {/* Features Overview */}
      <section className={`py-12 px-4 ${isDaytime ? 'bg-gray-50' : 'bg-night-light'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className={isDaytime ? '' : 'bg-night-light border-gray-700'}>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-drowsy/20 flex items-center justify-center mb-4 mx-auto">
                  <Camera className="h-6 w-6 text-drowsy" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Real-time Eye Monitoring</h3>
                <p className={`text-center ${isDaytime ? 'text-gray-600' : 'text-gray-300'}`}>
                  Advanced computer vision algorithms track eye state to detect signs of drowsiness as they occur.
                </p>
              </CardContent>
            </Card>
            
            <Card className={isDaytime ? '' : 'bg-night-light border-gray-700'}>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-drowsy/20 flex items-center justify-center mb-4 mx-auto">
                  <AlertCircle className="h-6 w-6 text-drowsy" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Immediate Alerts</h3>
                <p className={`text-center ${isDaytime ? 'text-gray-600' : 'text-gray-300'}`}>
                  When drowsiness is detected, the system provides visual, audio, and haptic feedback to alert the driver.
                </p>
              </CardContent>
            </Card>
            
            <Card className={isDaytime ? '' : 'bg-night-light border-gray-700'}>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-drowsy/20 flex items-center justify-center mb-4 mx-auto">
                  <Car className="h-6 w-6 text-drowsy" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Safety Protocols</h3>
                <p className={`text-center ${isDaytime ? 'text-gray-600' : 'text-gray-300'}`}>
                  The system initiates safety measures, guiding the vehicle to safely pull over when drowsiness is detected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section id="demo-section" className={`py-16 px-4 ${isDaytime ? 'bg-white' : 'bg-night'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Try It Yourself</h2>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            Enable your webcam to experience the drowsiness detection system. 
            For testing purposes, keep your eyes closed for 5 seconds to trigger the safety protocol.
          </p>
          
          {detection ? (
            <WebcamDetection 
              onDrowsinessDetected={handleDrowsinessDetected} 
              isActive={detection}
            />
          ) : (
            <div className="w-full max-w-3xl mx-auto">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-12">
                  <Camera className="h-12 w-12 text-drowsy mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Webcam Access Required</h3>
                  <p className="text-center mb-6 max-w-md">
                    To demonstrate the drowsiness detection system, we need permission to use your webcam.
                    All processing is done locally on your device.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-drowsy hover:bg-drowsy-dark text-white"
                    onClick={toggleDetection}
                  >
                    Enable Webcam Demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
      
      {/* Information Section */}
      <section className={`py-16 px-4 ${isDaytime ? 'bg-gray-50' : 'bg-night-light'}`}>
        <InfoSection />
      </section>
      
      {/* Footer */}
      <footer className={`py-8 px-4 ${isDaytime ? 'bg-gray-800 text-white' : 'bg-night-dark text-gray-200'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Watchful Wheels</h2>
          <p className="mb-6">Making roads safer with advanced drowsiness detection technology</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
              Learn More
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
              Contact Us
            </Button>
          </div>
          <p className="mt-8 text-sm text-gray-400">
            © {new Date().getFullYear()} Watchful Wheels. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
