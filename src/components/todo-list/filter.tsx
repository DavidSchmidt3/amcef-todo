import { Icons } from "@/components/icons";
import { FILTER_OPTIONS, FilterValueOptions } from "@/hooks/todos-filter";
import { Radio, RadioGroup } from "@headlessui/react";

type Props = {
  value: FilterValueOptions;
  setValue: (value: FilterValueOptions) => void;
};

export default function Filter({ value, setValue }: Props) {
  return (
    <div className="w-full px-4 mt-2">
      <h3 className="text-xl">Filter</h3>
      <div className="w-full max-w-md mx-auto my-4">
        <RadioGroup
          aria-label="Filter tasks"
          className="space-y-2"
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
        >
          {FILTER_OPTIONS.map((option) => (
            <Radio
              value={option.value}
              key={option.name}
              className="group relative flex cursor-pointer border rounded-lg bg-background py-2 px-5 text-foreground shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
            >
              <div className="flex items-center justify-between w-full">
                <div className="text-sm/6">
                  <p className="font-semibold text-foreground">{option.name}</p>
                </div>
                <Icons.tick className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
