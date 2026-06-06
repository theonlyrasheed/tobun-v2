import { createFileRoute, notFound } from "@tanstack/react-router";
import { sanityQ } from "@/sanity/query-builder";
import { EventDetail } from "@/components/events/detail";

export const Route = createFileRoute("/events_/$slug")({
  loader: async ({ context: { queryClient }, params }) => {
    const event = await queryClient.ensureQueryData({
      queryKey: sanityQ.events.detail.key(params.slug),
      queryFn: () => sanityQ.events.detail.fetch(params.slug),
    });
    if (!event) throw notFound();
    return event;
  },
  component: EventDetailPage,
});

function EventDetailPage() {
  const event = Route.useLoaderData();
  return <EventDetail event={event} />;
}
