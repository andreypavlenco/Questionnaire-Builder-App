import { MoreVertical} from "lucide-react";

import { SelectCatalog, SelectCatalogContent, SelectCatalogItem, SelectCatalogTrigger, SelectCatalogGroup } from "./select-catalog";

export default function CardSelect () {
  return (
            <SelectCatalog>
              <SelectCatalogTrigger>   
                <MoreVertical size={20} />
              </SelectCatalogTrigger>
              <SelectCatalogContent>
                <SelectCatalogGroup>
                  <SelectCatalogItem value="Run">Run</SelectCatalogItem>
                  <SelectCatalogItem value="Edit">Edit</SelectCatalogItem>
                  <SelectCatalogItem value="Delete">Delete</SelectCatalogItem>
                </SelectCatalogGroup>
              </SelectCatalogContent>
            </SelectCatalog>
  );
}
