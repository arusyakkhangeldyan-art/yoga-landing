import type { Rule } from "sanity";

const membershipPlan = {
  name: "membershipPlan",
  title: "Membership Plans",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "e.g. Essential, Studio, Unlimited",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "string",
      description: "e.g. $79",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "billingPeriod",
      title: "Billing Period",
      type: "string",
      description: "e.g. /month",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. 4 classes per month, Equipment included",
    },
    {
      name: "badge",
      title: "Badge",
      type: "string",
      description: 'Optional label shown on the plan card (e.g. "Most Popular")',
    },
    {
      name: "popular",
      title: "Popular",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Inactive plans are hidden on the website",
      initialValue: true,
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first on the website",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
    },
  },
};

export default membershipPlan;
