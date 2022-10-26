import { loadItems } from "../../services/item-service.server";

export async function load() {
    const items = await loadItems();
    return {
      items
    };
  }