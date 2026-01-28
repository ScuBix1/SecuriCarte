export type Incident = {
  id: string;
  type: string;
  title: string;
  description: string;
  date: Date;
  location: string | { lat: number; lng: number };
  user_id: string;
};

export type UpdateIncident = {
  id?: string;
  type?: string;
  title?: string;
  description?: string;
  date?: Date;
  location?: string | { lat: number; lng: number };
};
