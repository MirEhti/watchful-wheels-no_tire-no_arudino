
// Request and initialize webcam access
export const initializeWebcam = async (
  videoRef: React.RefObject<HTMLVideoElement>
): Promise<boolean> => {
  try {
    if (!videoRef.current) {
      throw new Error('Video element reference is not available');
    }

    const constraints = {
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user',
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = stream;
    
    return new Promise((resolve) => {
      if (videoRef.current) {
        videoRef.current.onloadedmetadata = () => {
          resolve(true);
        };
      } else {
        resolve(false);
      }
    });
  } catch (error) {
    console.error('Error initializing webcam:', error);
    return false;
  }
};

// Stop webcam access
export const stopWebcam = (videoRef: React.RefObject<HTMLVideoElement>): void => {
  if (videoRef.current && videoRef.current.srcObject) {
    const stream = videoRef.current.srcObject as MediaStream;
    const tracks = stream.getTracks();
    
    tracks.forEach((track) => {
      track.stop();
    });
    
    videoRef.current.srcObject = null;
  }
};

// Draw face detection results on canvas
export const drawFaceDetection = (
  canvas: HTMLCanvasElement | null,
  video: HTMLVideoElement | null,
  faces: any[] | undefined,
  eyesClosed: boolean
): void => {
  if (!canvas || !video || !faces || faces.length === 0) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Match canvas dimensions to video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  // Draw the video frame on the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // For each detected face
  faces.forEach((face) => {
    const start = face.topLeft;
    const end = face.bottomRight;
    const size = [end[0] - start[0], end[1] - start[1]];
    
    // Draw face rectangle
    ctx.strokeStyle = eyesClosed ? '#ea384c' : '#33C3F0';
    ctx.lineWidth = 2;
    ctx.strokeRect(start[0], start[1], size[0], size[1]);
    
    // Draw eyes
    if (face.landmarks && face.landmarks.length >= 6) {
      // Left eye
      const leftEye = face.landmarks[1];
      ctx.beginPath();
      ctx.arc(leftEye[0], leftEye[1], 5, 0, 2 * Math.PI);
      ctx.fillStyle = eyesClosed ? '#ea384c' : '#33C3F0';
      ctx.fill();
      
      // Right eye
      const rightEye = face.landmarks[2];
      ctx.beginPath();
      ctx.arc(rightEye[0], rightEye[1], 5, 0, 2 * Math.PI);
      ctx.fillStyle = eyesClosed ? '#ea384c' : '#33C3F0';
      ctx.fill();
    }
  });

  // Add eye state indicator text
  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = eyesClosed ? '#ea384c' : '#33C3F0';
  ctx.fillText(
    `Eyes: ${eyesClosed ? 'CLOSED' : 'OPEN'}`, 
    10, 
    canvas.height - 10
  );
};
