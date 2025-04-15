
import React, { useEffect, useRef, useState } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import { Button } from "@/components/ui/button";
import { loadModel, processWebcamImage } from '@/utils/tensorflowUtils';
import { initializeWebcam, stopWebcam, drawFaceDetection } from '@/utils/webcamUtils';
import { playAlertSound, stopAlertSound, provideHapticFeedback } from '@/utils/audioUtils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface WebcamDetectionProps {
  onDrowsinessDetected: () => void;
  isActive: boolean;
}

const WebcamDetection: React.FC<WebcamDetectionProps> = ({ 
  onDrowsinessDetected,
  isActive
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [detectionActive, setDetectionActive] = useState(false);
  const [eyeClosedDuration, setEyeClosedDuration] = useState(0);
  const [alertnessLevel, setAlertnessLevel] = useState(100);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load TensorFlow model on component mount
  useEffect(() => {
    const loadTensorFlowModel = async () => {
      try {
        setLoading(true);
        const loadedModel = await loadModel();
        setModel(loadedModel);
        setLoading(false);
      } catch (error) {
        console.error('Error loading TensorFlow model:', error);
        setLoading(false);
      }
    };

    if (isActive) {
      loadTensorFlowModel();
    }

    return () => {
      stopWebcam(videoRef);
      setWebcamActive(false);
      setDetectionActive(false);
    };
  }, [isActive]);

  // Handle webcam initialization
  const handleStartWebcam = async () => {
    if (webcamActive) {
      stopWebcam(videoRef);
      stopDetection();
      setWebcamActive(false);
      return;
    }

    setLoading(true);
    const success = await initializeWebcam(videoRef);
    if (success) {
      setWebcamActive(true);
      startDetection();
    }
    setLoading(false);
  };

  // Start eye detection process
  const startDetection = () => {
    if (!model || !webcamActive) return;
    setDetectionActive(true);
    setEyeClosedDuration(0);
    setAlertnessLevel(100);
    setShowAlert(false);
    requestAnimationFrame(detectEyes);
  };

  // Stop eye detection process
  const stopDetection = () => {
    setDetectionActive(false);
    setEyeClosedDuration(0);
    setAlertnessLevel(100);
    setShowAlert(false);
    stopAlertSound();
  };

  // Reset alert state
  const resetAlert = () => {
    setShowAlert(false);
    setEyeClosedDuration(0);
    setAlertnessLevel(100);
    stopAlertSound();
  };

  // Main eye detection loop
  const detectEyes = async () => {
    if (!detectionActive || !model || !videoRef.current || !canvasRef.current) {
      return;
    }

    try {
      // Process the current video frame
      const { faces, eyesClosed } = await processWebcamImage(model, videoRef.current);
      
      // Draw detection results on canvas
      drawFaceDetection(canvasRef.current, videoRef.current, faces, eyesClosed);
      
      // Update eye closed duration and alertness level
      if (eyesClosed) {
        setEyeClosedDuration(prev => prev + 0.1); // Increment by 100ms
        setAlertnessLevel(prev => Math.max(0, prev - 2)); // Decrease alertness
      } else {
        setEyeClosedDuration(0); // Reset when eyes open
        setAlertnessLevel(prev => Math.min(100, prev + 1)); // Increase alertness
      }
      
      // Check for drowsiness threshold (5 seconds)
      if (eyeClosedDuration >= 5.0 && !showAlert) {
        setShowAlert(true);
        playAlertSound();
        provideHapticFeedback();
        onDrowsinessDetected();
      }
      
      // Continue detection loop
      if (detectionActive) {
        requestAnimationFrame(detectEyes);
      }
    } catch (error) {
      console.error('Error in eye detection:', error);
      
      // Try to continue despite error
      if (detectionActive) {
        requestAnimationFrame(detectEyes);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Drowsiness Detection System</CardTitle>
          <CardDescription>
            Real-time eye monitoring using your webcam
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden mb-4">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                <div className="w-8 h-8 border-4 border-drowsy border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
            
            {!webcamActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="text-white text-center p-4">
                  <p className="mb-4">Enable your webcam to start drowsiness detection</p>
                </div>
              </div>
            )}
            
            {showAlert && (
              <div className="absolute inset-0 flex items-center justify-center bg-alert/40 animate-pulse-warning">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-alert mb-2">Driver Alert!</h3>
                  <p className="mb-4">Drowsiness detected. Please pull over safely.</p>
                  <Button onClick={resetAlert} variant="outline">
                    Acknowledge
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Eye Closure Duration</h4>
              <Progress value={Math.min(100, (eyeClosedDuration / 5) * 100)} className="h-2" 
                style={{
                  backgroundColor: 'rgba(51, 195, 240, 0.2)',
                  '--progress-background': eyeClosedDuration >= 3 
                    ? 'rgba(234, 56, 76, 1)' 
                    : 'rgba(51, 195, 240, 1)'
                } as React.CSSProperties}
              />
              <p className="text-xs text-gray-500 mt-1">
                {eyeClosedDuration.toFixed(1)} seconds
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Alertness Level</h4>
              <Progress value={alertnessLevel} className="h-2"
                style={{
                  backgroundColor: 'rgba(51, 195, 240, 0.2)',
                  '--progress-background': alertnessLevel < 50 
                    ? 'rgba(234, 56, 76, 1)' 
                    : 'rgba(51, 195, 240, 1)'
                } as React.CSSProperties}
              />
              <p className="text-xs text-gray-500 mt-1">
                {alertnessLevel}%
              </p>
            </div>
          </div>
          
          {showAlert && (
            <Alert variant="destructive" className="mb-4 animate-fade-in">
              <AlertTitle>Warning: Drowsiness Detected!</AlertTitle>
              <AlertDescription>
                You appear to be drowsy. Please pull over safely and take a break.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={handleStartWebcam} 
            disabled={loading || !model}
            variant={webcamActive ? "destructive" : "default"}
          >
            {webcamActive ? "Stop Webcam" : "Start Webcam"}
          </Button>
          
          <div className="text-xs text-gray-500">
            {!model && "Loading ML model..."}
            {model && "ML model ready"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WebcamDetection;
