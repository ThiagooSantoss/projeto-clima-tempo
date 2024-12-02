export interface Clima {
    location: {
      name: string;
      region: string;
      country: string;
    };
    current: {
      temp_c: number; 
      condition: {
        text: string; 
        icon: string;
      };
    };
  }
  