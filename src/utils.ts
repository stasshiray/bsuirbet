/**
 * Utility functions for type safety and common operations
 */

/**
 * Utility function to ensure exhaustive checking in switch statements
 * This is a TypeScript best practice that helps catch missing cases at compile time
 * When used in switch statements with discriminated unions, TypeScript will error
 * if you add a new case to the union but forget to handle it in the switch
 * 
 * @param value - The value that should never be reached (type: never)
 * @throws Error with detailed information about the unhandled case
 * 
 * @example
 * ```typescript
 * type Status = 'loading' | 'success' | 'error';
 * 
 * const getStatusMessage = (status: Status): string => {
 *   switch (status) {
 *     case 'loading':
 *       return 'Please wait...';
 *     case 'success':
 *       return 'Operation completed!';
 *     case 'error':
 *       return 'Something went wrong!';
 *     default:
 *       return assertNever(status); // TypeScript will error if new status added
 *   }
 * };
 * ```
 */
export const assertNever = (value: never): never => {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
};

/**
 * Type guard utility to check if a value is not null or undefined
 * 
 * @param value - The value to check
 * @returns True if the value is not null or undefined
 */
export const isNotNull = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Utility function to safely access nested object properties
 * 
 * @param obj - The object to access
 * @param path - The path to the property (e.g., 'user.profile.name')
 * @param defaultValue - Default value if path doesn't exist
 * @returns The value at the path or the default value
 */
export const safeGet = <T>(
  obj: any,
  path: string,
  defaultValue: T
): T => {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current == null || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current !== undefined ? current : defaultValue;
};


/**
 * Utility function to format currency values
 * 
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'BYN')
 * @param locale - The locale for formatting (default: 'be-BY')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'BYN',
  locale: string = 'be-BY'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Utility function to generate a random ID
 * 
 * @param length - The length of the ID (default: 8)
 * @returns A random alphanumeric ID
 */
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Utility function to deep clone an object
 * 
 * @param obj - The object to clone
 * @returns A deep clone of the object
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  
  return obj;
};

/**
 * Utility function to check if two objects are deeply equal
 * 
 * @param obj1 - First object to compare
 * @param obj2 - Second object to compare
 * @returns True if objects are deeply equal
 */
export const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) {
    return true;
  }
  
  if (obj1 == null || obj2 == null) {
    return obj1 === obj2;
  }
  
  if (typeof obj1 !== typeof obj2) {
    return false;
  }
  
  if (typeof obj1 !== 'object') {
    return obj1 === obj2;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  
  return true;
};
