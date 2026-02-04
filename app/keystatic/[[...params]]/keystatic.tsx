"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../api/keystatic/keystatic.config";

export default makePage(config);

// **Note:** The admin UI component needs to be in a separate client component file because it uses client-side features.

// ## 5. Access the admin interface

// http://localhost:3000/keystatic
