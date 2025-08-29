export interface userDetail {
    id?: number;
    user_id?: number;
    full_name: string;
    phone: string;
    address_line: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

export type userDetailData = Omit<userDetail, 'id'>

export interface UserDetailFormProps {
  onSaved?: () => void;
  mode?: "add" | "edit";
}
