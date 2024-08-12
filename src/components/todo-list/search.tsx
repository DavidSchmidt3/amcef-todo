import { Description, Field, Input } from "@headlessui/react";
import clsx from "clsx";

type Props = {
  setValue: (value: string) => void;
  value: string;
};

export default function Search({ setValue, value }: Props) {
  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <Description className="text-base">
          Search for a task by title or description
        </Description>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={clsx(
            "my-1 w-full rounded-lg border py-1.5 px-3 text-sm/6 text-foreground bg-background"
          )}
        />
      </Field>
    </div>
  );
}
