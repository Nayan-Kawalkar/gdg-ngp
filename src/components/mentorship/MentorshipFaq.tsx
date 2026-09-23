import Faq, { type FaqItem } from "@/components/ui/Faq";

const faqs: FaqItem[] = [
  {
    q: "Is it actually free?",
    a: "Yes. Mentors volunteer their time and the chapter takes nothing. If anyone ever asks you for money through this directory, tell us.",
  },
  {
    q: "How long is a session?",
    a: "Usually 30 to 45 minutes over a call. Some mentors prefer async - a few messages back and forth - and will say so when they reply.",
  },
  {
    q: "What if nobody replies?",
    a: "Mentors have day jobs, so give it about a week. If you hear nothing, send another request to a different mentor, or email us and we will chase it.",
  },
  {
    q: "Can I ask for a referral?",
    a: "You can ask, but do not lead with it. Mentors are here to help you get better, not to hand out referrals to strangers. Earn it over a couple of conversations.",
  },
  {
    q: "Can I talk to the same mentor more than once?",
    a: "Yes, if they are up for it. Most sessions that go well turn into an occasional check-in rather than a one-off.",
  },
];

export default function MentorshipFaq() {
  return <Faq items={faqs} title="Before you send a request." />;
}
