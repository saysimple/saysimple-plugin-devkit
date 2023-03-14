export interface ContactsInterface {
  id: number;
  name: string;
  countryCode?: string;
  email?: string;
  phone?: string;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  province?: string;
  country?: string;
  reference?: string;
  company?: string;
  jobTitle?: string;
  isHighPriority?: number;
  createdAt?: Date;
  isBlocked?: number;
}
