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

interface Presence {
  id: string;
  absent: string;
  fullName: string;
  NIS: string;
  class: string;
  status: string;
}

interface PresenceHistory {
  id: string;
  absent: string;
  date: string;
  timeRange: string;
  attend: string;
  late: string;
  permit: string;
  alpha: string;
}
