import { useForm, UseFormReturn, FieldErrors, Control, useFieldArray } from 'react-hook-form';
import { FormData } from '../types/InputTypes';

type CustomFormReturnType = UseFormReturn<FormData> & {
  errors: FieldErrors<FormData>;
  fields: any; // Define the type for fields as per your requirement
  append: any; // Define the type for append as per your requirement
  remove: any; // Define the type for remove as per your requirement
};

export const useCustomForm = (): CustomFormReturnType => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      fatherName: "",
      motherName: "",
      phoneNumber: "",
      familyMembers: [
        {
          firstName: "",
          lastName: "",
          email: "",
          fatherName: "",
          motherName: "",
          phoneNumber: "",
        },
      ],
      address: {
        pinCode: "",
        streetName: "",
        city: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "familyMembers",
    control,
  });

  return { register, handleSubmit, watch, errors, control, fields, append, remove } as CustomFormReturnType;
};
// useFormVCotext