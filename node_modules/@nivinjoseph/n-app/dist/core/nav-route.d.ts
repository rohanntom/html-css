/**
 * Representation of vue-router Route Object (https://router.vuejs.org/api/#route-object-properties)
 */
export interface NavRoute {
    path: string;
    params: Record<string, any>;
    query: Record<string, any>;
    hash: string;
    fullPath: string;
    name?: string;
    redirectedFrom?: string;
}
