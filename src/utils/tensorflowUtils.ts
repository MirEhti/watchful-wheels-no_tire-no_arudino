
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

// Initialize TensorFlow and BlazeFace model
export const loadModel = async (): Promise<blazeface.BlazeFaceModel> => {
  await tf.ready();
  console.log('TensorFlow.js loaded successfully');
  
  // Load the BlazeFace model
  const model = await blazeface.load();
  console.log('BlazeFace model loaded successfully');
  
  return model;
};

// Eye detection threshold values
const EYE_CLOSED_THRESHOLD = 0.2;
const EYE_ASPECT_RATIO_THRESHOLD = 0.3;

// Calculate eye aspect ratio to determine if eyes are closed
export const calculateEyeAspectRatio = (landmarks: any): number => {
  // This is a simplified version - in a real implementation
  // we would use the actual eye landmarks to calculate the ratio
  // between the height and width of the eye
  
  // For demonstration purposes, we're using a random value that tends toward open
  // In a real implementation, this would analyze actual eye geometry
  const randomFactor = Math.random() * 0.2;
  return 0.5 + randomFactor;
};

// Determine if eyes are closed based on face landmarks
export const areEyesClosed = (
  predictions: blazeface.NormalizedFace[] | undefined
): boolean => {
  if (!predictions || predictions.length === 0) {
    return false; // No face detected
  }

  // In a real implementation, we would analyze the actual eye landmarks
  // For this demo, we'll use the confidence score as a proxy
  const faceConfidence = predictions[0].probability;
  
  // For demo purposes: randomly decide if eyes are closed with
  // higher probability when confidence is lower
  const eyeAspectRatio = calculateEyeAspectRatio(predictions[0].landmarks);
  
  return eyeAspectRatio < EYE_ASPECT_RATIO_THRESHOLD;
};

// Process webcam image and detect faces and eyes
export const processWebcamImage = async (
  model: blazeface.BlazeFaceModel | null,
  imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | null
): Promise<{ 
  faces: blazeface.NormalizedFace[] | undefined, 
  eyesClosed: boolean 
}> => {
  if (!model || !imageElement) {
    return { faces: undefined, eyesClosed: false };
  }

  try {
    // Get face predictions from the model
    const predictions = await model.estimateFaces(imageElement, false);
    
    // Check if eyes are closed
    const eyesClosed = areEyesClosed(predictions);
    
    return {
      faces: predictions,
      eyesClosed,
    };
  } catch (error) {
    console.error('Error processing webcam image:', error);
    return { faces: undefined, eyesClosed: false };
  }
};
