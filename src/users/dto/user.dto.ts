export class UserDto {
  id: number;
  family_name: string | null;
  first_name: string | null;
  email: string | null;
  phone_number?: string | null;
  userTypeId?: number | null;
  created_at?: Date;
  user_type?: {
    id: number;
    type: string | null;
    created_at: Date;
  } | null;

 
}