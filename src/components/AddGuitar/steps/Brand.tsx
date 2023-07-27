import { useForm } from "react-hook-form";
import { useFormState } from "../FormContext";
import CustomButton from "@/components/Common/CustomButton";
import { IoArrowRedoCircleSharp } from "react-icons/io5";
import SelectInput from "../SelectInput";
import StepIcons from "../StepIcons";
import type { FormDataStepOneProps, FormField, FormFieldProps } from "@/types";
import { FormFieldsData } from "../FormFieldsData";

export function Brand() {
  const { onHandleNext, setFormData, formData } = useFormState();
  const { register, handleSubmit } = useForm<FormDataStepOneProps>({
    defaultValues: formData ?? {},
  });

  const onHandleFormSubmit = (data: FormDataStepOneProps) => {
    setFormData(data);
    onHandleNext();
  };

  return (
    <div className="pt-12">
      <FormFieldsData>
        {(formFields: FormFieldProps[]) => (
          <form className="flex flex-col font-bold" onSubmit={handleSubmit(onHandleFormSubmit)}>
            {formFields?.map((field: FormField, index: number) => {
              const arePreviousFieldsSelected =
                index === 0 ||
                formFields?.slice(0, index).every((prevField: FormField) => formData[prevField.inputId as keyof FormDataStepOneProps]);

              if (arePreviousFieldsSelected || !field.dependencies) {
                return (
                  <SelectInput
                    key={index}
                    title={field.title}
                    label={field.label}
                    inputId={field.inputId as keyof FormDataStepOneProps}
                    defaultValue={field.defaultValue}
                    register={register}
                    options={field.options}
                  />
                );
              }

              return null;
            })}

            <div className="absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 transform">
              <StepIcons />
            </div>

            {formData?.selectedPickups && (
              <div className="z-50 mt-9 flex justify-center">
                <CustomButton type="submit" className="flex rounded-full px-7">
                  <div className="flex items-center justify-center text-xs">
                    Next
                    <IoArrowRedoCircleSharp className="ml-1 h-4 w-4" />
                  </div>
                </CustomButton>
              </div>
            )}
          </form>
        )}
      </FormFieldsData>
    </div>
  );
}