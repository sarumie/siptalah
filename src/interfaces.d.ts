/**
 * UTILITIES
 */

type NonEmptyArray<T> = [T, ...T[]];

//

interface Student {
  id: string;
  absent: number;
  full_name: string;
  class: string;
  NIS: number;
  phone: number;
}
