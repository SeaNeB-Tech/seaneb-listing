export interface UserLocationAPIResponse {
  places: Place[]
}

export interface Place {
  name: string
  id: string
  types: string[]
  formattedAddress: string
  addressComponents: AddressComponent[]
  location: Location
  viewport: Viewport
  rating: number
  googleMapsUri: string
  regularOpeningHours: RegularOpeningHours
  utcOffsetMinutes: number
  adrFormatAddress: string
  businessStatus: string
  userRatingCount: number
  iconMaskBaseUri: string
  iconBackgroundColor: string
  displayName: DisplayName
  primaryTypeDisplayName: PrimaryTypeDisplayName
  currentOpeningHours: CurrentOpeningHours
  primaryType: string
  shortFormattedAddress: string
  editorialSummary: EditorialSummary
  reviews: Review[]
  photos: Photo[]
  goodForChildren: boolean
  parkingOptions: ParkingOptions
  accessibilityOptions: AccessibilityOptions
  addressDescriptor: AddressDescriptor
  googleMapsLinks: GoogleMapsLinks
  timeZone: TimeZone
  postalAddress: PostalAddress
}

export interface AddressComponent {
  longText: string
  shortText: string
  types: string[]
  languageCode: string
}

export interface Location {
  latitude: number
  longitude: number
}

export interface Viewport {
  low: Low
  high: High
}

export interface Low {
  latitude: number
  longitude: number
}

export interface High {
  latitude: number
  longitude: number
}

export interface RegularOpeningHours {
  openNow: boolean
  periods: Period[]
  weekdayDescriptions: string[]
  nextOpenTime: string
}

export interface Period {
  open: Open
  close: Close
}

export interface Open {
  day: number
  hour: number
  minute: number
}

export interface Close {
  day: number
  hour: number
  minute: number
}

export interface DisplayName {
  text: string
  languageCode: string
}

export interface PrimaryTypeDisplayName {
  text: string
  languageCode: string
}

export interface CurrentOpeningHours {
  openNow: boolean
  periods: Period2[]
  weekdayDescriptions: string[]
  nextOpenTime: string
}

export interface Period2 {
  open: Open2
  close: Close2
}

export interface Open2 {
  day: number
  hour: number
  minute: number
  date: Date
  truncated?: boolean
}

export interface Date {
  year: number
  month: number
  day: number
}

export interface Close2 {
  day: number
  hour: number
  minute: number
  date: Date2
  truncated?: boolean
}

export interface Date2 {
  year: number
  month: number
  day: number
}

export interface EditorialSummary {
  text: string
  languageCode: string
}

export interface Review {
  name: string
  relativePublishTimeDescription: string
  rating: number
  text: Text
  originalText: OriginalText
  authorAttribution: AuthorAttribution
  publishTime: string
  flagContentUri: string
  googleMapsUri: string
}

export interface Text {
  text: string
  languageCode: string
}

export interface OriginalText {
  text: string
  languageCode: string
}

export interface AuthorAttribution {
  displayName: string
  uri: string
  photoUri: string
}

export interface Photo {
  name: string
  widthPx: number
  heightPx: number
  authorAttributions: AuthorAttribution2[]
  flagContentUri: string
  googleMapsUri: string
}

export interface AuthorAttribution2 {
  displayName: string
  uri: string
  photoUri: string
}

export interface ParkingOptions {
  freeParkingLot: boolean
  paidParkingLot: boolean
  freeStreetParking: boolean
}

export interface AccessibilityOptions {
  wheelchairAccessibleParking: boolean
  wheelchairAccessibleEntrance: boolean
}

export interface AddressDescriptor {
  landmarks: Landmark[]
  areas: Area[]
}

export interface Landmark {
  name: string
  placeId: string
  displayName: DisplayName2
  types: string[]
  straightLineDistanceMeters: number
  travelDistanceMeters: number
  spatialRelationship?: string
}

export interface DisplayName2 {
  text: string
  languageCode: string
}

export interface Area {
  name: string
  placeId: string
  displayName: DisplayName3
  containment: string
}

export interface DisplayName3 {
  text: string
  languageCode: string
}

export interface GoogleMapsLinks {
  directionsUri: string
  placeUri: string
  writeAReviewUri: string
  reviewsUri: string
  photosUri: string
}

export interface TimeZone {
  id: string
}

export interface PostalAddress {
  regionCode: string
  languageCode: string
  postalCode: string
  administrativeArea: string
  locality: string
  addressLines: string[]
}
