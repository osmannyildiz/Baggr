import { createFileRoute } from "@tanstack/react-router";
import { useCreateBagMutation } from "../../api/bags";

export const Route = createFileRoute("/_app/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const createBagMutation = useCreateBagMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const symbol1 = formData.get("symbol1") as string;
    const percentage1 = Number(formData.get("percentage1") as string);
    const symbol2 = formData.get("symbol2") as string;
    const percentage2 = Number(formData.get("percentage2") as string);
    const symbol3 = formData.get("symbol3") as string;
    const percentage3 = Number(formData.get("percentage3") as string);
    const symbol4 = formData.get("symbol4") as string;
    const percentage4 = Number(formData.get("percentage4") as string);
    const symbol5 = formData.get("symbol5") as string;
    const percentage5 = Number(formData.get("percentage5") as string);

    createBagMutation.mutate({
      symbol1,
      percentage1,
      symbol2,
      percentage2,
      symbol3,
      percentage3,
      symbol4,
      percentage4,
      symbol5,
      percentage5,
    });

    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-semibold">Create Bag</h1>
      <p className="text-sm text-slate-500">
        You can pick up to 5 tokens. You'll earn 1% of profit made by other
        users with this bag.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="symbol1"
            placeholder="Symbol"
            className="rounded border border-slate-300 p-2"
          />
          <input
            type="text"
            name="percentage1"
            placeholder="Percentage"
            className="rounded border border-slate-300 p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="symbol2"
            placeholder="Symbol"
            className="rounded border border-slate-300 p-2"
          />
          <input
            type="text"
            name="percentage2"
            placeholder="Percentage"
            className="rounded border border-slate-300 p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="symbol3"
            placeholder="Symbol"
            className="rounded border border-slate-300 p-2"
          />
          <input
            type="text"
            name="percentage3"
            placeholder="Percentage"
            className="rounded border border-slate-300 p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="symbol4"
            placeholder="Symbol"
            className="rounded border border-slate-300 p-2"
          />
          <input
            type="text"
            name="percentage4"
            placeholder="Percentage"
            className="rounded border border-slate-300 p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="symbol5"
            placeholder="Symbol"
            className="rounded border border-slate-300 p-2"
          />
          <input
            type="text"
            name="percentage5"
            placeholder="Percentage"
            className="rounded border border-slate-300 p-2"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded bg-slate-700 p-2 text-white disabled:bg-slate-300"
          disabled={createBagMutation.isPending}
        >
          Create Bag
        </button>
      </form>
    </div>
  );
}
