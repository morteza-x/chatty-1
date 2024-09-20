import { v4 as uuidv4 } from 'uuid';

export const helper = {
  getRandomId() {
    return uuidv4();
  },

  getRandomElements(arr:any[], numElements:number) {
    const result = [];
    const usedIndices:any = [];
  
    while (result.length < numElements) {
      const index = Math.floor(Math.random() * arr.length);
      if (!usedIndices.includes(index)) {
        result.push(arr[index]);
        usedIndices.push(index);
      }
    }
  
    return result;
  }
} 