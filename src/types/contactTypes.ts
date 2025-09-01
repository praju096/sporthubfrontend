export interface Contact {
    id?: number;
    name: string;
    email: string;
    subject: string;
    message: string;
}
export type ContactFormData = Omit<Contact, 'id'>;