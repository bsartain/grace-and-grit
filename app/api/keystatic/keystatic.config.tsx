import { config, collection, singleton, fields } from "@keystatic/core";

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
        excerpt: fields.text({
          label: "Excerpt",
          multiline: false,
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        featuredImage: fields.image({ label: "Featured Image", directory: "public/images" }),
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
    specials: collection({
      label: "Specials",
      slugField: "title",
      path: "content/specials/*",
      format: { contentField: "content" },
      columns: ["title"],
      schema: {
        title: fields.slug({ name: { label: "Specials Description" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        specialOffer: fields.checkbox({
          label: "Show this special on Home Page",
          description: "By checking this checkbox the special will show on the homepage.",
        }),
        vagaroWidget: fields.text({
          label: "Vagaro Widget HTML",
          multiline: true,
          validation: { isRequired: true },
        }),
        featuredImage: fields.image({ label: "Featured Image", directory: "public/images", validation: { isRequired: true } }),
        publishedDate: fields.date({ label: "Published Date" }),
      },
    }),
  },

  singletons: {
    studioCarousel: singleton({
      label: "Studio Carousel",
      path: "content/studio-carousel/",
      schema: {
        carouselSlides: fields.array(
          fields.object({
            image: fields.image({
              label: "Slide Image",
              directory: "public/images/carousel",
              publicPath: "/images/carousel",
            }),
            heading: fields.text({ label: "Heading" }),
            subheading: fields.text({ label: "Subheading", multiline: true }),
            ctaLabel: fields.text({ label: "Button Label" }),
            ctaHref: fields.text({ label: "Button Link" }),
          }),
          {
            label: "Carousel Slides",
            itemLabel: (props) => props.fields.heading.value || "Slide",
          }
        ),
      },
    }),
  },
});
