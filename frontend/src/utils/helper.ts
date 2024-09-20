import { v4 as uuidv4 } from 'uuid';
import lookup from 'country-code-lookup';

export const helper = {

  // remove whiteSpace and special char from url
  removeWhiteSpaceAndSpecialChars(str: string) {
    // Remove white space and special characters using regular expressions
    return str.replace(/\s+/g, '').replace(/[^\w\s]/gi, '');
  },

  // make first letter upperCase
  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  getRandomId() {
    return uuidv4();
  },

  formatCurrencyUsd(amount: number | string, withUsd:boolean=true): string {
    amount = Number(amount);
    const formatted = amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    if (withUsd) return formatted + ' ' + 'USD';
    return formatted;
  }, 

  formatDate(timestamp: string, withTime:boolean=false) {
    // Parse the timestamp string into a Date object
    const dateObj = new Date(timestamp);
  
    // Extract date components
    const year = dateObj.getFullYear();
    let month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    let day = dateObj.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    
    let formattedDate = '';
    if (withTime) {
      // Extract time components
      let hours = dateObj.getHours().toString().padStart(2, '0'); // Add leading zero if needed
      let minutes = dateObj.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
    
      // Format the date and time string
      formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;
    }
    else {
      formattedDate = `${day}/${month}/${year}`;
    }
  
    return formattedDate;
  },

  formatDateText(inputDate: string) {
    // Convert input string to Date object
    const date = new Date(inputDate);
    // Array of month names

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Get day, month, and year
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Format the date string
    const formattedDate = `${day} ${months[monthIndex]} of ${year}`;

    return formattedDate;
  },

  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    /**
     * Truncates text to a certain number of characters.
     * 
     * @param text The text to be truncated.
     * @param maxLength The maximum number of characters allowed.
     * @returns The truncated text.
     */
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + '...';
    }
  },

  decimalToPercent(decimal: number | string): string {
    decimal = Number(decimal);
    // Multiply the decimal by 100 to convert it to a percentage
    var percent = decimal * 100;
    // Format the percentage with "%" symbol in front
    // Adjust the number of decimal places as needed
    var formattedPercent = percent.toFixed(0) + "%"; 
    return formattedPercent;
  },

  convertToLowerAndRemoveWhitespace(str:string):string {
    return str.replace(/\s+/g, '').toLowerCase();
  },

  isAlphanumeric(inputString:string):boolean {
    // Regular expression to match alphanumeric characters
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  
    // Test if the input string matches the regular expression
    return alphanumericRegex.test(inputString);
  },

  isNumeric(value:string) {
    let numericOrWhat = true;
    value = value.replace(/\s/g, '');
    const arr = value.split('');
    for (let i = 0; i < value.length; i++) {
      const check = /^[0-9]$/.test(arr[i]);
      if (!check) {
        numericOrWhat = false;
        break;
      }
    }
    
    return numericOrWhat;
  },

  // get country flag by name:
  getFlagByName(name: string) {
    // every word to uppercase
    name = name.split(' ').map((word:string) => word[0].toUpperCase() + word.slice(1)).join(' ');

    const code = lookup.byCountry(name || 'Iran');
    if (!code) return null;
    // <Image src="https://flagcdn.com/16x12/ge.png"/>
    //http://purecatamphetamine.github.io/country-flag-icons/3x2/CA.svg
    return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${code.iso2}.svg`;
  },

  // bubble sort based on object prop
  sortByProperty(arr:any[], propName:string) {
    let swapped = true;

    while (swapped) {
      swapped = false;

      for (let i=0; i < arr.length - 1; i++) {
        if (arr[i][propName] > arr[i+1][propName]) {
          const temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
          // swapped happened so: not sorted yet
          swapped = true;
        }
      }
    }
    return arr;
  },

  addRank(arr:any[]) {
    const list = arr.map((el:any, i:number) => {
      return {
        ...el,
        rank: i + 1,
      }
    });
    return list;
  },

  // camelCase to words
  camelCaseToWords(str:string) {
    return str.replace(/([A-Z])/g, ' $1')
          .replace(/^./, function(match) { return match.toUpperCase(); });
  },

  isValidEmail(email:string) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());
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
};

// function bubbleSort(arr:any[]) {
//   let swapped = true;

//   while (swapped) {
//     swapped = false;

//     for (let i =0; i < arr.length - 1; i++) {
//       if (arr[i] > arr[i + 1]) {
//         // swap 
//         let temp = arr[i];
//         arr[i] = arr[i+1];
//         arr[i+1] = temp;
//         swapped = true;
//       }
//     }
//   }
// }