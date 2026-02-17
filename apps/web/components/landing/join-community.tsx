import { Button } from "@workspace/ui/components/button";

export const JoinCommunity = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center py-12">
      <h2 className="text-3xl md:text-4xl font-serif">
        Join a community of writers
      </h2>
      <p className="text-sm md:text-base text-muted-foreground max-w-md font-[var(--font-instrument-serif)]">
        Create your profile, share your best ideas, and connect with readers who
        care about your work.
      </p>
      <Button className="mt-2 rounded-[10px]">
        Create profile
      </Button>
    </div>
  );
};

