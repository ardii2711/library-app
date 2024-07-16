import { Control, ControllerRenderProps, FieldValues, FieldPath, Path } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ReactNode } from "react";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  options?: unknown[];
  description?: string;
  control: Control<T>;
}

interface ChildrenProps<T extends FieldValues> extends Props<T> {
  children: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
}

const CustomFormField = <T extends FieldValues>(props: ChildrenProps<T>) => {
  const { name, label, description, control, children } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const CustomFormDatePicker = <T extends FieldValues>(props: Props<T>) => {
  const { name, label, placeholder = "Select date", description, control } = props;

  return (
    <CustomFormField<T> name={name} label={label} description={description} control={control}>
      {(field) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={`relative w-full h-12 pl-3 pr-10 justify-start ${!field.value ? "text-muted-foreground" : ""}`}>
              {field.value ? format(field.value, "dd MMM yyyy") : <span>{placeholder}</span>}
              <CalendarIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date("1900-01-01")} initialFocus />
          </PopoverContent>
        </Popover>
      )}
    </CustomFormField>
  );
};

export { CustomFormField, CustomFormDatePicker };
