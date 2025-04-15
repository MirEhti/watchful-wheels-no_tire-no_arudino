
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InfoSection: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Understanding Driver Drowsiness Detection</h2>
      
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stats">Statistics & Risks</TabsTrigger>
          <TabsTrigger value="tech">How It Works</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="future">Future Applications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Drowsy Driving Statistics</CardTitle>
              <CardDescription>
                Understanding the impact of drowsy driving on road safety
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-drowsy/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-drowsy mb-2">100,000+</h3>
                  <p className="text-sm text-gray-700">Annual crashes caused by drowsy driving in the US</p>
                </div>
                <div className="bg-drowsy/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-drowsy mb-2">1,550</h3>
                  <p className="text-sm text-gray-700">Annual fatalities from drowsy driving accidents</p>
                </div>
                <div className="bg-drowsy/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-drowsy mb-2">71,000</h3>
                  <p className="text-sm text-gray-700">Annual injuries resulting from drowsy driving</p>
                </div>
              </div>
              
              <p className="mt-4">
                According to the National Highway Traffic Safety Administration (NHTSA), drowsy driving is responsible 
                for thousands of automobile crashes each year. These accidents result in numerous injuries and fatalities,
                making drowsy driving a serious public health concern.
              </p>
              
              <h4 className="font-semibold mt-4">Key Risk Factors:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Sleep deprivation or poor quality sleep</li>
                <li>Untreated sleep disorders like sleep apnea</li>
                <li>Medications that cause drowsiness</li>
                <li>Alcohol consumption</li>
                <li>Driving during peak sleepiness periods (midnight to 6 am, late afternoon)</li>
                <li>Driving for extended periods without breaks</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tech">
          <Card>
            <CardHeader>
              <CardTitle>How the Technology Works</CardTitle>
              <CardDescription>
                The science behind ML-powered drowsiness detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Face and Eye Detection</h4>
                  <p className="text-sm">
                    The system uses computer vision to identify facial features, particularly the eyes.
                    Advanced machine learning models locate and track the driver's face in real-time,
                    even under varying lighting conditions.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Eye State Analysis</h4>
                  <p className="text-sm">
                    Once the eyes are detected, the system calculates the Eye Aspect Ratio (EAR),
                    which measures the openness of the eyes. When the eyes are closed, this ratio decreases.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Temporal Monitoring</h4>
                  <p className="text-sm">
                    The system tracks how long the eyes remain closed. Brief blinks are normal, but
                    extended eye closure (5+ seconds) indicates drowsiness and triggers the safety protocol.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Safety Protocol</h4>
                  <p className="text-sm">
                    When drowsiness is detected, the system initiates audio alerts, visual warnings,
                    and suggests pulling over safely. In advanced implementations, it can interface
                    with vehicle systems to enhance safety.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">Technical Components</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">TensorFlow.js</span> - Machine learning framework for eye state detection</li>
                  <li><span className="font-medium">BlazeFace</span> - Lightweight face detection model optimized for mobile devices</li>
                  <li><span className="font-medium">Web APIs</span> - Camera access, audio alerts, and haptic feedback</li>
                  <li><span className="font-medium">Three.js</span> - 3D visualizations and animations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Protection</CardTitle>
              <CardDescription>
                How we safeguard your data and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-drowsy/5 p-6 rounded-lg border border-drowsy/20">
                <h4 className="text-lg font-semibold mb-3">Your Privacy is Our Priority</h4>
                <p>
                  Our drowsiness detection system is designed with privacy at its core. Here's how we protect your data:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h5 className="font-medium mb-2">Local Processing</h5>
                    <p className="text-sm">
                      All image processing happens directly on your device. Your webcam footage never leaves your computer
                      and is not sent to any servers or cloud services.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h5 className="font-medium mb-2">No Data Storage</h5>
                    <p className="text-sm">
                      We don't store any images, videos, or facial data. Once processed, the data is immediately discarded
                      from memory.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h5 className="font-medium mb-2">Transparent Operation</h5>
                    <p className="text-sm">
                      The system clearly indicates when the camera is active, and you maintain full control to start or
                      stop monitoring at any time.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h5 className="font-medium mb-2">No User Identification</h5>
                    <p className="text-sm">
                      The system only analyzes eye state and doesn't collect or process any personally identifiable
                      information or biometric data for identification purposes.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                Our commitment to privacy extends beyond legal requirements. We believe that effective safety technology
                should never compromise personal privacy or data security.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="future">
          <Card>
            <CardHeader>
              <CardTitle>The Future of Driver Safety</CardTitle>
              <CardDescription>
                Emerging technologies and applications in driver monitoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Driver drowsiness detection is just the beginning. As technology evolves, we're exploring 
                several exciting advancements in driver safety systems:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="border border-drowsy rounded-lg p-4">
                  <h4 className="font-medium text-drowsy mb-2">Advanced Biometrics</h4>
                  <p className="text-sm">
                    Future systems will incorporate heart rate monitoring and respiration tracking through 
                    non-invasive sensors to detect fatigue before visual signs appear.
                  </p>
                </div>
                
                <div className="border border-drowsy rounded-lg p-4">
                  <h4 className="font-medium text-drowsy mb-2">Cognitive Load Analysis</h4>
                  <p className="text-sm">
                    Monitoring driver attention and cognitive engagement will help identify distraction 
                    and mental fatigue, even when eyes remain open.
                  </p>
                </div>
                
                <div className="border border-drowsy rounded-lg p-4">
                  <h4 className="font-medium text-drowsy mb-2">Vehicle Integration</h4>
                  <p className="text-sm">
                    Direct integration with vehicle systems will enable automatic lane keeping, 
                    adaptive cruise control, and even safe vehicle stopping in emergency situations.
                  </p>
                </div>
                
                <div className="border border-drowsy rounded-lg p-4">
                  <h4 className="font-medium text-drowsy mb-2">Personalized Alertness Profiles</h4>
                  <p className="text-sm">
                    Machine learning will develop personalized driver profiles to recognize individual 
                    patterns of fatigue and provide customized interventions.
                  </p>
                </div>
                
                <div className="border border-drowsy rounded-lg p-4">
                  <h4 className="font-medium text-drowsy mb-2">Connected Vehicle Networks</h4>
                  <p className="text-sm">
                    V2V (Vehicle-to-Vehicle) communication will alert nearby drivers when a drowsy 
                    driver is detected, enhancing overall traffic safety.
                  </p>
                </div>
                
                <div className="border border-drowsy rounded-lg p-4">
                  <h4 className="font-medium text-drowsy mb-2">Predictive Analytics</h4>
                  <p className="text-sm">
                    AI systems will predict driver fatigue based on time of day, trip duration, sleep patterns, 
                    and other factors to provide preemptive alerts.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg mt-6">
                <h4 className="font-semibold mb-2">Beyond Automotive</h4>
                <p className="text-sm">
                  This technology has applications beyond personal vehicles, including commercial trucking,
                  public transportation, aviation, maritime operations, and industrial equipment operation 
                  where operator alertness is critical for safety.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InfoSection;
