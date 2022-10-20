import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Configuration: undefined;
  Create: Contact;
  Detail: Contact;
};

export type ComponentProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string | "N/A";
}

export interface ResponseAPI<T> {
  message: string;
  data?: T;
}