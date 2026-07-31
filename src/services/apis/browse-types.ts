export interface BrowseBreadcrumb {
  label: string;
  slug: string;
}

export interface BrowseCountry {
  country_name: string;
  country_slug: string;
  slug: string;
  business_count: number;
}

export interface BrowseState {
  state_name: string;
  state_slug: string;
  slug: string;
  business_count: number;
}

export interface BrowseCity {
  city_name: string;
  city_slug: string;
  slug: string;
  latitude: number;
  longitude: number;
  business_count: number;
}

export interface BrowseArea {
  area_name: string;
  area_slug: string;
  slug: string;
  business_count: number;
}

export interface BrowseBusiness {
  branch_id: string;
  seaneb_id: string;
  business_name: string;
  display_name: string;
  branch_name: string;
  branch_logo: string | null;
  area_name: string;
  area_slug: string;
  slug: string;
  category_name: string | null;
  gallery: any;
  average_rating: string;
  total_reviews: number;
  created_at: string;
  thumbnail?: string | null;
}

export interface BrowsePagination {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface BrowseResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface BrowseCountriesData {
  level: 'country';
  breadcrumb: BrowseBreadcrumb[];
  items: BrowseCountry[];
}

export interface BrowseStatesData {
  level: 'state';
  breadcrumb: BrowseBreadcrumb[];
  country: { country_name: string; country_slug: string };
  items: BrowseState[];
}

export interface BrowseCitiesData {
  level: 'city';
  breadcrumb: BrowseBreadcrumb[];
  country: { country_name: string; country_slug: string };
  state: { state_name: string; state_slug: string };
  items: BrowseCity[];
}

export interface BrowseAreasData {
  level: 'area';
  breadcrumb: BrowseBreadcrumb[];
  city: { city_name: string; city_slug: string };
  areas: BrowseArea[];
  businesses: BrowseBusiness[];
  pagination: BrowsePagination;
}

export interface BrowseBusinessesData {
  level: 'business';
  breadcrumb: BrowseBreadcrumb[];
  area: { area_name: string; area_slug: string };
  city: { city_name: string; city_slug: string };
  businesses: BrowseBusiness[];
  pagination: BrowsePagination;
}
