import CMS from "netlify-cms-app";

import { AddressControl, AddressPreview } from "./Address";

CMS.registerWidget("address", AddressControl, AddressPreview);
