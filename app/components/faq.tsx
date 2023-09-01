'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link'

export function FAQ() {
  const faqData = [
    {
      question: "What are common cybersecurity threats?",
      answer:
        "Common cybersecurity threats include malware, phishing, ransomware, and DDoS attacks.",
    },
    {
      question: "How can I protect my personal data online?",
      answer:
        "Protect your personal data by using strong, unique passwords, enabling two-factor authentication, and being cautious of suspicious links.",
    },
    {
      question: "What is two-factor authentication (2FA)?",
      answer:
        "Two-factor authentication adds an extra layer of security by requiring you to provide two different authentication factors to verify your identity.",
    },
    {
      question: "What is a VPN and why should I use it?",
      answer:
        "A VPN (Virtual Private Network) helps protect your online privacy and security by creating an encrypted connection between your device and the internet.",
    },
    // Add more questions and answers
  ];
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-6 pl-6">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem value={String(index)} className="p-4">
              <AccordionTrigger className="flex items-center mb-2">
                <span className="font-semibold">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Link href={''} className="font-medium mt-3">See more FAQs →</Link>
      </div>
    </section>
  );
}

type qProps = {
  icon: React.ReactNode;
  q: string;
};
const Q: React.FC<qProps> = ({ icon, q }) => (
  <div className="flex gap-4 p-2 items-center">
    {icon}
    <p>{q}</p>
  </div>
);
