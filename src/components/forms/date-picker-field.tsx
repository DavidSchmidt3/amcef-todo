import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button, Field, Label } from "@headlessui/react";
import { Datepicker } from "headless-datetimepicker";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

type Props<T extends FieldValues, K extends FieldPath<T>> = {
  form: UseFormReturn<T>;
  fieldName: K;
  label: string;
};

export default function DatePickerField<
  T extends FieldValues,
  K extends FieldPath<T>
>({ form, fieldName, label }: Props<T, K>) {
  return (
    <div className="w-full sm:w-80">
      <Controller
        name={fieldName}
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <Field>
            <Datepicker onChange={onChange} value={value}>
              <Label className="text-base font-medium text-foreground">
                {label}
              </Label>
              <div className="flex items-center gap-x-3">
                <Datepicker.Input
                  placeholder="Select date and time"
                  format="dd.MM.yyyy HH:mm"
                  className="flex w-full p-2 mt-1 border rounded-md shadow-sm outline-none border-foreground bg-background focus-within:ring-2 focus-within:ring-blue-600"
                />
                <Button
                  disabled={!value}
                  onClick={() => onChange(null)}
                  className={
                    value
                      ? "rounded-full text-foreground"
                      : "rounded-full cursor-not-allowed text-muted-foreground"
                  }
                >
                  <Icons.cross className="w-5 h-5" />
                </Button>
              </div>
              <Datepicker.Picker
                defaultType="day"
                className="p-4 rounded-md shadow-md bg-background min-w-96"
              >
                {({ monthName, hour, minute, year }) => (
                  <>
                    <div className="flex items-center justify-between w-full py-2 space-x-6 rtl:space-x-reverse">
                      <Datepicker.Button
                        type="button"
                        action="prev"
                        className="p-2 text-sm font-medium rounded-full hover:bg-gray-700 hover:text-white rtl:rotate-180"
                      >
                        Prev
                      </Datepicker.Button>
                      <div className="flex">
                        <Datepicker.Button
                          type="button"
                          action="toggleHourPicker"
                          className="flex items-center p-2 space-x-2 text-lg font-semibold leading-2 hover:bg-gray-700 hover:text-white"
                        >
                          {("0" + hour).slice(-2) +
                            ":" +
                            ("0" + minute).slice(-2)}
                        </Datepicker.Button>
                        <Datepicker.Button
                          type="button"
                          action="toggleMonth"
                          className="p-2 text-lg font-semibold leading-2 hover:bg-gray-700 hover:text-white"
                        >
                          {monthName}
                        </Datepicker.Button>
                        <Datepicker.Button
                          action="toggleYear"
                          type="button"
                          className="p-2 text-lg font-semibold leading-2 hover:bg-gray-700 hover:text-white"
                        >
                          {year}
                        </Datepicker.Button>
                      </div>
                      <Datepicker.Button
                        type="button"
                        action="next"
                        className="p-2 text-sm font-medium rounded-full hover:bg-gray-700 hover:text-white rtl:rotate-180"
                      >
                        Next
                      </Datepicker.Button>
                    </div>
                    <Datepicker.Items
                      className={({ type }) =>
                        cn(
                          "grid w-full auto-rows-max gap-4 overflow-y-auto scroll-smooth",
                          type == "day" && "grid-cols-7",
                          type == "month" && "grid-cols-3",
                          type == "year" && "max-h-[274px] grid-cols-4"
                        )
                      }
                    >
                      {({ items }) =>
                        items.map((item) => (
                          <Datepicker.Item
                            key={item.key}
                            item={item}
                            className={cn(
                              "grid items-center justify-center rounded-full py-1.5 text-sm font-medium select-none",
                              item.isHeader
                                ? "cursor-default"
                                : "hover:bg-gray-700",
                              "isInCurrentMonth" in item &&
                                item.isInCurrentMonth
                                ? "text-foreground"
                                : "hover:text-foreground",
                              item.type === "day" && "h-8 w-8",
                              item.isSelected && "bg-gray-600",
                              item.isToday && "border border-gray-500"
                            )}
                            action={
                              item.type === "day"
                                ? "close"
                                : item.type === "month"
                                ? "showDay"
                                : "showMonth"
                            }
                          >
                            {item.isHeader
                              ? item.text.substring(0, 2)
                              : item.text}
                          </Datepicker.Item>
                        ))
                      }
                    </Datepicker.Items>
                    <Datepicker.Button
                      action="today"
                      type="button"
                      className="w-full p-2 mt-4 text-sm font-medium rounded-md bg-primary"
                    >
                      Today
                    </Datepicker.Button>
                    <Datepicker.Picker
                      className="flex py-2 border border-gray-600 rounded-md shadow-md bg-background max-h-56 rtl:flex-row-reverse dark:bg-gray-800 dark:text-gray-300"
                      id="HourPicker"
                    >
                      <Datepicker.Items
                        type="hour"
                        className="px-4 overflow-y-auto scroll-smooth"
                        disableAutoScroll
                      >
                        {({ items }) =>
                          items.map((item) => (
                            <Datepicker.Item
                              key={item.key}
                              item={item}
                              action="close"
                              className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium hover:bg-gray-700 hover:text-white",
                                item.isSelected && "bg-gray-600"
                              )}
                            >
                              {("0" + item.text).slice(-2)}
                            </Datepicker.Item>
                          ))
                        }
                      </Datepicker.Items>
                      <Datepicker.Items
                        type="minute"
                        className="px-4 overflow-y-auto scroll-smooth"
                        disableAutoScroll
                      >
                        {({ items }) =>
                          items.map((item) => (
                            <Datepicker.Item
                              key={item.key}
                              item={item}
                              action="close"
                              className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium hover:bg-gray-700 hover:text-white",
                                item.isSelected && "bg-gray-600"
                              )}
                            >
                              {("0" + item.text).slice(-2)}
                            </Datepicker.Item>
                          ))
                        }
                      </Datepicker.Items>
                    </Datepicker.Picker>
                  </>
                )}
              </Datepicker.Picker>
            </Datepicker>
          </Field>
        )}
      />
    </div>
  );
}
