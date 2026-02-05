import { config, collection, fields } from "@keystatic/core";

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : {
          kind: "cloud",
        },
  cloud: {
    project: "grace-and-grit/grace-and-grit",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        publishedDate: fields.date({ label: "Published Date" }),
      },
    }),
    homePage: collection({
      label: "Home Page",
      slugField: "title",
      path: "content/homePage/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        publishedDate: fields.date({ label: "Published Date" }),
      },
    }),
    contactSection: collection({
      label: "Contact Section",
      slugField: "title",
      path: "content/contactSection/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        phone: fields.text({
          label: "Phone",
          multiline: false,
        }),
        email: fields.text({
          label: "Email",
          multiline: false,
        }),
        location: fields.text({
          label: "Address",
          multiline: false,
        }),
        googleMapLink: fields.text({
          label: "Goolge map Link",
          multiline: false,
        }),
        googleMapEmbeddedCode: fields.text({
          label: "Google Map Embeded Code",
          multiline: true,
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        publishedDate: fields.date({ label: "Published Date" }),
      },
    }),
    ratesAndServices: collection({
      label: "Rates and Services",
      slugField: "title",
      path: "content/ratesAndServices/*",
      format: { contentField: "content" },
      columns: ["title", "order"],
      schema: {
        title: fields.slug({ name: { label: "Session Description" } }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: false,
        }),
        price: fields.text({
          label: "Price",
          multiline: false,
        }),
        order: fields.integer({
          label: "Order",
          defaultValue: 0,
          validation: {
            min: 0,
          },
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        vagaroWidget: fields.text({
          label: "Vagaro Widget HTML",
          multiline: true,
        }),
        publishedDate: fields.date({ label: "Published Date" }),
      },
    }),
    testimonials: collection({
      label: "Testimonials",
      slugField: "title",
      path: "content/testimonials/*",
      format: { contentField: "content" },
      columns: ["title", "order"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        order: fields.integer({
          label: "Order",
          defaultValue: 0,
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        publishedDate: fields.date({ label: "Published Date" }),
      },
    }),
  },
});
