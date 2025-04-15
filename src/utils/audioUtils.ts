
let audioContext: AudioContext | null = null;
let gainNode: GainNode | null = null;
let oscillator: OscillatorNode | null = null;

// Initialize audio context
export const initializeAudio = (): void => {
  try {
    // Create audio context
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create gain node for volume control
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.3; // Start with lower volume
    gainNode.connect(audioContext.destination);
    
    console.log('Audio system initialized');
  } catch (error) {
    console.error('Error initializing audio:', error);
  }
};

// Play alert sound when drowsiness is detected
export const playAlertSound = (): void => {
  if (!audioContext || !gainNode) {
    initializeAudio();
  }
  
  if (!audioContext || !gainNode) return;
  
  // Stop any existing oscillator
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
  }
  
  try {
    // Create and configure oscillator
    oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
    
    // Connect oscillator to gain node
    oscillator.connect(gainNode);
    
    // Start oscillator
    oscillator.start();
    
    // Increase volume gradually
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1.0, audioContext.currentTime + 0.5);
    
    // Oscillate frequency for alarm effect
    oscillateFrequency();
    
    // Stop after 3 seconds
    setTimeout(() => {
      stopAlertSound();
    }, 3000);
  } catch (error) {
    console.error('Error playing alert sound:', error);
  }
};

// Stop alert sound
export const stopAlertSound = (): void => {
  if (oscillator) {
    try {
      // Fade out volume
      if (gainNode) {
        gainNode.gain.linearRampToValueAtTime(0, audioContext?.currentTime + 0.5 || 0);
      }
      
      // Stop oscillator after fade out
      setTimeout(() => {
        if (oscillator) {
          oscillator.stop();
          oscillator.disconnect();
          oscillator = null;
        }
      }, 500);
    } catch (error) {
      console.error('Error stopping alert sound:', error);
    }
  }
};

// Create oscillating frequency effect for the alert sound
const oscillateFrequency = (): void => {
  if (!oscillator || !audioContext) return;
  
  let direction = 1;
  let baseFreq = 440;
  
  const oscillate = () => {
    if (!oscillator || !audioContext) return;
    
    // Change frequency
    baseFreq += direction * 50;
    
    // Reverse direction at extremes
    if (baseFreq > 880) {
      direction = -1;
    } else if (baseFreq < 440) {
      direction = 1;
    }
    
    // Apply new frequency
    oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
    
    // Continue oscillation if oscillator exists
    if (oscillator) {
      setTimeout(oscillate, 100);
    }
  };
  
  oscillate();
};

// Provide haptic feedback if supported
export const provideHapticFeedback = (): void => {
  if ('vibrate' in navigator) {
    // Vibrate pattern: 300ms on, 100ms off, 300ms on
    navigator.vibrate([300, 100, 300]);
  }
};
