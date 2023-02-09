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
interface Manager {
  id: string;
  NIP: string;
  access: string;
  role: string;
  phone: string;
}

interface Presence {
  id: string;
  absent: string;
  fullName: string;
  NIS: string;
  class: string;
  status: string;
}

interface Major {
  id: string;
  name: string;
  acronym: string;
  classTotal: string;
  groupTotal: string;
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
