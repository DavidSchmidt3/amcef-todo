import { Icons } from "@/components/icons";
import { Button } from "@headlessui/react";

type Props = {
  isPending: boolean;
  title: string;
};

export function SubmitButton({ isPending, title }: Props) {
  return (
    <Button
      className="flex items-center justify-center w-full px-4 py-2 text-sm rounded bg-primary sm:w-80"
      type="submit"
      disabled={isPending}
    >
      {isPending && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
      {title}
    </Button>
  );
}
