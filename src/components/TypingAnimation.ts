
export interface TypingData {
  typingSpeed: number;
  inputLength: number;
  isTyping: boolean;
}

export class TypingTracker {
  private keyPresses: number[] = [];
  private lastKeyTime: number = 0;
  private typingTimeout: NodeJS.Timeout | null = null;
  
  constructor(private onUpdate: (data: TypingData) => void) {}

  onKeyPress(): void {
    const now = Date.now();
    this.keyPresses.push(now);
    
    // Remove key presses older than 5 seconds
    this.keyPresses = this.keyPresses.filter(time => now - time < 5000);
    
    // Calculate typing speed (keys per second)
    const typingSpeed = this.keyPresses.length / 5;
    
    this.lastKeyTime = now;
    
    // Clear existing timeout
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    
    // Set typing to false after 1 second of inactivity
    this.typingTimeout = setTimeout(() => {
      this.updateTypingData(0, 0, false);
    }, 1000);
  }

  onInputChange(inputLength: number): void {
    const now = Date.now();
    const typingSpeed = this.keyPresses.length / 5;
    const isTyping = now - this.lastKeyTime < 1000;
    
    this.updateTypingData(typingSpeed, inputLength, isTyping);
  }

  private updateTypingData(typingSpeed: number, inputLength: number, isTyping: boolean): void {
    this.onUpdate({
      typingSpeed,
      inputLength,
      isTyping
    });
  }

  cleanup(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }
}
