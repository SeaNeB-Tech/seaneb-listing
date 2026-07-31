import Axios from 'axios';
import {
  BrowseResponse,
  BrowseCountriesData,
  BrowseStatesData,
  BrowseCitiesData,
  BrowseAreasData,
  BrowseBusinessesData
} from './browse-types';

const BROWSE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/browse`;

export const fetchBrowseCountries = async (): Promise<BrowseResponse<BrowseCountriesData> | null> => {
  try {
    const response = await Axios.get(BROWSE_API_URL);
    
return response.data;
  } catch (err) {
    console.error('Error fetching browse countries:', err);
    
return null;
  }
};

export const fetchBrowseStates = async (countrySlug: string): Promise<BrowseResponse<BrowseStatesData> | null> => {
  try {
    const response = await Axios.get(`${BROWSE_API_URL}/${encodeURIComponent(countrySlug)}`);
    
return response.data;
  } catch (err) {
    console.error('Error fetching browse states:', err);
    
return null;
  }
};

export const fetchBrowseCities = async (
  countrySlug: string,
  stateSlug: string
): Promise<BrowseResponse<BrowseCitiesData> | null> => {
  try {
    const response = await Axios.get(
      `${BROWSE_API_URL}/${encodeURIComponent(countrySlug)}/${encodeURIComponent(stateSlug)}`
    );
    
return response.data;
  } catch (err) {
    console.error('Error fetching browse cities:', err);
    
return null;
  }
};

export interface BrowseQueryParams {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const fetchBrowseAreas = async (
  countrySlug: string,
  stateSlug: string,
  citySlug: string,
  params?: BrowseQueryParams
): Promise<BrowseResponse<BrowseAreasData> | null> => {
  try {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.category) query.append('category', params.category);
    if (params?.sort) query.append('sort', params.sort);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    const queryString = query.toString() ? `?${query.toString()}` : '';

    const response = await Axios.get(
      `${BROWSE_API_URL}/${encodeURIComponent(countrySlug)}/${encodeURIComponent(stateSlug)}/${encodeURIComponent(citySlug)}${queryString}`
    );
    
return response.data;
  } catch (err) {
    console.error('Error fetching browse areas:', err);
    
return null;
  }
};

export const fetchBrowseBusinesses = async (
  countrySlug: string,
  stateSlug: string,
  citySlug: string,
  areaSlug: string,
  params?: BrowseQueryParams
): Promise<BrowseResponse<BrowseBusinessesData> | null> => {
  try {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.category) query.append('category', params.category);
    if (params?.sort) query.append('sort', params.sort);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    const queryString = query.toString() ? `?${query.toString()}` : '';

    const response = await Axios.get(
      `${BROWSE_API_URL}/${encodeURIComponent(countrySlug)}/${encodeURIComponent(stateSlug)}/${encodeURIComponent(citySlug)}/${encodeURIComponent(areaSlug)}${queryString}`
    );
    
return response.data;
  } catch (err) {
    console.error('Error fetching browse businesses:', err);
    
return null;
  }
};
